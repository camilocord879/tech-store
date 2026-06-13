import { prisma } from "../config/prisma.js";
import { OrderStatus, Role } from "@prisma/client";

const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ["PAID", "CANCELLED"],
  PAID: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["DELIVERED", "CANCELLED"],
  DELIVERED: [],
  CANCELLED: [],
};

export const getDashboardStats = async () => {
  const [totalUsers, totalProducts, totalOrders] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.order.count(),
  ]);

  const salesAggregation = await prisma.order.aggregate({
    _sum: {
      total: true,
    },
    where: {
      status: {
        not: "CANCELLED",
      },
    },
  });

  const totalSales = salesAggregation._sum.total || 0;

  const lowStockProducts = await prisma.product.findMany({
    where: {
      stock: {
        lte: 5,
      },
    },
  });

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });

  return {
    totalUsers,
    totalProducts,
    totalOrders,
    totalSales,
    lowStockProducts,
    recentOrders,
  };
};

export const getInventory = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return products.map((product) => ({
    ...product,
    lowStockAlert: product.stock <= 5,
  }));
};

export const updateProductStock = async (productId: string, stock: number) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  return prisma.product.update({
    where: { id: productId },
    data: { stock },
  });
};

export const getAdminOrders = async () => {
  return prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const updateOrderStatus = async (
  orderId: string,
  newStatus: OrderStatus
) => {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
      },
    });

    if (!order) {
      throw new Error("Pedido no encontrado");
    }

    const currentStatus = order.status;

    if (currentStatus === newStatus) {
      return order;
    }

    const allowed = VALID_TRANSITIONS[currentStatus];
    if (!allowed.includes(newStatus)) {
      throw new Error(
        `Transición de estado inválida de ${currentStatus} a ${newStatus}`
      );
    }

    // Si cambia a CANCELLED, devolver el stock a los productos
    if (newStatus === "CANCELLED") {
      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });
      }
    }

    return tx.order.update({
      where: { id: orderId },
      data: { status: newStatus },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  });
};

export const getAdminUsers = async () => {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getAdminUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  return user;
};

export const updateUserRole = async (userId: string, role: Role) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  return prisma.user.update({
    where: { id: userId },
    data: { role },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      role: true,
    },
  });
};

export const deleteUser = async (userId: string) => {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    if (user.role === "ADMIN") {
      throw new Error("No se permite eliminar administradores");
    }

    // Eliminar el carrito y sus items
    const cart = await tx.cart.findUnique({
      where: { userId },
    });

    if (cart) {
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
      await tx.cart.delete({
        where: { id: cart.id },
      });
    }

    // Eliminar pedidos y sus items
    const orders = await tx.order.findMany({
      where: { userId },
    });

    if (orders.length > 0) {
      const orderIds = orders.map((o) => o.id);
      await tx.orderItem.deleteMany({
        where: { orderId: { in: orderIds } },
      });
      await tx.order.deleteMany({
        where: { userId },
      });
    }

    // Finalmente eliminar al usuario
    await tx.user.delete({
      where: { id: userId },
    });

    return { success: true };
  });
};

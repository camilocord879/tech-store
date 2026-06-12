import { prisma } from "../config/prisma.js";
import type { Prisma } from "@prisma/client";

type CartItemWithProduct = {
  productId: string;
  quantity: number;
  product: {
    name: string;
    price: number;
    stock: number;
  };
};

export const createOrderFromCart = async (userId: string) => {
  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const cart = await tx.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new Error("El carrito está vacío");
    }

    const items = cart.items as CartItemWithProduct[];

    const unavailableItem = items.find(
      (item) => item.quantity > item.product.stock
    );

    if (unavailableItem) {
      throw new Error(
        `Stock insuficiente para ${unavailableItem.product.name}`
      );
    }

    const total = items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    const order = await tx.order.create({
      data: {
        userId,
        total,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.product.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    for (const item of items) {
      const updatedProduct = await tx.product.updateMany({
        where: {
          id: item.productId,
          stock: {
            gte: item.quantity,
          },
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });

      if (updatedProduct.count !== 1) {
        throw new Error(`Stock insuficiente para ${item.product.name}`);
      }
    }

    await tx.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    return order;
  });
};

export const getOrdersByUserId = async (userId: string) => {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const getOrderByIdForUser = async (
  orderId: string,
  userId: string
) => {
  return prisma.order.findFirst({
    where: {
      id: orderId,
      userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};
import { prisma } from "../config/prisma.js";

export const getCartByUserId = async (
  userId: string
) => {
  return prisma.cart.findUnique({
    where: {
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

export const addToCart = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  let cart = await prisma.cart.findUnique({
    where: {
    userId,
  },
});
    if (!cart) {
  cart = await prisma.cart.create({
    data: {
      userId,
    },
  });
}
  if (!cart) {
    throw new Error("Carrito no encontrado");
  }

  const existingItem =
    await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

  if (existingItem) {
    return prisma.cartItem.update({
      where: {
        id: existingItem.id,
      },
      data: {
        quantity:
          existingItem.quantity + quantity,
      },
    });
  }

  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity,
    },
  });
};

export const removeFromCart = async (
  itemId: string
) => {
  return prisma.cartItem.delete({
    where: {
      id: itemId,
    },
  });
};

export const updateCartItem = async (
  itemId: string,
  quantity: number
) => {
  return prisma.cartItem.update({
    where: {
      id: itemId,
    },
    data: {
      quantity,
    },
  });
};
import { prisma } from "../config/prisma.js";

export const createProduct = async (data: any) => {
  return prisma.product.create({
    data,
  });
};

export const getProducts = async () => {
  return prisma.product.findMany();
};

export const getProductById = async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
  });
};

export const deleteProduct = async (id: string) => {
  return prisma.product.delete({
    where: { id },
  });
};
export const updateProduct = async (id: string, data: any) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};
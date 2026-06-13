import { prisma } from "../config/prisma.js";
import { MessageStatus } from "@prisma/client";

export const createContactMessage = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  return prisma.contactMessage.create({
    data: {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      status: "PENDING",
    },
  });
};

export const getContactMessages = async () => {
  return prisma.contactMessage.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const updateContactMessageStatus = async (
  id: string,
  status: MessageStatus
) => {
  const message = await prisma.contactMessage.findUnique({
    where: { id },
  });

  if (!message) {
    throw new Error("Mensaje de contacto no encontrado");
  }

  return prisma.contactMessage.update({
    where: { id },
    data: { status },
  });
};

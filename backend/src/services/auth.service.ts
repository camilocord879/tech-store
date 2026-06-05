import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

interface RegisterData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
}

export async function registerUser(
  data: RegisterData
) {
  const emailExists = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (emailExists) {
    throw new Error("Correo ya registrado");
  }

  const usernameExists =
    await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

  if (usernameExists) {
    throw new Error("Usuario ya registrado");
  }

  const hashedPassword = await bcrypt.hash(
    data.password,
    10
  );

  const user = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      role: "USER",
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      role: true,
    },
  });

  await prisma.cart.create({
    data: {
      userId: user.id,
    },
  });

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    role: user.role,
  };
}

export async function loginUser(
  email: string,
  password: string
) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      password: true,
      role: true,
    },
  });

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Credenciales inválidas");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
}
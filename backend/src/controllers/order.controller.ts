import type { Request, Response, NextFunction } from "express";
import * as orderService from "../services/order.service.js";

export const createOrder = async (
  req: Request,
  res: Response
) => {
  try {
    const order = await orderService.createOrderFromCart(
      req.user!.userId
    );

    return res.status(201).json(order);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error creando la orden",
    });
  }
};

export const getMyOrders = async (
  req: Request,
  res: Response
) => {
  try {
    const orders = await orderService.getOrdersByUserId(
      req.user!.userId
    );

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({
      message: "Error consultando pedidos",
    });
  }
};

export const getOrderById = async (
  req: Request,
  res: Response
) => {
  try {
    const order = await orderService.getOrderByIdForUser(
      req.params.id as string,
      req.user!.userId
    );

    if (!order) {
      return res.status(404).json({
        message: "Pedido no encontrado",
      });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({
      message: "Error consultando pedido",
    });
  }
};

export const getInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;
    const isAdmin = req.user!.role?.toString().toUpperCase() === "ADMIN";

    const invoice = await orderService.getOrderInvoice(id as string, userId, isAdmin);
    return res.status(200).json(invoice);
  } catch (error: any) {
    if (error.message === "Acceso denegado a esta factura") {
      return res.status(403).json({ message: error.message });
    }
    if (error.message === "Pedido no encontrado") {
      return res.status(404).json({ message: error.message });
    }
    next(error);
  }
};

import type { Request, Response, NextFunction } from "express";
import * as adminService from "../services/admin.service.js";
import { updateProductStockSchema } from "../schemas/admin.schema.js";
import { updateOrderStatusSchema } from "../schemas/order.schema.js";
import { updateUserRoleSchema } from "../schemas/user.schema.js";

export const getDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stats = await adminService.getDashboardStats();
    return res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};

export const getInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inventory = await adminService.getInventory();
    return res.status(200).json(inventory);
  } catch (error) {
    next(error);
  }
};

export const updateStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { stock } = updateProductStockSchema.parse(req.body);
    const product = await adminService.updateProductStock(id as string, stock);
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await adminService.getAdminOrders();
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status } = updateOrderStatusSchema.parse(req.body);
    const order = await adminService.updateOrderStatus(id as string, status);
    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await adminService.getAdminUsers();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await adminService.getAdminUserById(id as string);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { role } = updateUserRoleSchema.parse(req.body);
    const user = await adminService.updateUserRole(id as string, role);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await adminService.deleteUser(id as string);
    return res.status(200).json({
      message: "Usuario eliminado correctamente",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

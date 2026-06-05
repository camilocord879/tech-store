import type { Request, Response } from "express";
import * as cartService from "../services/cart.service.js";

export const getCart = async (
  req: Request,
  res: Response
) => {
  try {
    const cart = await cartService.getCartByUserId(
      req.user!.userId
    );

    return res.status(200).json(cart);

  } catch (error) {
    return res.status(500).json({
      error: "Error fetching cart",
    });
  }
};

export const addToCart = async (
  req: Request,
  res: Response
) => {
  try {
    const { productId, quantity } = req.body;

    const item = await cartService.addToCart(
      req.user!.userId as string,
      productId as string,
      quantity as number
    );
    console.log(req.user);

    return res.status(201).json(item);

  } catch (error) {
    return res.status(500).json({
      error: "Error adding product",
    });
  }
};

export const updateCartItem = async (
  req: Request,
  res: Response
) => {
  try {
    const item =
      await cartService.updateCartItem(
        req.params.id as string,
        req.body.quantity
      );

    return res.status(200).json(item);

  } catch (error) {
    return res.status(500).json({
      error: "Error updating item",
    });
  }
};

export const removeFromCart = async (
  req: Request,
  res: Response
) => {
  try {
    await cartService.removeFromCart(
      req.params.id as string
    );

    return res.status(200).json({
      message: "Item removed",
    });

  } catch (error) {
    return res.status(500).json({
      error: "Error removing item",
    });
  }
};
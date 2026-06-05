import type { Request, Response } from "express";
import * as productService from "../services/product.service.js";

export const createProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const product =
      await productService.createProduct(req.body);

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({
      error: "Error creating product",
    });
  }
};

export const getProducts = async (
  req: Request,
  res: Response
) => {
  const products =
    await productService.getProducts();

  return res.json(products);
};

export const getProductById = async (
  req: Request,
  res: Response
) => {
  const product =
    await productService.getProductById(
      req.params.id as string
    );

  return res.json(product);
};

export const deleteProduct = async (
  req: Request,
  res: Response
) => {
  await productService.deleteProduct(
    req.params.id as string
  );

  return res.json({
    message: "Product deleted",
  });
};
export const updateProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const product =
        await productService.updateProduct(
            req.params.id as string,
            req.body
        );
    return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({
            error: "Error updating product",
        });
    }}
export const searchProducts = async (
  req: Request,
  res: Response ) => {  
  try {
    const products =
      await productService.searchProducts(
        req.query.q as string
      );  
      return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      error: "Error searching products",
    });
  }
};
export const getFeaturedProducts = async (
  req: Request,
  res: Response ) => {  
  try {
    const products =
      await productService.getFeaturedProducts();  
      return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      error: "Error fetching featured products",
    });
  }};
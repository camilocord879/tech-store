import type { Request, Response, NextFunction } from "express";
import * as contactService from "../services/contact.service.js";
import {
  createContactSchema,
  updateContactStatusSchema,
} from "../schemas/contact.schema.js";

export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = createContactSchema.parse(req.body);
    const message = await contactService.createContactMessage(data);
    return res.status(201).json({
      success: true,
      message: "Mensaje de contacto enviado con éxito",
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const messages = await contactService.getContactMessages();
    return res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

export const updateMessageStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status } = updateContactStatusSchema.parse(req.body);
    const message = await contactService.updateContactMessageStatus(id as string, status);
    return res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

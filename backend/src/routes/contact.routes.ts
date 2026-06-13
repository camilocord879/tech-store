import { Router } from "express";
import { createMessage } from "../controllers/contact.controller.js";

const router = Router();

// Endpoint público para enviar mensajes de contacto
router.post("/", createMessage);

export default router;

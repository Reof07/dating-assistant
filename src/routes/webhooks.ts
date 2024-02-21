import { Request, Response, Router } from "express";
import { webhookController, receiveMessageController } from "../controllers/webhook.controller";

const router = Router()

router.get('/', webhookController )
router.post('/', receiveMessageController)

export {
    router
} 
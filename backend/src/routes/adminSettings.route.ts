import { Router } from "express";
import { updateMinimumPaymentAmountController, updatePaymentStatusController } from "../controllers/adminSettings.controller";

const settingsRouter = Router();

settingsRouter.put("/minimum-payment-amount", updateMinimumPaymentAmountController);
settingsRouter.put("/payments/:id/status", updatePaymentStatusController);

export default settingsRouter;

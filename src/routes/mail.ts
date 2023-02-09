import express, { Request, Response } from "express";
import { auth } from "../middleware/auth";
import registrationFirstStepEmail from "../templates/firstStepEmailTemplates";
import MailService from "../services/mail";
import { generateDataForFirstStepEmail } from "../controllers/mail";
import { IFirstStepData } from "../interfaces/FirstStepEmail";
const router = express.Router();

const mailService = MailService.getInstance();
mailService.createConnection();

router.post("/send/firstStep", auth, async (req: Request, res: Response) => {
    try {
        const data: IFirstStepData = await generateDataForFirstStepEmail(
            req.body.caborId, req.body.cityId,
        );
        const emailTemplate = registrationFirstStepEmail(JSON.stringify(data));

        await mailService.sendMail(req.headers.Authorization, {
            to: req.body.email,
            subject: `Pendaftaran untuk ${data.sport} dari Kabupaten / Kota ${data.city}`,
            html: emailTemplate,
        });
        res.status(200).send({ message: "Email sent" });
    } catch (error) {
        res.status(500).send({ message: "Failed to send email" });
    }
});
    
export default router;
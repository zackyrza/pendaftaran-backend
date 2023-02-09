import express, { Request, Response } from "express";
import { auth } from "../middleware/auth";
import registrationFirstStepEmail from "../templates/firstStepEmailTemplates";
import MailService from "../services/mail";
const router = express.Router();

const mailService = MailService.getInstance();
mailService.createConnection();

router.post("/send/firstStep", auth, async (req: Request, res: Response) => {
    try {
        const emailTemplate = registrationFirstStepEmail(req.body.text);
        await mailService.sendMail(req.headers.Authorization, {
            to: req.body.email,
            subject: 'Test email',
            html: emailTemplate.html,
        });
        res.status(200).send({ message: "Email sent" });
    } catch (error) {
        console.log(error, '==============================')
        res.status(500).send({ message: "Failed to send email" });
    }
});
    
export default router;
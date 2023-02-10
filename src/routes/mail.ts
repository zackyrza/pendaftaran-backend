import express, { Request, Response } from "express";
import { auth } from "../middleware/auth";
import puppeteer from "puppeteer";
import registrationFirstStepEmail from "../templates/firstStepEmailTemplates";
import MailService from "../services/mail";
import { generateDataForFirstStepEmail } from "../controllers/mail";
import { IFirstStepData } from "../interfaces/FirstStepEmail";
import firstStepEmailHTML from "../templates/firstStepEmailHTML";
const router = express.Router();

const mailService = MailService.getInstance();
mailService.createConnection();

router.post("/send/firstStep", auth, async (req: Request, res: Response) => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        const data: IFirstStepData = await generateDataForFirstStepEmail(
            req.body.caborId, req.body.cityId,
        );
        let filename = "pendaftaran-tahap-1-cabor-" + data.sport.toLowerCase().split(" ").join("-") + "-kabupaten/kota-" + data.city.toLowerCase().split(" ").join("-") + ".pdf";
        const html = registrationFirstStepEmail(JSON.stringify(data));
        await page.setContent(html);
        const pdf = await page.pdf({ format: 'A4' });
        await browser.close();
        const emailHtml = firstStepEmailHTML(data.city, data.sport);

        await mailService.sendMail(req.headers.Authorization, {
            to: req.body.email,
            subject: `Pendaftaran untuk ${data.sport} dari Kabupaten / Kota ${data.city}`,
            html: emailHtml,
            attachments: [
                {
                    filename,
                    content: pdf,
                }
            ],
        });
        res.status(200).send({ message: "Email sent" });
    } catch (error) {
        res.status(500).send({ message: "Failed to send email" });
    }
});
    
export default router;
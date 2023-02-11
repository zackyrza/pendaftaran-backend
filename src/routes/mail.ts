import express, { Request, Response } from "express";
import puppeteer, { Browser } from "puppeteer";
import {PDFDocument} from "pdf-lib";
import registrationFirstStepEmail from "../templates/firstStepEmailTemplates";
import MailService from "../services/mail";
import { generateDataForCandidatesByCityEmail, generateDataForFirstStepEmail, generateDataForSecondStepEmail } from "../controllers/mail";
import { IFirstStepData } from "../interfaces/FirstStepEmail";
import firstStepEmailHTML from "../templates/firstStepEmailHTML";
import { ISecondStepData } from "../interfaces/SecondStepEmail";
import secondStepEmailHTML from "../templates/secondStepEmailHTML";
import registrationSecondStepEmail, { attachmentSecondStepEmail } from "../templates/secondStepEmailTemplates";
import { ICandidateByCityData } from "../interfaces/CandidateByCityEmail";
import cityByEmailHTML from "../templates/cityByCandidateEmailHTML";
const router = express.Router();

const mailService = MailService.getInstance();
mailService.createConnection();

router.post("/send/firstStep", async (req: Request, res: Response) => {
    try {
        // for local
        // const browser = await puppeteer.launch({ headless: true });
        // for server
        const browser = await puppeteer.launch({ headless: true, executablePath: '/snap/bin/chromium', args: ['--no-sandbox'] });
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
            subject: `Pendaftaran tahap 1 untuk ${data.sport} dari Kabupaten / Kota ${data.city}`,
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
        console.log(error, 'error email ==============================');
        res.status(500).send({ message: "Failed to send email" });
    }
});

router.post("/send/secondStep", async (req: Request, res: Response) => {
    try {
        // for local
        // const browser = await puppeteer.launch({ headless: true });
        // for server
        const browser = await puppeteer.launch({ headless: true, executablePath: '/snap/bin/chromium', args: ['--no-sandbox'] });
        const page = await browser.newPage();
        const mergedPDF = await PDFDocument.create();
        const pdfFiles: Buffer[] = [];
        
        const data: ISecondStepData = await generateDataForSecondStepEmail(
            req.body.classId, req.body.cityId,
        );
        let filename = "pendaftaran-tahap-2-cabor-" + data.sport.toLowerCase().split(" ").join("-") + "-kabupaten/kota-" + data.city.toLowerCase().split(" ").join("-") + ".pdf";
        for await (const candidate of data.candidates) {
            const html = registrationSecondStepEmail(JSON.stringify(
                {
                    sport: data.sport,
                    city: data.city,
                    className: data.className,
                    candidate,
                }
            ));
            await page.setContent(html);
            pdfFiles.push(await page.pdf({ format: 'A4' }));
            const attachmentPdf = attachmentSecondStepEmail(candidate.ktp, candidate.ijazah);
            await page.setContent(attachmentPdf);
            pdfFiles.push(await page.pdf({ format: 'A4' }));
        }

        for await (const pdf of pdfFiles) {
            const pdfDoc = await PDFDocument.load(pdf);
            const [pdfPage] = await mergedPDF.copyPages(pdfDoc, pdfDoc.getPageIndices());
            mergedPDF.addPage(pdfPage);
        }

        await browser.close();
        const pdfFinal = Buffer.from(await mergedPDF.saveAsBase64(), 'base64');
        const emailHtml = secondStepEmailHTML(data.city, data.sport, data.className);
        await mailService.sendMail(req.headers.Authorization, {
            to: req.body.email,
            subject: `Pendaftaran tahap 2 untuk ${data.sport} dari Kabupaten / Kota ${data.city}`,
            html: emailHtml,
            attachments: [
                {
                    filename,
                    content: pdfFinal,
                }
            ],
        });
        res.status(200).send({ message: "Email sent" });
    } catch (error) {
        console.log(error, 'error email ==============================');
        res.status(500).send({ message: "Failed to send email" });
    }
});

router.post("/send/candidatesByCity", async (req: Request, res: Response) => {
    try {
        // for local
        // const browser = await puppeteer.launch({ headless: true });
        // for server
        const browser = await puppeteer.launch({ headless: true, executablePath: '/snap/bin/chromium', args: ['--no-sandbox'] });
        const page = await browser.newPage();
        const mergedPDF = await PDFDocument.create();
        const pdfFiles: Buffer[] = [];
        
        const data: ICandidateByCityData = await generateDataForCandidatesByCityEmail(
            req.body.cityId,
        );

        console.log(data, '==============================');

        let filename = "kandidat-kabupaten/kota-" + data.city.toLowerCase().split(" ").join("-") + ".pdf";

        for await (const classItem of data.classes) {
            for await (const candidate of classItem.candidates) {
                const html = registrationSecondStepEmail(JSON.stringify(
                    {
                        sport: classItem.sport,
                        city: data.city,
                        className: classItem.className,
                        candidate,
                    }
                ));
                await page.setContent(html);
                pdfFiles.push(await page.pdf({ format: 'A4' }));
                const attachmentPdf = attachmentSecondStepEmail(candidate.ktp, candidate.ijazah);
                await page.setContent(attachmentPdf);
                pdfFiles.push(await page.pdf({ format: 'A4' }));
            }
        }

        for await (const pdf of pdfFiles) {
            const pdfDoc = await PDFDocument.load(pdf);
            const [pdfPage] = await mergedPDF.copyPages(pdfDoc, pdfDoc.getPageIndices());
            mergedPDF.addPage(pdfPage);
        }

        await browser.close();
        const pdfFinal = Buffer.from(await mergedPDF.saveAsBase64(), 'base64');
        const emailHtml = cityByEmailHTML(data.city);
        await mailService.sendMail(req.headers.Authorization, {
            to: req.body.email,
            subject: `Data kandidat dari semua cabor untuk Kabupaten / Kota ${data.city}`,
            html: emailHtml,
            attachments: [
                {
                    filename,
                    content: pdfFinal,
                }
            ],
        });
        res.status(200).send({ message: "Email sent" });
    } catch (error) {
        console.log(error, 'error email ==============================');
        res.status(500).send({ message: "Failed to send email" });
    }
});
    
export default router;
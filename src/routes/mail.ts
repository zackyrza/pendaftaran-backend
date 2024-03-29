import express, { Request, Response } from "express";
import fs from "fs";
import puppeteer from "puppeteer";
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
import {Readable} from "stream";
const router = express.Router();

const mailService = MailService.getInstance();
mailService.createConnection();

const minimal_args = [
  '--autoplay-policy=user-gesture-required',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox',
  '--disable-speech-api',
  '--disable-sync',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
];

router.post("/send/firstStep", async (req: Request, res: Response) => {
    try {
        // for local
        // const browser = await puppeteer.launch({ headless: true });
        // for server
        const browser = await puppeteer.launch({ headless: true, executablePath: '/snap/bin/chromium', args: minimal_args, timeout: 0, userDataDir: './tmp_data' });
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        const data: IFirstStepData = await generateDataForFirstStepEmail(
            req.body.caborId, req.body.cityId,
        );
        let filename = "pendaftaran-tahap-1-cabor-" + data.sport.toLowerCase().split(" ").join("-") + "-kabupaten/kota-" + data.city.toLowerCase().split(" ").join("-") + ".pdf";
        const html = registrationFirstStepEmail(JSON.stringify(data));
        await page.setContent(html);
        const pdf = await page.pdf({ format: 'Legal' });
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
        const browser = await puppeteer.launch({ headless: true, executablePath: '/snap/bin/chromium', args: minimal_args, timeout: 0, userDataDir: './tmp_data' });
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        const mergedPDF = await PDFDocument.create();
        const pdfFiles: Buffer[] = [];
        
        const data: ISecondStepData = await generateDataForSecondStepEmail(
            req.body.classId, req.body.cityId,
        );
        let filename = "pendaftaran-tahap-2-cabor-" + data.sport.toLowerCase().split(" ").join("-") + "-kabupaten-kota-" + data.city.toLowerCase().split(" ").join("-");
        const afterFiles = async () => {
            await browser.close();
            const convertedPdf = await mergedPDF.save({
                useObjectStreams: true,
            });
            const pdfName = `pdfs/${filename}-${new Date().toISOString()}.pdf`;
            fs.appendFileSync(`${process.cwd()}/${pdfName}`, convertedPdf);
            const emailHtml = secondStepEmailHTML(`http://pendaftaran-backend.mitraniagateknologi.com/${pdfName}`);
            await mailService.sendMail(req.headers.Authorization, {
                to: req.body.email,
                subject: `Pendaftaran tahap 2 untuk ${data.sport} dari Kabupaten / Kota ${data.city}`,
                html: emailHtml,
                // attachments: [
                //     {
                //         filename,
                //         content: pdfFinal,
                //     }
                // ],
            });
            res.status(200).send({ message: "Email sent" });
        }

        const runPdfFiles = async () => {
            for await (const pdfItem of pdfFiles) {
                const pdfDoc = await PDFDocument.load(pdfItem);
                const [pdfPage] = await mergedPDF.copyPages(pdfDoc, pdfDoc.getPageIndices());
                mergedPDF.addPage(pdfPage);
                if (pdfFiles.findIndex((item) => item === pdfItem) === pdfFiles.length - 1) {
                    await afterFiles();
                }
            }
        }

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
            pdfFiles.push(await page.pdf({ format: 'Legal', timeout: 0, }));
            const attachmentPdf = attachmentSecondStepEmail(candidate.ktp, candidate.ijazah);
            await page.setContent(attachmentPdf);
            pdfFiles.push(await page.pdf({ format: 'Legal', timeout: 0, }));
            if (data.candidates.findIndex((item) => item.id === candidate.id) === data.candidates.length - 1) {
                await runPdfFiles();
            }
        }
    } catch (error) {
        console.log(error, 'error email ==============================');
        res.status(500).send({ message: "Failed to send email" });
    }
});

router.post("/generate/firstStep", async (req: Request, res: Response) => {
    try {
        const browser = await puppeteer.launch({ headless: true, executablePath: '/snap/bin/chromium', args: minimal_args, timeout: 0, userDataDir: './tmp_data' });
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        const data: IFirstStepData = await generateDataForFirstStepEmail(
            req.body.caborId, req.body.cityId,
        );
        let filename = "pendaftaran-tahap-1-cabor-" + data.sport.toLowerCase().split(" ").join("-") + "-kabupaten/kota-" + data.city.toLowerCase().split(" ").join("-") + ".pdf";
        const html = registrationFirstStepEmail(JSON.stringify(data));
        await page.setContent(html);
        const pdf = await page.pdf({ format: 'Legal' });
        await browser.close();
        var file = Readable.from(pdf);
        var size = Buffer.byteLength(pdf);
        res.setHeader('Content-Length', size);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename='+filename);
        file.pipe(res);
    } catch (error) {
        console.log(error, 'error email ==============================');
        res.status(500).send({ message: "Failed to send email" });
    }
});

router.post("/generate/secondStep", async (req: Request, res: Response) => {
    try {
        const browser = await puppeteer.launch({ headless: true, executablePath: '/snap/bin/chromium', args: minimal_args, timeout: 0, userDataDir: './tmp_data' });
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        const mergedPDF = await PDFDocument.create();
        const pdfFiles: Buffer[] = [];

        const data: ISecondStepData = await generateDataForSecondStepEmail(
            req.body.classId, req.body.cityId,
        );
        let filename = "pendaftaran-tahap-2-cabor-" + data.sport.toLowerCase().split(" ").join("-") + "-kabupaten-kota-" + data.city.toLowerCase().split(" ").join("-");
        const afterFiles = async () => {
            await browser.close();
            const convertedPdf = await mergedPDF.save({
                useObjectStreams: true,
            });
            const pdfName = `pdfs/${filename}-${new Date().toISOString()}.pdf`;
            fs.appendFileSync(`${process.cwd()}/${pdfName}`, convertedPdf);
            res.status(200).send({ message: "File generated", data: `http://pendaftaran-backend.mitraniagateknologi.com/${pdfName}` });
        }

        const runPdfFiles = async () => {
            for await (const pdfItem of pdfFiles) {
                const pdfDoc = await PDFDocument.load(pdfItem);
                const [pdfPage] = await mergedPDF.copyPages(pdfDoc, pdfDoc.getPageIndices());
                mergedPDF.addPage(pdfPage);
                if (pdfFiles.findIndex((item) => item === pdfItem) === pdfFiles.length - 1) {
                    await afterFiles();
                }
            }
        }

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
            pdfFiles.push(await page.pdf({ format: 'Legal', timeout: 0, }));
            const attachmentPdf = attachmentSecondStepEmail(candidate.ktp, candidate.ijazah);
            await page.setContent(attachmentPdf);
            pdfFiles.push(await page.pdf({ format: 'Legal', timeout: 0, }));
            if (data.candidates.findIndex((item) => item.id === candidate.id) === data.candidates.length - 1) {
                await runPdfFiles();
            }
        }
    } catch (error) {
        res.status(500).send({ message: "Failed to generate data for second step" });
    }
});

router.post("/upload/secondStep", async (req: Request, res: Response) => {
    // try {
    //     const { city, sport, className, email, pdf } = req.body;
    //     const emailHtml = secondStepEmailHTML(city, sport, className);
    //     let filename = "pendaftaran-tahap-2-cabor-" + sport.toLowerCase().split(" ").join("-") + "-kabupaten/kota-" + city.toLowerCase().split(" ").join("-") + ".pdf";
    //     const pdfFinal = path.join(process.cwd(), pdf);
    //     await mailService.sendMail(req.headers.Authorization, {
    //         to: email,
    //         subject: `Pendaftaran tahap 2 untuk ${sport} dari Kabupaten / Kota ${city}`,
    //         html: emailHtml,
    //         attachments: [
    //             {
    //                 filename,
    //                 path: pdfFinal,
    //             }
    //         ],
    //     });
    //     res.status(200).send({ message: "Email sent" });
    // } catch (error) {
    //     console.log(error, 'error email ==============================');
    //     res.status(500).send({ message: "Failed to send email" });
    // }
});

router.post("/send/candidatesByCity", async (req: Request, res: Response) => {
    try {
        // for local
        // const browser = await puppeteer.launch({ headless: true });
        // for server
        const browser = await puppeteer.launch({ headless: true, executablePath: '/snap/bin/chromium', args: minimal_args, timeout: 0, userDataDir: './tmp_data' });
        const page = await browser.newPage();
        const mergedPDF = await PDFDocument.create();
        const pdfFiles: Buffer[] = [];
        
        const data: ICandidateByCityData = await generateDataForCandidatesByCityEmail(
            req.body.cityId,
        );

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
                pdfFiles.push(await page.pdf({ format: 'Legal' }));
                const attachmentPdf = attachmentSecondStepEmail(candidate.ktp, candidate.ijazah);
                await page.setContent(attachmentPdf);
                pdfFiles.push(await page.pdf({ format: 'Legal' }));
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

router.post("/generate/candidatesByCity", async (req: Request, res: Response) => {
    try {
        const generatedData: ICandidateByCityData = await generateDataForCandidatesByCityEmail(
            req.body.cityId,
        );
        let data: any[] = [];
        
        const send = () => {
            res.status(200).send({
                message: "Success",
                data,
            });
        }

        generatedData.classes.forEach((classItem, index) => {
            classItem.candidates.forEach((candidate, indexCandidate) => {
                data.push({
                    main: {
                        sport: classItem.sport,
                        city: generatedData.city,
                        className: classItem.className,
                        candidate,
                    },
                    attachment: {
                        ktp: candidate.ktp,
                        ijazah: candidate.ijazah,
                    },
                });
                if (classItem.candidates.length - 1 === indexCandidate && index === generatedData.classes.length - 1) {
                    send();
                }
            });
        });
    } catch (error) {
        console.log(error, 'error email ==============================');
        res.status(500).send({ message: "Failed to send email" });
    }
});
    
export default router;
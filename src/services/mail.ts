import nodemailer from 'nodemailer';
import smtp from '../../config/smtp.json';

export interface MailInterface {
    from?: string;
    to: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    subject: string;
    text?: string;
    html: string;
}

export default class MailService {
    private static instance: MailService;
    private transporter: nodemailer.Transporter | undefined;

    private constructor() {}
    //INSTANCE CREATE FOR MAIL
    static getInstance() {
        if (!MailService.instance) {
            MailService.instance = new MailService();
        }
        return MailService.instance;
    }
    //CREATE CONNECTION FOR LOCAL
    async createLocalConnection() {
        let account = await nodemailer.createTestAccount();
        this.transporter = nodemailer.createTransport({
            name: 'localhost',
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });
    }
    //CREATE A CONNECTION FOR LIVE
    async createConnection() {
        this.transporter = nodemailer.createTransport({
            name: smtp.SMTP_NAME,
            host: smtp.SMTP_HOST,
            port: smtp.SMTP_PORT,
            secure: true,
            auth: {
                user: smtp.SMTP_USERNAME,
                pass: smtp.SMTP_PASSWORD,
            },
        });
    }
    //SEND MAIL
    async sendMail(
        requestId: string | number | string[] | undefined,
        options: MailInterface
    ) {
        if (!this.transporter) {
            throw new Error('Transporter is not initialized');
        }
        return await this.transporter
            .sendMail({ 
                from: `"KONI Kabupaten Kotawaringin Timur" ${process.env.SMTP_SENDER || options.from}`,
                to: options.to,
                cc: options.cc,
                bcc: options.bcc,
                subject: options.subject,
                text: options.text,
                html: options.html,
            })
            .then((info) => {
                console.log(`${requestId} - Mail sent successfully!!`);
                console.log(`${requestId} - [MailResponse]=${info.response} [MessageID]=${info.messageId}`);
                if (process.env.NODE_ENV === 'local') {
                    console.log(`${requestId} - Nodemailer ethereal URL: ${nodemailer.getTestMessageUrl(
                        info
                    )}`)
                }
                return info;
            });
    }
    //VERIFY CONNECTION
    async verifyConnection() {
        if (!this.transporter) {
            throw new Error('Transporter is not initialized');
        }
        const status = await this.transporter.verify();
        return status;
    }
    //CREATE TRANSPORTER
    getTransporter() {
        return this.transporter;
    }
}
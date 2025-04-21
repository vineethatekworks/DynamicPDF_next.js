// deno-lint-ignore-file
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Buffer } from "node:buffer";
import { getHtmlTemplate } from "./template.ts";
import puppeteer from "puppeteer";

export const generatePdf = async (data: any): Promise<Buffer> => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const html = getHtmlTemplate(data);
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfUint8 = await page.pdf({ format: "A4" });
    const pdf = Buffer.from(pdfUint8); 

    await browser.close();
    return pdf;
};

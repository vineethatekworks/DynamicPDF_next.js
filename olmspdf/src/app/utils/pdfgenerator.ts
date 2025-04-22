// deno-lint-ignore-file
/* eslint-disable @typescript-eslint/no-explicit-any */

/*
The try-catch block will handle any errors that occur in the following sequence:
Launching the browser.
Creating a new page.
Setting HTML content.
Generating the PDF.
Closing the browser.
*/
import { Buffer } from "node:buffer";
import { getHtmlTemplate } from "./template.ts";
import puppeteer from "puppeteer";

export const generatePdf = async (data: any): Promise<Buffer> => {
    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
  
      const html = getHtmlTemplate(data);
      await page.setContent(html, { waitUntil: "networkidle0" });
  
      const pdf = Buffer.from(await page.pdf({ format: "A4" }));
  
      await browser.close();
      return pdf;
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw new Error("PDF generation failed.");
    }
  };
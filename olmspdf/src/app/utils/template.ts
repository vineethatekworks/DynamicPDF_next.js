// deno-lint-ignore-file
/* eslint-disable @typescript-eslint/no-explicit-any */
export function getHtmlTemplate(data: any): string {
  // Handle null/undefined/empty values with fallback
  const safeValue = (value: any, fallback = 'N/A') =>
    value !== null && value !== undefined && value !== '' ? value : fallback;

  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Times New Roman', serif;
            margin: 0;
            padding: 40px;
            background-color: #f9f9f9;
            border: 20px solid #2e7d32;
          }
          .container {
            padding: 30px;
            max-width: 800px;
            margin: auto;
            background-color: white;
          }
          h2 {
            text-align: center;
            text-decoration: underline;
          }
          .content {
            margin-top: 20px;
          }
          .details {
            margin-top: 20px;
          }
          .details p {
            margin: 6px 0;
          }
          .bold {
            font-weight: bold;
          }
          .signature {
            margin-top: 40px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Nomination Form</h2>

          <div class="content">
            <p>Certified that I/We have nominated Sri <span class="bold">${safeValue(data.name)}</span></p>
            <p>S/o <span class="bold">${safeValue(data.fatherName)}</span> as a person responsible for the conduct of our organization.</p>
            <p>He will represent our organization in the event of any legal requirement. In case the designated person leaves the organization, I hereby admit that I will be responsible for any obligations.</p>
          </div>

          <div class="details">
            <p>1. <span class="bold">Name of the person</span> : ${safeValue(data.name)}</p>
            <p>2. <span class="bold">Father’s name</span> : ${safeValue(data.fatherName)}</p>
            <p>3. <span class="bold">Age</span> : ${safeValue(data.age)}</p>
            <p>4. <span class="bold">Designation</span> : ${safeValue(data.designation)}</p>
            <p>5. <span class="bold">Residential address</span> : ${safeValue(data.address)}</p>
            <p>6. <span class="bold">Postal address</span> : ${safeValue(data.postalAddress)}</p>
            <p>7. <span class="bold">Phone number</span> : ${safeValue(data.phoneNumber)}</p>
            <p>8. <span class="bold">Aadhaar number</span> : ${safeValue(data.aadhaarNumber)}</p>
          </div>

          <div class="signature">
            <p class="bold">I hereby accept the above nomination as required,</p>
            <br />
            <p>Signature of Person Nominated</p>
            <br /><br />
            <p>Authorized Signatory</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

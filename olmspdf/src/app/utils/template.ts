// deno-lint-ignore-file
/* eslint-disable @typescript-eslint/no-explicit-any */

export function getHtmlTemplate(data: any): string {
  // Helper function to handle null or undefined values with a default
  function safeValue(value: any, defaultValue: string = 'N/A'): string {
    if (value === null || value === undefined) {
      return defaultValue;
    }
    return value;
  }

  // Define all fields as metadata for better maintainability
  const fields = [
    { label: "Name of the person", key: "name" },
    { label: "Father’s name", key: "fatherName" },
    { label: "Age", key: "age" },
    { label: "Designation", key: "designation" },
    { label: "Residential address", key: "address" },
    { label: "Postal address", key: "postalAddress" },
    { label: "Phone number", key: "phoneNumber" },
    { label: "Aadhaar number", key: "aadhaarNumber" }
  ];

  // Function to generate the details section dynamically
  function generateDetailsHtml(data: any, fields: { label: string, key: string }[]) {
    return fields.map((f, i) => {
      const value = data[f.key];
      return value
        ? `<p>${i + 1}. <span class="bold">${f.label}</span> : ${safeValue(value)}</p>`
        : '';
    }).join('');
  }

  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Times New Roman', serif;
            margin: 0;
            padding: 40px;
            background-color: #f9f9f9;
            border: 20px solid #2e7d32; /* Thicker green border around the whole page */
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
            ${generateDetailsHtml(data, fields)}
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

export class VerifyEmailTemplate {
  
    generateTemplate(verificationCode: string): string {
      return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
            color: 240 3.7% 15.9%;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            }
            .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            text-align: center;
            }
            .header {
            font-size: 24px;
            }
            .code {
            font-size: 32px;
            font-weight: bold;
            margin: 20px 0;
            }
            .footer {
            font-size: 14px;
            color: #777;
            margin-top: 20px;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <h2 class="header">Email Verification</h2>
            <p>Use the code below to verify your email:</p>
            <p class="code">${verificationCode}</p>
            <div class="footer">
            <p>If you didn't request this, please ignore this email.</p>
            </div>
        </div>
        </body>
        </html>
      `;
    }
  }
  
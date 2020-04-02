export const getForgotPasswordTemplate = (name: string, link: string) => ({
  subject: "Reset your password",
  html: `
    <div align='center' style='padding: 2rem;font-size: 15px;'>
      <h1 style="margin-top: 0;">Password reset</h1>
      <img src="https://buddyapp.buildit.digital/favicon-196.png" width="125px" alt="Buddy app logo">
      <h3>Hi ${name},</h3>
      <p style='margin: 2rem 0;'>You requested to reset your Buddy App password. Click the button below to complete the process.</p>
      <a href='${link}' style='background: #007c6c;border-radius: 5rem;color: #f1f1f1!important;display: inline-block;text-decoration:none!important;font-weight:bold;padding: 0.75rem 2.5rem;' target='_blank'>Reset my password</a>
    </div>
  `,
  text: `Password reset\r\nHi ${name},\r\nYou requested to reset your Buddy App password. Click the link below to complete the process.\r\n${link}`
});

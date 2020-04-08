import * as ses from "node-ses";
import ERRORS from "../errors";

const key = process.env.AWS_ACCESS_KEY_ID as string;
const secret = process.env.AWS_SECRET_ACCESS_KEY as string;
const from = process.env.EMAIL as string;

const client = ses.createClient({
  key,
  secret,
  amazon: "https://email.eu-west-1.amazonaws.com"
});

export const sendEmail = (
  to: string,
  subject: string,
  message: string,
  altText: string
) =>
  client.sendEmail(
    {
      to,
      from,
      subject,
      message,
      altText
    },
    (error: any) => {
      if (error) {
        throw new ERRORS.INTERNAL();
      }
    }
  );

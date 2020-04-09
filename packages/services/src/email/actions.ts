import * as AWS from "aws-sdk";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;
const sender = process.env.EMAIL as string;
const region = process.env.AWS_REGION as string;

AWS.config.update({ region, accessKeyId, secretAccessKey });

const client = new AWS.SES({ apiVersion: "2010-12-01" });

export const sendEmail = (
  to: string,
  subject: string,
  message: string,
  altText: string
) =>
  client
    .sendEmail({
      Destination: {
        ToAddresses: [to]
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: message
          },
          Text: {
            Charset: "UTF-8",
            Data: altText
          }
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject
        }
      },
      Source: sender
    })
    .promise();

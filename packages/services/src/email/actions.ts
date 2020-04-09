import * as AWS from "aws-sdk";

const accessKeyId = process.env.ACCESS_KEY as string;
const secretAccessKey = process.env.SECRET_KEY as string;
const region = process.env.REGION as string;
const sender = process.env.EMAIL as string;

const client = new AWS.SES({
  apiVersion: "2010-12-01",
  region,
  accessKeyId,
  secretAccessKey
});

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

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as CONSTANTS from "./../../utils/constants";
import Axios from "axios";
const nodemailer = require("nodemailer");

export const getMailOptions = async (mail, otp) => {
  let ticketHTML = `<h2>OTP valid for 5 minutes : <b>${otp}</b></h2>`;
  return {
    from: "kalakshetra.guwahati@gmail.com",
    to: mail,
    subject: `OTP`,
    html: ticketHTML,
  };
};

async function wrapedSendMail(mailOptions) {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("error is " + error);
        resolve(false); // or use reject(false) but then you will have to handle errors
      } else {
        resolve(true);
      }
    });
  });
}

export default async function handler(req, res) {
  let user;
  let allUsers = [];
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.AIRTABLE_KEY,
    };
    if (req.method === "POST") {
      function processUsers(records) {
        console.log("processUsers()");
        for (let record of records) {
          const airtable_id = record.id;
          const fields = record.fields;
          allUsers.push({ id: airtable_id, fields });
        }
      }
      function getParams(offset) {
        const params = {
          offset: offset,
        };
        return params;
      }

      const fetchAllData = async (url, processFunction) => {
        let fetchCount = 0;
        try {
          let offset = 0;
          while (true) {
            const params = getParams(offset);
            console.log("fetchCount:", fetchCount);
            await Axios.get(url, { params: params, headers: headers }).then(
              (response) => {
                fetchCount += response.data.records.length;
                offset = response.data.offset;
                processFunction(response.data.records);
              }
            );
            if (typeof offset === "undefined") {
              break;
            }
          }
        } catch (error) {
          console.error(error);
        }
        console.log("fetchCount:", fetchCount);
      };
      await fetchAllData(
        CONSTANTS.BASE_URL + CONSTANTS.BASE_ID + "/" + "users",
        processUsers
      );

      let filteredResult = allUsers.filter(
        (item) => item.fields.Email === req.body.email
      );

      if (filteredResult.length > 0) {
        let OTP = Math.floor(1000 + Math.random() * 9000);
        const expiry = new Date().getTime() + 1000 * 60 * 5;

        const myBody = {
          records: [
            {
              id: filteredResult[0].id,
              fields: {
                OTP: "" + OTP,
                ExpireOTP: expiry,
              },
            },
          ],
        };

        user = await Axios.patch(
          CONSTANTS.BASE_URL + CONSTANTS.BASE_ID + "/" + "users",
          myBody,
          {
            headers: headers,
          }
        );
        let resp = await wrapedSendMail(
          await getMailOptions(req.body.email, OTP)
        );
        res.status(200).json({ msg: "sent" });
      } else {
        res.status(404).json({ msg: "user not found" });
      }
    } else {
      res.status(400).json({ msg: "Not Allowed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

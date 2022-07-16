import Axios from "axios";
import * as CONSTANTS from "./../../utils/constants";
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

export const getMailOptions = async (mail, tickets) => {
  let ticketHTML = CONSTANTS.html1;

  for (let i = 0; i < tickets.data.records.length; i++) {
    let qr =
      `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=` +
      `Ticket Number: ${tickets.data.records[i].id} \n Name:  ${
        tickets.data.records[i].fields.Name
      } \n Gender : ${tickets.data.records[i].fields.Gender} (${
        tickets.data.records[i].fields.Child ? "child" : ""
      })`;

    ticketHTML += `                      <tr style="border: 1px solid black;">
        <td style="width:35%;padding:0;vertical-align:top;color:#153643;padding:20px 20px 0 20px">
          <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Ticket Number : <br/> ${
            tickets.data.records[i].id
          }</p>
          <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Name : <br/> ${
            tickets.data.records[i].fields.Name
          }</p>
          <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Gender : <br/> ${
            tickets.data.records[i].fields.Gender
          } ${tickets.data.records[i].fields.Child ? "( child )" : ""}</p>
        </td>
        <td style="width:45%;padding:0;vertical-align:top;color:#153643;padding:20px 20px 0 20px">
          <p style="margin:0 0 25px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><img src="${qr}" alt="qr code"/></p>
        </td>
      </tr>`;
  }

  ticketHTML += CONSTANTS.html2;

  return {
    from: "kalakshetra.guwahati@gmail.com",
    to: mail,
    subject: `Kalakshetra Tickets`,
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
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.AIRTABLE_KEY,
  };

  let tickets = "";
  let user = "";
  let email = "";
  try {
    if (req.method === "POST" && req.body.token && req.body.userId) {
      let decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);

      if (decoded.userId === req.body.userId) {
        let userInfo = await Axios.get(
          CONSTANTS.BASE_URL +
            CONSTANTS.BASE_ID +
            "/" +
            "users" +
            "/" +
            req.body.userId,
          {
            headers: headers,
          }
        );

        const records = [];
        for (let i = 0; i < req.body.info.length; i++) {
          records.push({
            fields: {
              Name: req.body.info[i].name,
              Date: req.body.date,
              Gender: req.body.info[i].gender,
              Child: req.body.info[i].isChild,
            },
          });
        }
        tickets = await Axios.post(
          CONSTANTS.BASE_URL + CONSTANTS.BASE_ID + "/" + "tickets",
          { records },
          {
            headers: headers,
          }
        );
        const Tickets = userInfo?.data?.fields?.Tickets || [];

        for (let i = 0; i < tickets.data.records.length; i++) {
          Tickets.push(tickets.data.records[i].id);
        }

        const myBody = {
          records: [
            {
              id: req.body.userId,
              fields: {
                Tickets,
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
        email = user.data.records[0].fields.Email;
      }
    }
    if (tickets) {
      let resp = await wrapedSendMail(await getMailOptions(email, tickets));
      res.status(200).json({ msg: "success" });
    } else {
      res.status(200).json({ msg: "failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

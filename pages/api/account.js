import Axios from "axios";
import * as CONSTANTS from "./../../utils/constants";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.AIRTABLE_KEY,
  };

  let Tickets = [];
  let userInfo = {};

  try {
    if (req.method === "POST" && req.body.token && req.body.userId) {
      let decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);

      if (decoded.userId === req.body.userId) {
        userInfo = await Axios.get(
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

        if (userInfo.data.fields.Tickets) {
          for (let i = 0; i < userInfo.data.fields.Tickets?.length; i++) {
            let ticketId = userInfo.data.fields.Tickets[i];
            let ticket = await Axios.get(
              CONSTANTS.BASE_URL +
                CONSTANTS.BASE_ID +
                "/" +
                "tickets" +
                "/" +
                ticketId,
              {
                headers: headers,
              }
            );
            Tickets.push(ticket.data);
          }
        }
      }
    }
    res.status(200).json({
      tickets: Tickets,
      name: userInfo.data.fields.Name,
      email: userInfo.data.fields.Email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

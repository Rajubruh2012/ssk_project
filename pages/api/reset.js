// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as CONSTANTS from "./../../utils/constants";
import Axios from "axios";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
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
        let currentEpoch = new Date().getTime();
        console.log(
          { ExpireOTP: parseInt(filteredResult[0].fields.ExpireOTP) },
          { currentEpoch }
        );
        if (
          parseInt(filteredResult[0].fields.ExpireOTP) >= currentEpoch &&
          filteredResult[0].fields.OTP === req.body.otp
        ) {
          let newPassword = jwt.sign(req.body.password, process.env.JWT_SECRET);

          const myBody = {
            records: [
              {
                id: filteredResult[0].id,
                fields: {
                  Password: newPassword,
                },
              },
            ],
          };

          let user = await Axios.patch(
            CONSTANTS.BASE_URL + CONSTANTS.BASE_ID + "/" + "users",
            myBody,
            {
              headers: headers,
            }
          );

          res.status(200).json({ msg: "reset" });
        } else {
          res.status(200).json({ msg: "otp expired or not valid" });
        }
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

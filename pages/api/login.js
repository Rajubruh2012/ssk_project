// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as CONSTANTS from "./../../utils/constants";
import Axios from "axios";

const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  let allUsers = [];
  let foundUser = false;
  let token = "";
  let userId = "";
  let email = "";
  let name = "";
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.AIRTABLE_KEY,
    };
    if (req.method.toLowerCase() === "post") {
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

      for (let i = 0; i < allUsers.length; i++) {
        if (
          allUsers[i].fields?.Email?.toLowerCase() ===
          req.body.email?.toLowerCase()
        ) {
          let password = jwt.sign(req.body.password, process.env.JWT_SECRET);
          if (password === allUsers[i].fields?.Password) {
            userId = allUsers[i].id;
            email = allUsers[i].fields.Email;
            name = allUsers[i].fields.Name;
            foundUser = true;
          }
        }
      }

      console.log("found user", foundUser);
      const now = new Date().getTime();

      token = jwt.sign(
        { email: allUsers[0].fields.Email, userId, now },
        process.env.JWT_SECRET
      );
    }

    if (foundUser) {
      res.status(200).json({ msg: "success", userId, token, email, name });
    } else {
      res.status(200).json({ msg: "not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

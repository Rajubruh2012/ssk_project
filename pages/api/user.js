// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as CONSTANTS from './../../utils/constants';
import Axios from "axios";
const jwt = require('jsonwebtoken');


export default async function handler(req, res) {
  console.log(req.body);
  // if(req.method === "GET"){

  // }
  let user;
  let allUsers = []
  let foundUser = false;

  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + process.env.AIRTABLE_KEY
    }
    if (req.method === "POST") {


      function processUsers(records) {
        console.log('processUsers()');
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
            console.log('fetchCount:', fetchCount);
            await Axios.get(url, { params: params, headers: headers }).then(
              (response) => {
                fetchCount += response.data.records.length;
                offset = response.data.offset;
                processFunction(response.data.records);
              }
            );
            if (typeof offset === 'undefined') {
              break;
            }
          }
        } catch (error) {
          console.error(error);
        }
        console.log('fetchCount:', fetchCount);
      };
      await fetchAllData(CONSTANTS.BASE_URL + CONSTANTS.BASE_ID + "/" + 'users', processUsers);

      for (let i = 0; i < allUsers.length; i++) {

        if (allUsers[i].fields?.Email?.toLowerCase() === req.body.email?.toLowerCase())
        foundUser = true;

      }

      if (!foundUser) {

        const myBody = {
          "records": [
            {
              "fields": {
                "Name": req.body.name,
                "Email": req.body.email,
                "Password": jwt.sign(req.body.password, process.env.JWT_SECRET),
                "OTP": "0000"
              }
            }
          ]
        }

        user = await Axios.post(CONSTANTS.BASE_URL + CONSTANTS.BASE_ID + "/" + 'users', myBody, {
          headers: headers
        })
        console.log("user", user.data.records[0].id)
      }
    }
    if(!foundUser){
      res.status(200).json({ msg: 'done', id: user?.data?.records[0]?.id })
    }else{
      res.status(200).json({ msg: 'user exists'})
    }
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }

}

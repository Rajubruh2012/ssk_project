const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  // console.log(req.body)
  let newToken = false;
  try {
    if (req.method === "POST" && req.body.userId && req.body.token) {
      try {
        const now = new Date().getTime();

        let decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);

        if (decoded.userId === req.body.userId) {
          newToken = jwt.sign(
            { email: decoded.email, userId: req.body.userId, now },
            process.env.JWT_SECRET
          );
        }
      } catch (err) {
        newToken = false;
      }
    }
    if (newToken) {
      res.status(200).json({ msg: "success", token: newToken });
    } else {
      res.status(200).json({ msg: "failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

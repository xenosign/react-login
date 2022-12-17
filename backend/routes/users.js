const express = require("express");
const router = express.Router();

// mongo controller 모듈 가져오기
const db = require("../controllers/mongoController");

router.post("/register", async (req, res) => {
  const registerInfo = req.body;
  const result = await db.register(registerInfo);
  res.send(JSON.stringify(result));
});

router.post("/login", async (req, res) => {
  const loginInfo = req.body;
  const result = await db.login(loginInfo);
  res.send(JSON.stringify(result));
});

module.exports = router;

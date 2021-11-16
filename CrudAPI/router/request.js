const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Schema = require("../models/schema");
const User = require("../models/schema");
const jwt = require("jsonwebtoken");
const bcryptSalt = process.env.BCRYPT_SALT;


router.get("/employee", async (req, res) => {
  //console.log('Get Request')
  //res.send('Get request')
  try {
    const reuest = await Schema.find();
    res.json(reuest);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.get("/find_employee/:id", async (req, res) => {
  try {
    const reuest = await Schema.findById(req.params.id);
    res.json(reuest);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const schema = new Schema({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      dob: req.body.dob,
      mobile: req.body.mobile,
      email: req.body.email,
      role: req.body.role,
      password: hash,
    });
    schema
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Employee Added!",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

router.patch("/update/:id", async (req, res) => {
  try {
    const schema = await Schema.findById(req.params.id);
    const hash = await bcrypt.hash(req.body.password, Number(bcryptSalt));
  
      (schema.firstname = req.body.firstname),
      (schema.lastname = req.body.lastname),
      (schema.gender = req.body.gender),
      (schema.dob = req.body.dob),
      (schema.mobile = req.body.mobile),
      (schema.email = req.body.email),
      (schema.role = req.body.role),
      (schema.password = hash);
    const s1 = await schema.save();
    
    res.json(s1);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const schema = await Schema.findById(req.params.id);
    await schema.remove();
    res.send("Record Deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/post", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      //console.log(authData);
      res.json({
        message: "Post Created....",
        authData,
      });
    }
  });
});

router.post("/login", (req, res, next) => {
  var fetchedUser;
  User.findOne({ email: req.body.email }).then((user) => {
    
   
    if (!user) {
      return res.status(401).json({
        message: "Auth failed",
      });
    }
    else if(!bcrypt.compareSync(req.body.password, user.password)){
      return res.status(401).json({ error: 'Email or Password is incorrect'});
    }
    
    fetchedUser = user;
    //console.log(user)
    jwt.sign({ fetchedUser }, "secretkey",{ expiresIn: "30s" },(err, token) => {
        res.json({
          token,
        });
      }
    );
    //console.log(user.password)
    return bcrypt.compare(req.body.password, user.password);
    
  });
  
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1];

    req.token = bearerToken;

    next();
  } else {
    res.sendStatus(403);
  }
}
module.exports = router;

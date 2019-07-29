const Event = require("./models/events");
const express = require("express");
var app = express();
const db = require("./connection");
const User = require("./models/users");
const myParser = require("body-parser");
var cors = require("cors");
var jwt = require("jsonwebtoken");
var jwtSecret = "secretkey";
var bcrypt = require("bcrypt");

app.use(myParser.urlencoded({ extended: true }));
app.use(myParser.json());
const session = require("express-session");
app.use(session({ secret: "test" }));
app.use(cors());


let allowCrossDomain = function (req, res, next) {
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PATCH, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
};
app.use(allowCrossDomain);

app.listen(3000);

function verifyToken(req, res, next) {

  const bearerHeader = req.headers["authorization"]

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }
  else {
    res.send(403)
  }
}

app.post("/", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({ email }, (err, user) => {
    if (err) {
      res.send('Error from database').status(500);
    } else {
      if (user !== null) {
        if (bcrypt.compareSync(password, user.password)) {
          const access_token = jwt.sign({ email: user.email }, jwtSecret);
          res.send({ access_token, user })
        } else {
          res.status(401).send("Password not correct")
        }
      } else {
        res.status(403).send('Credentials not correct');
      }
    }
  })
})


app.post("/register", (req, res, next) => {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var username = req.body.username;
  var email = req.body.email;
  var phone = req.body.phone;
  var password = req.body.password;

  let newuser = new User({
    firstname: firstname,
    lastname: lastname,
    username: username,
    email: email,
    phone: phone,
    password: password
  });

  console.log(newuser);

  User.findOne({ email }, (err, user) => {
    if (err) {
      res.send('Error creating user');
    } else {
      if (!user) {
        newuser.save(function (err) {
          if (err) {
            res.status(406).send(err)
            return next(err);
          }
          const access_token = jwt.sign({ email: newuser.email }, jwtSecret);
          res.send({ access_token })
        })
      } else {
        res.status(406).send('User already exist')
      }
    }
  })
});

app.post("/newevent", (req, res, next) => {
  var eventname = req.body.eventname;
  var eventdate = req.body.eventdate;
  var eventdescription = req.body.eventdescription;
  var eventlocation = req.body.eventlocation;
  // var userEmail = req.session.email;

  let newevent = new Event({
    eventname: eventname,
    eventdate: eventdate,
    eventdescription: eventdescription,
    eventlocation: eventlocation,
    // userEmail: userEmail
  });

  console.log(newevent);

  newevent.save(function (err) {
    if (err) {
      return next(err);
    }
    res.send("Event Added");
  });

  // User.findOne({ email: req.decodedUserMail }, (err, user) => {
  //   if (user !== null) {
  //     user.events.push(newevent);
  //     user.save();
  //     newevent.save(function (err) {
  //       if (err) {
  //         return next(err);
  //       }
  //       res.send("New event saved");
  //     })
  //   } else {
  //     res.send('Error saving event')
  //   }
  // })
})
  


app.get("/events", verifyToken, (req, res, next) => {
  jwt.verify(req.token, jwtSecret, (err, authData) => {
    if (err) {
      res.send(403)
    }
    else {
      Event.find({}, function (err, events) {
        if (err) {
          return next(err);
        }
        res.send(events);
      });
      authData
    }
  })

})

// app.get("/events", (req, res) => {
//   User.findOne({ email: req.decodedUserMail })
//     .populate('events')
//     .exec((err, user) => {
//       if (!err && user !== null) {
//         res.send(user.events)
//       } else {
//         res.status(500).send("Error getting events")
//       }

//     })
// })




app.patch("/editevent/:id", verifyToken, (req, res, next) => {
  jwt.verify(req.token, jwtSecret, (err, authData) => {
    if (err) {
      res.send(403)
    }
    else {
      Event.findByIdAndUpdate({ _id: req.params.id }, req.body, function (err) {
        console.log(res)
        if (err) {
          return next(err)
        }
        res.send("Event Edited")
        console.log(res)
      })
      authData
    }
  })
})

app.delete("/events/:id", (req, res, next) => {
  Event.deleteOne({ _id: req.params.id }, function (err) {
    if (err) {
      return next(err);
    }
    Event.find({}).then(data => res.send(data))
  });
});
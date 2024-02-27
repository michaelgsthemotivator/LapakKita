const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;
const indexRoutes = require("./routes/index");
const authenticate = require("./authenticationMiddleware");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "rahasia",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: true,
    },
  })
);

app.use("/", indexRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

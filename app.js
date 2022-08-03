const express = require("express");
const app = express();
const { projects } = require("./data.json");

//Set Pug view engine
app.set("view engine", "pug");

//Static route to serve static files in 'public' folder
app.use("/static", express.static("public"));

//Index route
app.get("/", (req, res) => {
  res.locals.projects = projects;
  res.render("index");
});

//About route
app.get("/about", (req, res) => {
  res.render("about");
});

//Dynamic projects route
app.get("/projects/:id", (req, res, next) => {
    console.log("Hi");
    const id = req.params.id;

  if (projects[id]) {
    const project = projects[id];
    res.render("project", { project });
  } else {
    const err = new Error();
    err.status = 404;
    err.message = `Oops! The project you are looking for doesn't exist.`;
    next(err);
  }
});

// 404 Error Handler  
app.use((req,res, next)=>{
    const err = new Error();
    err.status = 404;
    err.message = "Oops! The page you are looking for doesn't exist";
    console.log(err.message);
    next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  const error = new Error();
  error.status = err.status || 500;
  error.message = err.message || "Internal Server Error";
  res.status(error.status);
  console.log(error);
  res.render("error", { error });
});

//Starts app, listening on port 3000
app.listen(3000, () => {
  console.log("Testing 1...2...3");
});

// module.exports = router;

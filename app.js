const express = require('express');
const app = express();
const { projects } = require('./data.json');

//Set Pug view engine
app.set('view engine', 'pug');

//Static route to serve static files in 'public' folder
app.use('/static', express.static('public'));

//Index route
app.get('/', (req, res) => {
    res.locals.projects = projects;
    res.render('index');
});

//About route
app.get('/about', (req, res) => {
    res.render('about');
    
})

//Dynamic projects route
app.get('/projects/:id', (req, res, next) => {
    const id = +req.params.id;
    if (projects[id]) {
        const project = projects[id];
        return res.render('project', { project });
    } else {
        const err = new Error(`That project doesn't exist`);
        err.status = 400;
        next(err); 
    }
});

//Starts app, listening on port 3000
app.listen(3000, () => {
    console.log('Testing 1...2...3');
  
  })

// Handling errors
app.use((err, req, res, next) => {
    if(err){
        const err = new Error("Oops. Page not found.")
        err.status = 404;
        console.log(err);
        next(err);
    }
});

module.exports = router;  
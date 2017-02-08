
const express = require('express'),
      hbs = require('hbs'),
      bodyParser = require('body-parser'),
      displayRoutes = require('express-routemap')
      morgan = require('morgan');

var app = express(),
     db = require('./models');


app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
   res.render('index');
});

app.get('/login', (req, res) => {
   res.render('admin/login');
});

app.post('/login', (req, res) => {

});

app.get('/register', (req, res) => {
   res.render('admin/new-user');
});

app.post('/register', (req, res) => {
   db.User.create(req.body).then((user) => {
      res.redirect('/login');
   }).catch((error) => {
      console.log(error);
      res.render('/register', { errors: error.errors });
   });
});


db.sequelize.sync().then(() => {
   app.listen(3000, (req, res) => {
      displayRoutes(app);
      console.log('App listening on 3000!');
   });
});


const express = require('express'),
      hbs = require('hbs'),
      bodyParser = require('body-parser'),
      bcrypt = require('bcrypt'),
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
   db.User.findOne({
      where: {
         email: req.body.email,
      }
   }).then((UserInDB) => {
      bcrypt.compare((req.body.password, UserInDB.passwordDigest, (error, result) => {
         if (result) {
            req.session.user = UserInDB;
            res.render('/admin');
         } else {
            res.render('admin/login', {
               error: {
                  message: 'Lösenordet är ej korrekt'
                  }
               });
            }
         })
      )
   });
});

app.get('/admin', (req, res) => {
   res.render('admin/show');
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

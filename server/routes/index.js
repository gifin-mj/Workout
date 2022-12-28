var express = require('express');
var router = express.Router();
var passport = require('passport');

var GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
var GITHUB_CLIENT_SECRET = process.env.GITHUB_SECRET;

var controllers=require('../controllers/controllers')
const services=require('../services/render')

//checking for userloggedin
const verifyLogin = (req, res, next) => {
  if (req.session.userloggedIn) next();
  else res.redirect("/login");
};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

//githublogin
router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
      req.session.user = req.user;
      req.session.userloggedIn = true;
      res.redirect("/");
  });

  //logout
  router.get('/logout', function(req, res){
    req.logout(()=>{});
    req.session.user=null
    req.session.userloggedIn = false;
    res.redirect('/');
  });


/* GET home page. */
router.get('/', services.index);
/* GET signup page. */
router.get('/signup',services.signup)
/* GET lgin page. */
router.get('/login',services.login)
/* post signup data. */
router.post('/signup',controllers.signup)
/* submitting login data. */
router.post('/login',controllers.login)
/* get workout page. */
router.get('/workout',verifyLogin,services.workout)
/* submitting workout data. */
router.post('/workout',verifyLogin,controllers.workout)
/* get edit page. */
router.get('/edit/:id',verifyLogin,services.edit)
//deleting data
router.get('/delete/:id',verifyLogin,controllers.delete)
/* submitting workout data for update*/
router.post('/update/:id',verifyLogin,controllers.update)

module.exports = router;

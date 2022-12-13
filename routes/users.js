const express = require('express');
const router = express.Router();
const passport = require('passport');
const user = require('../controllers/users');



router.route('/register')
      .get(user.register)
      .post(user.pregister)

router.route('/login')
      .get(user.login)
      .post(passport.authenticate('local', {successRedirect:'/', failureRedirect: '/admin/login' }), user.plogin)

router.get('/about-us', user.aboutUs);

router.get('/wishlist', user.wishlist);

router.get('/logout', user.logout);

router.get('/profile', user.profile);

router.get('/user-list', user.userlist);

router.get('/user-profile', user.userProfile)

module.exports = router

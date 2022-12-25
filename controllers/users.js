
const Admin  = require('../models/Admin');
const User = require('../models/User');


module.exports.index = (req, res) =>{
    console.log(req.user);
    res.render('index');
}
module.exports.login = (req, res)=>{
    res.render('sign-in');
}

module.exports.register =(req,res) => {
    res.render('sign-up');
}
module.exports.wishlist =(req,res)=> {
    res.render('wishlist');
}
module.exports.aboutUs = (req, res) => {
    res.render('about-us');
}

module.exports.pregister = async(req,res)=>{
    // console.log('***************');

    try{

       
        const { 
           name,
            email,
            password,
            cpassword
         } = req.body;
    

         if(password!==cpassword)
         {
            console.log('password do not match');
           res.redirect('/admin/register');
         }

         const admin = new Admin({
            name,
            email,
            password,
        });
// console.log('*****users******', user);

const registeredAdmin = await Admin.register(admin, password);
req.login(registeredAdmin, function(err) {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.redirect('/');
  });
    }
    catch(er)
    {
        console.log(er);
        res.redirect('/admin/register');
    }
   

}

module.exports.plogin = (req, res) => {

    
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
       
        res.redirect('/');
      });
}


module.exports.profile = (req, res)=>{
    res.render('profile');
}
module.exports.userProfile = (req, res)=>{
    res.render('user-profile');
}

module.exports.userlist = async(req, res) => {
    const users = await User.find({});
    res.render('user-list', {users});
}

module.exports.mainCategory = (req, res) => {
    res.render('main-category');
}

module.exports.newOrder = async(req, res) =>{
    res.render('new-order')
}


const { Router} = require('express');
const router = Router();

const{ ensureAuth, ensureGuest } = require('../middleware/auth');
const Story = require('../models/story')

//desc  login/landing page
//route GET
router.get('/',ensureGuest,(req,res)=>{
res.render('login',{Layout:'Login'});

});
//desc  Dashboard
//route GET/dashboard
router.get('/dashboard', ensureAuth, async(req,res)=>{
    try{
        const stories = await Story.find({user: req.user.id}).lean();
         res.render('dashboard',{
        name: req.user.firstName,
    }); 

    }catch(err){
        console.error(err);
        res.render('error/500');
    }
    
  
    
    });


module.exports=router 
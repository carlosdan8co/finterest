const router=require('express').Router();
const {unlink} = require('fs-extra');
const path=require('path');

const Image=require('../models/Image')

module.exports = router;

router.get('/', async (req,res)=>{
    const images = await Image.find();
    console.log(images);
    res.render('index',{images});
});

router.get('/upload',(req,res)=>{
    res.render('upload');
});

router.post('/upload',async (req,res)=>{
    const image=new Image();
    image.title=req.body.title;
    image.description=req.body.description;
    image.filename=req.file.filename;
    image.path='/img/uploads/' + req.file.filename;
    image.originalname=req.file.originalname;
    image.mimetype=req.file.mimetype;
    image.size=req.file.size;
    await image.save();
    res.redirect('/');
});

router.get('/image/:id',async (req,res)=>{
    const image=await Image.findById(req.params.id);
    console.log(image);
    res.render('profile',{image});
});

router.get('/image/:id/delete',async(req,res)=>{
    const image= await Image.findByIdAndDelete(req.params.id);
    await unlink(path.resolve('./src/public'+image.path))
    res.redirect('/');
});
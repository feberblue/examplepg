const { Router } = require('express')
const router = Router();

const Photo = require('../models/photo');
const cloudinary = require('cloudinary');
const fs = require('fs-extra');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

router.get('/', (req, res) => {
   // const photos = await Photo.find();
    //console.log(photos);
    //res.render('image', { photos: photos });
    res.render('image');
});

router.get('/images/add', (req, res) => {
    //const photos = await Photo.find();
    //res.render('image_form', { photos });
    res.render('image_form')
});

router.post('/images/add', async (req, res) => {

    const resul = await cloudinary.v2.uploader.upload(req.file.path);
    const newPhoto = new Photo({
        title: req.body.imagename,
        description: req.body.description,
        imageUrl: resul.url,
        public_id: resul.public_id
    });

    await newPhoto.save();
    await fs.unlink(req.file.path)
    res.redirect("/");
});

router.get('/images/delete/:id_photo', async (req, res)=>{
    const {id_photo} = req.params;
    const photo = await Photo.findByIdAndDelete(id_photo);
    const result = await cloudinary.v2.uploader.destroid(photo.public_id);
    console.log(result);
    res.redirect('/images/add');
});

module.exports = router;
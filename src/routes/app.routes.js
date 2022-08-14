const Express = require('express');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid')
const Router = Express.Router();
const Post = require('../models/Post.js');
//Configuracion de como se obtendran las imagenes
const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', 'public', 'img', 'uploads'),
    filename: (req, file, cb, filename) => 
    {
        cb(null, uuid.v4()+ path.extname(file.originalname))
    }
})
const upload = multer({storage : storage})

//Obetener las publicaciones
Router.get('/posts', async (req, res) => 
{
    const Posts = await Post.find();
    res.json(Posts)
})

// Obtener publicacion (de modo mas especifico) por ID
Router.get('/posts/:id', async (req, res) => 
{
    const post_id = await Post.findById({_id: req.params.id});
    res.json(post_id);
});

//Crear publicacion
Router.post('/posts', upload.single('image'), async (req, res) => 
{
    const obj = {
        username: req.body.username,
        filename: req.file.filename,
        path: req.file.path,
        title: req.body.title,
        description: req.body.description
    };
    if(obj)
    {
        const post = new Post(obj);
        post.save();
        res.json({Status: "Post public"});
    } else{
        res.json({"Status" : "404"})
    }
});

//Actualizar publicacion
Router.put('/posts/:id', async (req, res) => 
{
    const {username, title, description } = req.body;
    const newPost = {username, title, description};
    await Post.findByIdAndUpdate(req.params.id, newPost);
    res.json({Status: "Post Updated"})
})

//Eliminar publicacion
Router.delete('/posts/:id', async (req, res) =>
{
    await Post.findByIdAndDelete(req.params.id);
    res.json({"Status" : "Post deleted"});
})




module.exports = Router, storage;
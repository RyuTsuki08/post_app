const Express = require('express');
const Router = Express.Router();
const Post = require('../models/Post.js');

//Obetener las publicaciones
Router.get('/posts', async (req, res) => 
{
    const Posts = await Post.find();
    res.json(Posts)
})

// Obtener publicacion (de modo mas especifico) por ID
Router.get('/posts/:id', async (req, res) => 
{
    if(req.params.id)
    {
        const post_id = await Post.findById(req.params.id);
        res.json(post_id);
    } else {
        res.json({"Status": "Post not found"})
    }
});

//Crear publicacion
Router.post('/posts', async (req, res) => 
{
    const { username, title, description } = req.body;
    if(username && title && description)
    {
        const post = new Post({username, title, description});
        await post.save();
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




module.exports = Router;
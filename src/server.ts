import express from 'express';
import { Sequelize } from 'sequelize/types';

export function initServer(sequelize: Sequelize) {
    const app = express();
    app.use(express.json());
    const port = 8080;

    app.get("/", ( req, res ) => {
        res.send( "Hello world!" );
    } );

    app.get("/posts", async (req, res) => {
        const Post = sequelize.models.Post;
        const User = sequelize.models.User;
        const allPosts = await Post.findAll({
            include: User,
        })

        res.status(200);
        res.json(allPosts);
    });

    app.post('/users/new', async (req, res) => {
        const {firstName, lastName, email} = req.query

        if(!firstName || !lastName || !email) {
            res.status(400);
            res.end();
        }

        const User = sequelize.models.User;
        const user = await User.create({
            firstName,
            lastName,
            email
        })
        console.log('created user', email);
        res.status(201);
        res.end();
    });

    app.post('/posts/new', async (req, res) => {
        const { userId, title, image, body, client } = req.body
        if(!userId || !title) {
            res.status(400);
            res.end();
        }

        const User = sequelize.models.User;
        const Post = sequelize.models.Post;
        const user = await User.findByPk(userId);
        console.log(user);
        if(!user) {
            res.status(400);
        }
        await Post.create({
            title,
            imageUrl: image,
            body,
            client,
            UserId: userId,
        });
        console.log('created post');
        res.status(201);
        res.end();
    });

    app.listen(port, () => {
        console.log( `server started at http://localhost:${ port }` );
    } );
    }
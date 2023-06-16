import { db, db2 } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
    const id = req.query.id;
    const q = req.query.cat
        ? "SELECT * FROM posts WHERE cat = ?"
        : "SELECT * FROM posts";
    
    
    db.query(q, [req.query.cat, id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    })
}

export const getPostsRecon = (req, res) => {
    const id = req.query.id;
    const q = "SELECT * FROM posts WHERE cat = ? AND id != ? LIMIT 3"
    
    db.query(q, [req.query.cat, id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    })
}

export const getPost = (req, res) => {
    const q = "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`, `date` FROM user u JOIN posts p ON u.id=p.uid WHERE p.id = ?"

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    })
}

export const addPost = async (req, res) => {
    try {
        // const token = req.cookies.access_token;
        // if (!token) return res.status(401).json("Not authenticated");

        // const tokenRes = jwt.verify(token, "jwtkey")
        // if (!tokenRes) return res.status(403).json("Token is not valid");

        const q = "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)";

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            req.body.id,
            // userInfo.id,
        ]

        const [res] = await db2.query(q, [values]);

        return res.status(200).json("Post has been created");
      
    } catch (error) {
        console.log(error);
    }
    // const token = req.cookies.access_token;
    // if (!token) return res.status(401).json("Not authenticated");

    // jwt.verify(token, "jwtkey", (err, userInfo) => {
    //     if (err) return res.status(403).json("Token is not valid");

        // const q = "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)";

        // const values = [
        //     req.body.title,
        //     req.body.desc,
        //     req.body.img,
        //     req.body.cat,
        //     req.body.date,
        //     req.body.id,
        // ]

        // db.query(q, [values], (err, data) => {
        //     if (err) return res.status(500).json(err);

        //     return res.status(200).json("Post has been created");
        // })
    // })
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        // const id = req.body.id;
        const q = `DELETE FROM posts WHERE id = ${postId}`;
        await db2.query(q);
        return res.json("Post has been deleted");
    } catch (error) {
        console.log(error);
    }
    // const token = req.cookies.access_token;
    // if (!token) return res.status(401).json("Not authenticated");

    // jwt.verify(token, "jwtkey", (err, userInfo) => {
    //     if (err) return res.status(403).json("Token is not valid");


        // const postId = req.params.id;
        // const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

        // db.query(q, [postId, req.body.id], (err, data) => {
        //     if (err) return res.status(403).json("You can only delete your post");

        //     return res.json("Post has been deleted");
        // })
    // })
}

export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const id = req.body.id

        const q = "UPDATE posts SET `title` = ?, `desc` = ?, `img` = ?, `cat` = ? WHERE `id` = ? AND `uid` = ? ";

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
        ]

        await db2.query(q, [...values, postId, id])
        return res.status(200).json("Post has been updated");
    } catch (error) {
        console.log(error);
    }
    // const token = req.cookies.access_token;
    // if (!token) return res.status(401).json("Not authenticated");

    // jwt.verify(token, "jwtkey", (err, userInfo) => {
    //     if (err) return res.status(403).json("Token is not valid");

    //     const postId = req.params.id;

    //     const q = "UPDATE posts SET `title` = ?, `desc` = ?, `img` = ?, `cat` = ? WHERE `id` = ? AND `uid` = ? ";

    //     const values = [
    //         req.body.title,
    //         req.body.desc,
    //         req.body.img,
    //         req.body.cat,
    //     ]

    //     db.query(q, [...values, postId, userInfo.id], (err, data) => {
    //         if (err) return res.status(500).json(err);

    //         return res.status(200).json("Post has been updated");
    //     })
    // })
}
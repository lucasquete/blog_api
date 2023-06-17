import { db, db2 } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {

    try {
        const email = req.body.email;
        const username = req.body.username

        const q = `SELECT * FROM user WHERE email = "${email}" OR username = "${username}"`;

        const [data] = await db2.query(q);

        if (data.length) return res.status(400).json("User already exists");

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q1 = "INSERT INTO user(`username`, `email`, `password`, `img`) VALUES (?)";
        const values = [
            req.body.username,
            req.body.email,
            hash,
            req.body.img,
        ]

        await db2.query(q1, [values]);

        return res.status(200).json("User has been created");
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    // const q = "SELECT * FROM user WHERE username = ?";
    // db.query(q, [req.body.username], (err, data) => {
    //     if (err) return res.json(err);
    //     if (data.length === 0) return res.status(404).json("user not found");

    //     const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

    //     if (!isPasswordCorrect) return res.status(400).json("Wrong username or password");

    //     const token = jwt.sign({ id: data[0].id }, "jwtkey");

    //     const { password, ...others } = data[0];

    //     res.cookie("access_token", token, {
    //         httpOnly: true,
    //     }).status(200).json(others);


    // })

    try {
        const q = "SELECT * FROM user WHERE username = ?";
        const [data] = await db2.query(q, req.body.username);

        if (data.length === 0) return res.status(404).json("user not found");

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password");

        const token = jwt.sign({ id: data[0].id }, "jwtkey");

        const { password, ...others } = data[0];

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(others);
    } catch (error) {
        console.log(error);
    }
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true,
    }).status(200).json("User has been logout");
}
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const register = async (req, res) => {
    try {
        const {username,password,repeatPassword} = req.body;
        if(await User.findOne({username})) {
            return res.status(400).json({message: "Username already exists"});
        }
        if(password !== repeatPassword) {
            return res.status(400).json({message: "Passwords do not match"});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({username, password: hashedPassword});
        await user.save();
        res.status(201).json({message: "User registered successfully"});
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        console.log(password, user)
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({message: "Invalid credentials"});
        }
        const token = jwt.sign({username: user.username, id: user._id}, process.env.SECRET_KEY, {expiresIn: "24h"});
        const userWithoutPassword = {
            username: user.username,
            id: user._id
        }
        res.status(200).json({user: userWithoutPassword, token});
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
}


import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';


export const createUser = async (req, res) => {
    const { name, email, picture, phone, bio, password } = req.body;
    try {
        const exists = await UserModel.findOne({email});
        if(exists) return res.status(404).json({ message: "Email already in use"});

        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValid = re.test(email);
        if(!isValid) return res.status(400).json({ message: "Invalid email"});

        if(password === "") return res.status(400).json({ message: "Invalid password"});
        if(password.length < 6) return res.status(400).json({ message: "Password must be at least 6 character"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await UserModel.create({ name, email, picture, phone, bio, password: hashedPassword});
        
        const token = jwt.sign({ email: newUser.email, id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

        const user = { 
            id: newUser._id,
            name: newUser.name, 
            email: newUser.email,
            picture: newUser.picture,
            phone: newUser.phone,
            bio: newUser.bio,
        }
        res.status(200).json({ user, token });
        
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const foundUser = await UserModel.findOne({ email });
        if(!foundUser) return res.status(404).json({ message: "User not found."} );
        if(foundUser.password === "") return res.status(404).json({ message: "Sorry, you have used oAuth. Try using Google login"});

        const passwordMatched = await bcrypt.compare(password, foundUser.password);
        if(!passwordMatched) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: foundUser.email, id: foundUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

        const user = { 
            id: foundUser._id,
            name: foundUser.name, 
            email: foundUser.email,
            picture: foundUser.picture,
            phone: foundUser.phone,
            bio: foundUser.bio,
        }
        
        res.status(200).json({ user, token});
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}

export const getUserInfo = async (req, res) => {
    const {id:_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({ message: "No user with this id"});

    try {
        const foundUser = await UserModel.findById(_id);

        const token = jwt.sign({ email: foundUser.email, id: foundUser._id}, process.env.JWT_SECRET,{ expiresIn: "1h" });

        const user = { 
            id: foundUser._id,
            name: foundUser.name, 
            email: foundUser.email,
            picture: foundUser.picture,
            phone: foundUser.phone,
            bio: foundUser.bio,
            // password: 
        }

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const editUser = async (req, res) => {
    const {id: _id} = req.params;
    const user = req.body;
    let filteredUser;

    if(user.password === "") {
        filteredUser = {
            id: user.id,
            name: user.name, 
            email: user.email,
            picture: user.picture,
            phone: user.phone,
            bio: user.bio,
        }
    }else {
        if(user.password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters"});
        const hashedPassword = await bcrypt.hash(user.password, 12);
        filteredUser = {...user, password: hashedPassword};
    }
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({ message: "No user with this id"});
    
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(_id, filteredUser, { new: true});
        const token = jwt.sign({ email: updatedUser.email, id: updatedUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

        const user2 = { 
            id: updatedUser._id,
            name: updatedUser.name, 
            email: updatedUser.email,
            picture: updatedUser.picture,
            phone: updatedUser.phone,
            bio: updatedUser.bio,
        }

        res.status(200).json({ user: user2, token });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
} 

export const googleAuth = async(req, res) => {
    const { data } = req.body;
    console.log(data);
    const foundUser = await UserModel.findOne({ email: data?.email });

    if(foundUser) {
        try {
            const token = await jwt.sign({ email: foundUser.email, id: foundUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
    
            const user = {
                id: foundUser._id,
                name: foundUser.name, 
                email: foundUser.email,
                picture: foundUser.picture,
                phone: foundUser.phone,
                bio: foundUser.bio,
            }
            
            res.status(200).json({ user, token });
        } catch (error) {
            res.status(400).json({ message: error.message});
        }

    }else {

        try {

            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const isValid = re.test(data.email);
            if(!isValid) return res.status(400).json({ message: "Invalid email"});
            
            const newUser = await UserModel.create({ 
                name: data.name, 
                email: data.email, 
                picture: data.imageUrl, 
                phone : "", 
                bio: "", 
                password: ""
            });
            
            const token = jwt.sign({ email: newUser.email, id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
    
            const user = { 
                id: newUser._id,
                name: newUser.name, 
                email: newUser.email,
                picture: newUser.picture,
                phone: newUser.phone,
                bio: newUser.bio,
            }
            res.status(200).json({ user, token });
            
            
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
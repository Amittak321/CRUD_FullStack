//Logic, BL

const User = require("../model/user");

exports.home = (req, res)=>{
    res.send("Hello Alpha");
};


exports.createUser = async(req, res) =>{
    try {
        const{name , email} = req.body;
        if(!name || !email){
            throw new Error("Name and email are required");
        }
        const useExist = await User.findOne({email});
        if(useExist){
            throw new Error("Email already present, please enter unique email");
        }
        const user = await User.create({
            name , email
        });
        res.status(201).json({
            success : true,
            message : "User created successfully",
            user
        })
    } catch (error) {
        console.log(error.message);
        res.status(401).json({
            success : false,
            message : error.message
        })
    }
}

exports.getUsers = async(req , res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success : true,
            message : "all users fatched successfully",
            users
        })
    } catch (error) {
        console.log(error.message);
        res.status(200).json({
            success : false,
            message : error.message
        })
    }
}

exports.editUser = async(req,res)=>{
    try {
        if(!req.params.id){
            throw new Error("Id is missing");
        }
        if(!req.body.name || !req.body.email){
            throw new Error("Name or Email is missing");
        }
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json({
            success: true,
            message :"Update successfully",
            user
        })        
    } catch (error) {
       res.status(401).json({
        success : false,
        message : error.message
       }) 
    }
}

exports.deleteUser = async(req,res)=>{
    try {
        const id = req.params.id;
        if(!req.params.id){
            throw new Error("Id is missing");
        }
        
        const user = await User.findByIdAndDelete(id);
        res.status(201).json({
            success : true,
            message :"User Deleted successfully",
            user
        })
    } catch (error) {
        res.status(401).json({
            success : false,
            message : error.message
           }) 
    }
}
import user from '../model/userModel.js';

export const createUser = async (req,res)=> {
    try{
        const { name,email,budget } = req.body;
        if(!name || !email || !budget){ return res.status(400).json({error:"all fields are required"}); }
        
        const emailCheck = await user.findOne({Email:email});
        if(emailCheck){ return res.status(409).json({error:"user already exists"}) };

        const newUser = new user({Name:name,Email:email,monthlybudget:budget});
        const savedUser = await newUser.save();

        return res.status(201).json({message:"user created successfully"});
    }
    catch(err){
        console.log("error at createUser contoller",err)
        return res.status(500).json({error:"internal server error"});
    }
}

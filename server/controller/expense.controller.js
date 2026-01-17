import expense from "../model/expense.model";

export const addExpense = async (req,res)=>{
    try{
        const {} = req.body;

        
    }
    catch(err){ 
        console.error('error at addExpense function',err)
        return res.status(500).json({error:"internal server error"});
    }
}


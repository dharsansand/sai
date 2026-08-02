import express from "express";
const router = express.Router();
router.get("/",(req,res)=>{
    try{
           res.status(200).json({ success: true, data: "All Run API" });
    }
    catch(error){
        res.status(500).json({ success: false, message: error.message });

    }
})
export default router;


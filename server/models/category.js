import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    title : { type: String, required: true },
    subTitle : { type: String },
    
    highlight:{type:String},
    slug:{type:String},
    content :{ type: String },
    img :{type:Array,required:true},
    Active: { type: Boolean, default: false  },
    isdelete :{ type: Boolean, default: false  },
    
},
{ timestamps: true })

const category = mongoose.model("category", categorySchema);

export default category;

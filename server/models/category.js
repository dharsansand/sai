import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema({
    categorytitle : { type: String, required: true },

  
    category :{type:Array,required:true},
    Active: { type: Boolean, default: false  },
    isdelete :{ type: Boolean, default: false  },
    
},
{ timestamps: true })

const category = mongoose.model("category", CategorySchema);

export default category;

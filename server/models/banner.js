import mongoose from "mongoose";
const bannerSchema = new mongoose.Schema({
    title : { type: String, required: true },
    subTitle : { type: String },
    content :{ type: String },
    highlight:{type:String},
    banner :{type:Array,required:true},
    Active: { type: Boolean, default: false  },
    isdelete :{ type: Boolean, default: false  },
    
},
{ timestamps: true })

const banner = mongoose.model("banner", bannerSchema);

export default banner;

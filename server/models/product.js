import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String },

    highlight: { type: String },
    slug: { type: String },
    content: { type: String },
    img: { type: Array, required: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
    Active: { type: Boolean, default: false },
    isdelete: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const product = mongoose.model("product", productSchema);

export default product;

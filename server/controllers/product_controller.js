import product from "../models/product.js";
import category from "../models/category.js";
import { encryptData } from "./encryptedData.js";
export const productImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No File Uploaded" });
    }

   
    return res.status(200).json({ 
      message: "File Upload successfully", 
      file: {
        filename: req.file.path 
      } 
    });
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const homecategory = async (req, res) => {
  try {
    const {limit} = req?.query
    const categorys = await product
      .find({ Active: true, isdelete: false })
      .sort({ createdAt: -1 }) 
      .limit(limit);             

    res.status(200).json(categorys);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching category data",
      error: error.message,
    });
  }
};

export const productGetOneData = async (req, res) => {



  try {

    const productData = await product.findOne({ slug: req.params.id })
      .populate("category"); 

 
    if (!productData) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      data: productData
    });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: error.message });
  }                                                                           
};


export const productAllData = async (req, res) => {
  try {

  
    if (req?.query?.category) {

      const categoryquery = req?.query?.category
    
     
      const categoryfind = await category.findOne({
        slug: categoryquery,
        Active: true,
        isdelete: false
      });

     
      if (!categoryfind) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
          data: []
        });
      }

      const productData = await product
        .find({
          Active: true,
          isdelete: false,
          category: categoryfind._id
        })
        .sort({ createdAt: -1 })
        .populate("category");

      

      return res.status(200).json({
        success: true,
        data: encryptData(productData)
      });
    }

    const productData = await product
      .find({
        Active: true,
        isdelete: false
      })
      .sort({ createdAt: -1 })
      .populate("category");

    return res.status(200).json({
      success: true,
      data: encryptData(productData)
    });

  } catch (error) {
    console.error("productAllData error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};
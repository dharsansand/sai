import category from "../models/category.js";
export const categoryImageUpload = async (req, res) => {
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
    const categorys = await category
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
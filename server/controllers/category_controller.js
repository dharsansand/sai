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
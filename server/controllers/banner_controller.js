export const ImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({ message: "No File Uploaded" });
    }
    const fileDetails = {
      filename: req.file.filename,
    };
    return res
      .status(200)
      .json({ message: "File Upload successfully", file: fileDetails });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message }).end();
  }
};
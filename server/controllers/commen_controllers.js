export const getAll = async (req, res, model, populate = "") => {
  try {
    const getAll = await model.find().populate(populate);
    res.status(200).json({ success: true, data: getAll });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const create = async (req, res, model) => {
   
  try {
    const post = new model(req.body);
    await post.save();
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAll = async (req, res, model, populate = "") => {
  try {
    const getAll = await model.find({ isdelete: false }).populate(populate).sort({ createdAt: -1 });;
    res.status(200).json({ success: true, data: getAll });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const updateById = async (req, res, model) => {
  try {
    const edit = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!edit) {
      return res
        .status(404)
        .json({ success: false, message: "No Data Found To Edit" });
    }
    res.status(200).json({ success: true, data: edit });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteOne = async (req, res, model) => {
  try {
    await model.findByIdAndUpdate(req.params.id, { isdelete: true }, { new: true });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

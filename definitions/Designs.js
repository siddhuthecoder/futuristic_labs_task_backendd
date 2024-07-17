import Design from "../Models/Designs.js";

export const postDesign = async (req, res) => {
  const { title, desc, keywords, components } = req.body;

  try {
    const newDesign = await Design.create({
      title,
      desc,
      keywords,
      components,
    });

    if (!newDesign) {
      return res
        .status(401)
        .json({ message: "Failed to save Design!! Try Again" });
    }

    return res
      .status(201)
      .json({ message: "Design saved successfully", design: newDesign });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getDesign = async (req, res) => {
  const { id } = req.params;
  try {
    const design = await Design.findById(id);
    if (!design) {
      return res.status(404).json({ message: "Design Not Found" });
    }

    return res.status(200).json({ design });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editDesign = async (req, res) => {
  const { id } = req.params;
  const { title, desc, keywords, components } = req.body;
  try {
    const design = await Design.findByIdAndUpdate(
      id,
      {
        title,
        desc,
        keywords,
        components,
      },
      { new: true }
    );

    if (!design) {
      return res.status(404).json({ message: "Error Saving design" });
    }
    return res
      .status(200)
      .json({ message: "Design Saved successfully", design });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

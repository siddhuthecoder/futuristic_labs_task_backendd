import mongoose from "mongoose";

const designSchema = mongoose.Schema(
  {
    title: { type: String },
    desc: { type: String },
    keywords: { type: [String], default: [] },
    components: [
      {
        type: { type: String },
        id: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Design = mongoose.model("Design", designSchema);
export default Design;

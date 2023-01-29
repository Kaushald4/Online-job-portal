import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const OrginazationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Orginazation Name is required field!"],
            trim: true,
            unique: [true, "Orginazation Name must be unique"],
        },
        location: {
            country: String,
            state: String,
            city: String,
        },
        orginazationType: {
            type: String,
            required: [true, "Orginazation Type is required field!"],
            trim: true,
        },
        website: {
            type: String,
            trim: true,
        },
        about: {
            type: String,
            trim: true,
            maxLength: [1000, "About field can not be more than 500 chars long"],
        },
        headline: {
            type: String,
            trim: true,
            maxLength: [250, "Headline can not be more than 250 chars"],
        },
        coverPhoto: {
            secureUrl: String,
            photoId: String,
        },
        photo: {
            secureUrl: String,
            photoId: String,
        },
        author: {
            type: ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Orginazation", OrginazationSchema);

import Orginazation from "../models/Orginazation.js";
import asyncHandler from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { uploadImage } from "../utils/imageUpload.js";

/**************************************************
 * @CREATE_ORGINAZATION
 * @REQUEST_TYPE POST
 * @route /orginazation
 * @description route for creating new orginazation
 * @params {name, location, orginazationType, website, about, heading}
 * @return Orginazation Object
 **************************************************/
export const createOrginazation = asyncHandler(async (req, res, next) => {
    const { name } = req.body;

    let orginazation = await Orginazation.findOne({ name });
    if (orginazation) {
        return next(new AppError("Orginazation Name already exist!", 409));
    }

    const { secure_url: coverUrl, public_id: coverId } = await uploadImage(
        req.files["cover"][0],
        "jobportal_orginazation"
    );
    const { secure_url: photoUrl, public_id: photoId } = await uploadImage(
        req.files["photo"][0],
        "jobportal_orginazation"
    );

    orginazation = await Orginazation.create({
        ...req.body,
        coverPhoto: { secureUrl: coverUrl, photoId: coverId },
        photo: { secureUrl: photoUrl, photoId: photoId },
        author: req.user._id,
        location: JSON.parse(req.body.location),
    });

    res.status(201).json({ success: true, data: orginazation });
});

/**************************************************
 * @GET_AUTHENTICATED_USER_ORGINAZATION
 * @REQUEST_TYPE GET
 * @route /orginazation
 * @description route for returning all organazations created by current user
 * @params none
 * @return list of Orginazation Object
 **************************************************/
export const getOrginazation = asyncHandler(async (req, res, next) => {
    const orginazations = await Orginazation.find({ author: req.user._id });

    if (orginazations.length === 0) {
        return res.status(200).json({ success: false, message: "No Orginazations" });
    }

    return res.status(200).json({ success: true, data: orginazations });
});

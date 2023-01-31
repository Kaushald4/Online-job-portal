import User from '../models/User.js'
import asyncHandler from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { uploadImage } from "../utils/imageUpload.js";

/**************************************************
 * @UPDATE_USER
 * @REQUEST_TYPE PUT
 * @route /user/update
 * @description route for updating user info
 * @params none
 * @return User Object
 **************************************************/
export const updateUser = asyncHandler(async (req, res, next) => {
    const profilePhoto = {}
    const coverPhoto = {}
    const update = {}

    if(req.files['cover']) {
        const { secure_url: coverUrl, public_id: coverId } = await uploadImage(
            req.files["cover"][0],
            "jobportal_profile"
        );
        profilePhoto['secureUrl'] = coverUrl
        profilePhoto['photoID'] = coverId
    }

    if(req.files['photo']) {
        const { secure_url: photoUrl, public_id: photoId } = await uploadImage(
            req.files["photo"][0],
            "jobportal_profile"
        );
        coverPhoto['secureUrl'] = photoUrl
        coverPhoto['photoID'] = photoId
    }

    for(let key in req.body) {
        if(key !== 'password') {
            update[key] = req.body[key]
        }
    }

    User.findByIdAndUpdate({_id: req.user._id}, {$set: update}, {new: true}, (err, updatedUser) => {
        if(err) {
            return next(new AppError("Something went wrong try again!", 409));
        }
        res.status( 201).json({ success: true, data: updatedUser });
    })

});
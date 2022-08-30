const { Router } = require("express");
const UserClass = require('../Controllers/User.js');
const fileUpload = require("express-fileupload"); 
const user = new UserClass();
const router = Router();

router.use(fileUpload());
router.get('/all', user.getAllUsers)
router.get('/profileInfo', user.getProfileInfo);
router.get('/profileInfoById', user.getProfileInfoById);
router.get('/profileInfoToken', user.getProfileInfoToken);
router.get("/getPhotoUser", user.getPhotoUser);
router.post('/editProfileInfo', user.editionBasicDataProfile)
router.post('/editProfilePhoto', user.updatePhotoUser)

module.exports = router;
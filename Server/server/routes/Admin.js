const express = require("express");
const app = express();
const router = express.Router();
const { Admin } = require("../models");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");
const { createToken, validateToken, removeToken } = require("../middleware/JWT");
const cors = require("cors");


app.use(express.json());
app.use(cookieParser());
app.use(cors());


const storage = multer.diskStorage({
    destination: "./Image",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
            req.fileValidationError = "Only the image file is allowed";
            return cb(new Error("Only the image file is allowed"), false);
        }
        cb(null, true);
    },
});

router.post("/", upload.single("image"), validateToken ,async (req, res) => {
    const { 
            firstName,
            lastName,
            address,
            gender,
            email,
            number,
            adminType,
            image = req.file.path,
            username, 
            password,
        } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Admin.create({
            firstName: firstName,
            lastName: lastName,
            address: address,
            gender: gender,
            email: email,
            number: number,
            adminType: adminType,
            image: image,
            username: username,
            password: hash,
        }).then(() => {
            res.json("Success");
        }).catch((err) => {
            if(err){
                res.json({error: err.message})
            }
        });
    });
});

router.post("/login", async (req, res) => {
    try {
        const {username, password} = req.body;

        const user = await Admin.findOne({where: {username: username}});

        if (!user) return res.json({error: "Admin User doesn't exist"});

        bcrypt.compare(password, user.password).then((match) => {
            if(!match) return res.json({error: "Username and password is incorrect"});

            const accessToken = createToken(user);

            res.cookie("token", accessToken, {
                maxAge: 60 * 60  * 12 * 1000, //12 hrs =======> 9sec  for testing 3 * 3 * 1000
                httpOnly: true,
            })

            res.json("Logged in success");
        });
    } catch (err) {
        console.log("Error authentication", err);
    }
});

router.get("/logout", removeToken,async (req, res) => {
    res.json("Log out");
});

module.exports = router;
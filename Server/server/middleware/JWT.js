const jwt = require("jsonwebtoken");

const createToken = (user) => {
    const accessToken = jwt.sign({username: user.username, id: user.id, image: user.image}, "bluedragon14S");
    return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["token"];

    if(accessToken) {
        try{
            const validToken = jwt.verify(accessToken, "bluedragon14S");
            req.user = validToken;

            if(validToken){
                console.log("User Authenticated");
                req.authenticated = true;
                return next();
            }
        }catch (err) {
            return res.json({error: err});
        }
    }else{
        return res.json({error: "User not Authenticated"});
    }
}

const removeToken = (req, res) => {
    res.clearCookie("token");
    res.json("Log out");
}

module.exports = { createToken, validateToken, removeToken };
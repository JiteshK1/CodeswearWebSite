import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == "POST") {
        let user = await User.findOne({ "email": req.body.email })
        let bytes = CryptoJS.AES.decrypt(user.password, 'secret123');
        let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        // console.log(req.body.password);
        // console.log(decryptedData);
        if (user) {
            if (req.body.email == user.email && req.body.password == decryptedData) {
                let token = jwt.sign({email: user.email, name: user.name }, 'jwtsecret',{expiresIn:"2d"});
                res.status(200).json({token,success: true})
                // console.log(token);
            } else {
                res.status(400).json({ success: false, msg: "invalid credentials" });
            }
        }else{
            res.status(400).json({ success:false,msg:"no such user found"});
        }
    }
    else {
        res.status(404).json({ error: "This method is not allowed" })
    }

}

export default connectDb(handler);
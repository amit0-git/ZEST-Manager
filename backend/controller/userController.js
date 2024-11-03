const User = require("../model/user")
const bcrypt = require("bcrypt")
const axios = require('axios');
const jwt=require("jsonwebtoken")
//otp model
const OTP = require("../model/otp")
const USER = require("../model/user")


//dend otp if time is more than 5 min
//nd no record for otp exists

async function canSendOtp(email) {
    try {
        const emailExist = await OTP.findOne({ email: email });
        if (!emailExist) {
            // can send otp
            return true;
        } else {
            // check if 5 min passed for otp
            const otpduration = 5 * 60 * 1000; // 5 min in ms
            const otpRecord = await OTP.findOne({ email: email }, { time: 1 });
            if (otpRecord && otpRecord.time) {
                const startTime = otpRecord.time;
                if ((Date.now() - startTime) >= otpduration) {
                    // send otp
                    return true;
                }
            }

            //if time  is less than 5 min dont send

            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}



//send otp to the user
exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email);

        // Check if the otp can be sent
        const otpStatus = await canSendOtp(email);
        if (!otpStatus) {

            // If the OTP has been sent recently, return a message
            return res.status(400).json({ message: "You have already sent an OTP within 5 minutes." });
        }


        // Generate a new OTP (for example, a random 6-digit number)
        const otp = Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number

        // Create or update the OTP record
        const existingOtpRecord = await OTP.findOne({ email: email });
        //update the old otp in the  database

        const otpRecord = existingOtpRecord || new OTP({ email: email });

        // Update the OTP and timestamp
        otpRecord.otp = otp;
        otpRecord.time = Date.now();

        await otpRecord.save();

        // Send the OTP to the user via email (implement your email sending logic here)
        // Example: await sendEmail(email, otp);

        return res.status(200).json({ message: "OTP sent to your email!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};




//verify the captcha 
async function verifyCaptcha(captcha) {
    try {
       
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
            params: {
                secret: "6LfA1XMqAAAAANNoqMFYYW9rm8hGDI6zET9gr4HZ",
                response: captcha,
            },
        });

        return response.data; // Return the response from Google
    } catch (error) {
        console.error("Error verifying captcha:", error);
        return { success: false }; // Return false on error
    }
};


//user signup method
//1. check username already exists
//2. hash password 
//3. verify otp
//4. captcha verify
//5. create new user


exports.signup = async (req, res) => {

    const { email, password, otp, captchaValue } = await req.body;

    console.log(captchaValue, email, otp, password)
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {

            return res.status(400).json({ message: 'User already exists' });
        }


        //otp verify
        const otpRecord = await OTP.findOne({ email: email });

        if (otpRecord && otpRecord.otp !== parseInt(otp)) {

            return res.status(400).json({ message: 'Invalid OTP' });

        }

        //captcha verify
        const captchaVerify = await verifyCaptcha(captchaValue);

        if (!captchaVerify.success) {
            return res.status(400).json({ message: 'Captcha verification failed.' });
        }







        // Hash the password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            role: "User"
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

};




//user login
//1. chk email exists
//2. compare hashed password with  original password
///3 verify captcha
//4. return token

exports.login = async (req, res) => {
    try {
        const { email, password ,captchaValue} = req.body;
        console.log(email,password)
        const user = await USER.findOne({ email:email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //compare password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        //verify captcha
       
         const captchaVerify = await verifyCaptcha(captchaValue);

         if (!captchaVerify.success) {
             return res.status(400).json({ message: 'Captcha verification failed.' });
         }

        //generate token
        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY,
            {
                expiresIn: '1h'
            });

        res.status(200).json({ token, email: user.email });


    }
    catch (error) {
        console.error(error);
    }
};
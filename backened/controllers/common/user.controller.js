
import bcrypt from 'bcryptjs';
import { User } from '../../models/common/user.models.js';



const generateRefreshAndAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const newRefreshToken = await user.generateRefreshToken();
        user.refreshToken = newRefreshToken;

        await user.save({ validateBeforeSave: false });

        return { newRefreshToken, accessToken };
    } catch (error) {
        throw new Error("Something went wrong while generating access and refresh tokens");
    }
};


const signUp = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

      
        if (!['patient', 'hospital'].includes(role)) {
            return res.status(400).json({ error: "Invalid role" });
        }

        
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

       
     

      
        const createdUser = await User.create({
            username,
            email,
            password,
            role,
        });

       
        const returnedUser = await User.findById(createdUser._id).select("-refreshToken -password");

        res.status(200).json({ message: "User created successfully", user: returnedUser });

    } catch (error) {
        res.status(500).json({ message: "Error while creating user", error });
    }
};



const login = async (req, res) => {
    try {
        const { username, password } = req.body;

     
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "User doesn't exist" });
        }

    
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Incorrect password" });
        }

       
        const { accessToken, newRefreshToken } = await generateRefreshAndAccessToken(user._id);

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        };

        
        res
            .status(200)
            .cookie("accessToken", accessToken, cookieOptions)
            .cookie("refreshToken", newRefreshToken, cookieOptions)
            .json({
                message: "User logged in successfully",
                user: { username: user.username, email: user.email, role: user.role },
                accessToken,
                newRefreshToken
            });

    } catch (error) {
        console.error("Something went wrong during login", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const logout = async (req, res) => {
    try {
    
        await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });

        
        res
            .status(200)
            .clearCookie("accessToken", { httpOnly: true, secure: true })
            .clearCookie("refreshToken", { httpOnly: true, secure: true })
            .json({ message: "User logged out successfully" });

    } catch (error) {
        console.error("Logout failed", error);
        res.status(400).json({ message: "Logout failed" });
    }
};

export { signUp, login, logout };

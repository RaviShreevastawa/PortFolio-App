import { User } from '../models/userSchema.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/Response.js';
import { ApiError } from '../utils/ApiError.js';

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access tokens.");
    }
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    if(!fullname && !email && !password === " "){
        throw new ApiError(400, "All fields are mandatory !!")
    }

    const existingUser = await User.findOne({
        $or: [{ fullname }, { email }]
    });

    if (existingUser) {
        throw new ApiError(400, "User already exists with this email or username.");
    }

    const user = await User.create({ fullname, email, password });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user.");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully.")
    );
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname && !email) {
        throw new ApiError(400, "Username or email is required.");
    }

    const user = await User.findOne({
        $or: [{ fullname }, { email }]
    });

    if (!user) {
        throw new ApiError(400, "User not found with this email or username.");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid credentials.");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict"
    };

    return res
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully."));
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });

    return res
        .status(200)
        .cookie("accessToken", "", { httpOnly: true, expires: new Date(0) })
        .cookie("refreshToken", "", { httpOnly: true, expires: new Date(0) })
        .json(new ApiResponse(200, {}, "User logged out successfully."));
});

export { registerUser, loginUser, logoutUser };

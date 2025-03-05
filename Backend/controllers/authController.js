const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// 🔐 Generate Token with Comprehensive User Details
const generateToken = (user) => {
  return jwt.sign(
    {
      // Core user identification
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,

      // Explicitly include phone number
      phone: user.phone || null,  // Ensure phone is always included
      
      // Additional user details
      address: user.address || null,
      dateOfBirth: user.dateOfBirth || null,
      gender: user.gender || null,
      profilePicture: user.profilePicture || null,

      // Notification preferences
      notifications: {
        email: user.notifications?.email || true,
        sms: user.notifications?.sms || false,
        appointments: user.notifications?.appointments || true
      },

      // Preferences
      preferences: {
        language: user.preferences?.language || 'en',
        theme: user.preferences?.theme || 'light'
      }
    }, 
    process.env.JWT_SECRET, 
    { 
      expiresIn: '30d' 
    }
  );
};

// 🔹 Signup (Register User)
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, phone = '' } = req.body;

    // Validate phone number if provided
    if (phone && !/^[+]?(\d{10,14})$/.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create new user with explicit phone handling
    const newUser = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 12),
      role,
      phone: phone || '', // Ensure phone is always a string
      notifications: {
        email: true,
        sms: false,
        appointments: true
      }
    });

    // Generate token with explicit phone inclusion
    const token = generateToken(newUser);

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone || '', // Always return a string
        notifications: newUser.notifications
      }
    });
  } catch (error) {
    console.error('Signup detailed error:', error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message,
      details: error.errors // Provide more error details
    });
  }
};

// 🔹 Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email and include password for verification
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token with comprehensive user details
    const token = generateToken(user);

    // Prepare user response (explicitly include phone)
    const userResponse = {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone || '', // Explicitly include phone
        profilePicture: user.profilePicture,
        notifications: user.notifications
      }
    };

    res.status(200).json(userResponse);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Logout
// In stateless JWT authentication, logout is typically handled on the client side by removing the token.
// If using cookies, you can clear the cookie as shown below.
exports.logout = async (req, res) => {
  res.clearCookie("token"); // Clear the token cookie if you set it on login
  res.status(200).json({ message: "Logout successful" });
};

// 🔹 Forgot Password (Send OTP for Password Recovery)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a 6-digit OTP and set expiration (e.g., valid for 10 minutes)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    await user.save();

    // Setup nodemailer transporter (update with your SMTP/email configuration)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: user.email,
      subject: "Password Recovery OTP",
      text: `Your OTP for password recovery is: ${otp}. It is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 🔹 Reset Password (Using OTP)
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Find user with the matching OTP that has not expired
    const user = await User.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Hash new password
    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 🔹 Protect Routes Middleware
exports.protect = async (req, res, next) => {
  try {
    let token;
    
    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }

    // Find user and attach to request
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    // Attach user to request object
    req.user = user;

    next();
  } catch (error) {
    console.error('Protect middleware error:', error);
    res.status(500).json({ 
      message: "Server error in authentication", 
      error: error.message 
    });
  }
};

// 🔹 Update User Profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({ 
        message: "Name and email are required",
        field_errors: {
          name: !name ? "Name cannot be empty" : undefined,
          email: !email ? "Email cannot be empty" : undefined
        }
      });
    }

    // Find user by ID from protect middleware
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: "Invalid email format",
        field_errors: {
          email: "Please provide a valid email address"
        }
      });
    }

    // Check if the new email is already in use by another user
    const existingUser = await User.findOne({ 
      email, 
      _id: { $ne: user._id } 
    });
    if (existingUser) {
      return res.status(400).json({ 
        message: "Email already in use",
        field_errors: {
          email: "This email is already registered"
        }
      });
    }

    // Update user fields
    user.name = name;
    user.email = email;
    
    // Optional phone update
    if (phone) {
      // Optional: Add phone number validation
      const phoneRegex = /^[+]?(\d{10,14})$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({ 
          message: "Invalid phone number format",
          field_errors: {
            phone: "Please provide a valid phone number"
          }
        });
      }
      user.phone = phone;
    }

    // Save the updated user
    await user.save();

    // Generate a new token with updated user info
    const token = generateToken(user);

    // Prepare user response
    const userResponse = {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone || '',
        notifications: user.notifications
      }
    };

    res.status(200).json(userResponse);
  } catch (error) {
    console.error('Profile update detailed error:', error);
    res.status(500).json({ 
      message: "Server error during profile update", 
      error: error.message,
      details: error.errors || 'Unknown server error'
    });
  }
};

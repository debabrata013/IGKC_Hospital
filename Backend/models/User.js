const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false
    },
    role: {
      type: String,
      enum: ['patient', 'doctor', 'admin'],
      default: 'patient'
    },
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return /^[+]?(\d{10,14})$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    dateOfBirth: {
      type: Date
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      sms: {
        type: Boolean,
        default: false
      },
      appointments: {
        type: Boolean,
        default: true
      }
    },
    profilePicture: {
      type: String,
      default: 'default-profile.png'
    },
    medicalHistory: [{
      condition: String,
      diagnosis: String,
      date: Date
    }],
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String
    },
    preferences: {
      language: String,
      theme: String
    },
    active: {
      type: Boolean,
      default: true
    },
    specialization: {
      type: String,
      required: function () {
        return this.role === "doctor";
      },
      trim: true,
    },
    licenseNumber: {
      type: String,
      required: function () {
        return this.role === "doctor";
      },
      unique: function () {
        return this.role === "doctor";
      },
      trim: true,
    },
    experience: {
      type: Number,
      min: 0,
    },
    availability: [
      {
        day: { type: String, trim: true }, // Example: "Monday"
        startTime: { type: String, trim: true }, // Example: "09:00 AM"
        endTime: { type: String, trim: true }, // Example: "05:00 PM"
      },
    ],
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    allergies: [{ type: String, trim: true }],
    bloodType: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
    assignedDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    prescriptions: [
      {
        medicineName: { type: String, trim: true },
        dosage: { type: String, trim: true },
        frequency: { type: String, trim: true },
        prescribedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        prescribedDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    permissions: {
      type: [String], // Example: ["manage_users", "manage_appointments"]
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// **Hash Password Before Saving**
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is modified

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash password
    next();
  } catch (err) {
    next(err);
  }
});

// **Method to Compare Passwords**
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Exporting the model
module.exports = mongoose.model("User", userSchema);

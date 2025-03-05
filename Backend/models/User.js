const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["doctor", "patient", "admin"],
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    dateOfBirth: {
      type: Date,
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      zipCode: { type: String, trim: true },
      country: { type: String, trim: true },
    },
    profileImage: {
      type: String, // URL or file path
    },

    // Fields specific to Doctors
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

    // Fields specific to Patients
    medicalHistory: [
      {
        condition: { type: String, trim: true },
        diagnosisDate: Date,
        treatment: { type: String, trim: true },
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

    // Fields specific to Admins
    permissions: {
      type: [String], // Example: ["manage_users", "manage_appointments"]
    },

    // Common Fields
    resetPasswordToken: String,
    resetPasswordExpires: Date,

    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
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

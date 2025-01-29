const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  dateOfBirth: {
    type: Date,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  profileImage: {
    type: String, // URL or path to image
  },
  
  // Fields specific to Doctors
  specialization: {
    type: String,
    required: function () {
      return this.role === "doctor";
    },
  },
  licenseNumber: {
    type: String,
    required: function () {
      return this.role === "doctor";
    },
    unique: true,
  },
  experience: {
    type: Number,
  },
  availability: [
    {
      day: String, // Monday, Tuesday, etc.
      startTime: String, // "09:00 AM"
      endTime: String, // "05:00 PM"
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
      condition: String,
      diagnosisDate: Date,
      treatment: String,
    },
  ],
  allergies: [String],
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
      medicineName: String,
      dosage: String,
      frequency: String,
      prescribedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      prescribedDate: Date,
    },
  ],

  // Fields specific to Admins
  permissions: {
    type: [String], // Example: ["manage_users", "manage_appointments"]
  },

  // Common Fields
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);

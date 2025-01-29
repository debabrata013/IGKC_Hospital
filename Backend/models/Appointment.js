const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String, // Example: "10:00 AM - 10:30 AM"
    required: true,
  },
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled"],
    default: "scheduled",
  },
  reason: {
    type: String,
    required: true, // Example: "Routine Checkup", "Fever", "Consultation"
  },
  notes: {
    type: String, // Doctor’s notes after the appointment
  },
  prescription: {
    medicines: [
      {
        name: String,
        dosage: String,
        frequency: String, // Example: "Twice a day"
      },
    ],
    tests: [String], // Example: ["Blood Test", "MRI"]
  },
  payment: {
    amount: Number,
    method: {
      type: String,
      enum: ["cash", "card", "insurance"],
    },
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);

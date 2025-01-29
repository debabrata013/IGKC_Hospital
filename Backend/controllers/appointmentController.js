const Appointment = require("../models/Appointment");
const User = require("../models/User");

// 📌 Create a new appointment (Booking)
exports.createAppointment = async (req, res) => {
  try {
    const { patient, doctor, date, timeSlot, reason, payment } = req.body;

    // Check if doctor & patient exist
    const patientExists = await User.findById(patient);
    const doctorExists = await User.findById(doctor);
    if (!patientExists || !doctorExists || doctorExists.role !== "doctor") {
      return res.status(404).json({ message: "Invalid patient or doctor ID" });
    }

    // Check if the doctor is already booked for the same time slot
    const existingAppointment = await Appointment.findOne({ doctor, date, timeSlot });
    if (existingAppointment) {
      return res.status(400).json({ message: "Doctor is already booked at this time" });
    }

    // Create new appointment
    const newAppointment = new Appointment({
      patient,
      doctor,
      date,
      timeSlot,
      reason,
      payment,
    });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 📌 Get all appointments (Admin or Doctor)
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("patient doctor", "name email");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 📌 Get a single appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate("patient doctor", "name email");
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 📌 Update appointment details (only doctor can update prescription & notes)
exports.updateAppointment = async (req, res) => {
  try {
    const { status, notes, prescription } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Update fields
    if (status) appointment.status = status;
    if (notes) appointment.notes = notes;
    if (prescription) appointment.prescription = prescription;

    await appointment.save();
    res.status(200).json({ message: "Appointment updated", appointment });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 📌 Cancel an appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "cancelled";
    await appointment.save();
    res.status(200).json({ message: "Appointment cancelled", appointment });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

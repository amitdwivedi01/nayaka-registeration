const User = require("../model/user");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const fs = require("fs");
const nodemailer = require("nodemailer");

// Configure multer to handle file uploads
const storage = multer.memoryStorage();
const uploadDoc = multer({ storage: storage });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Register API controller function
const register = async (req, res) => {
  try {
    const { Name, Gmail, Number, city } = req.body;
    console.log(req.body, "body");

    // Check if the email is already used
    const existingUser = await User.findOne({ Gmail });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already in use. Please log in with a new email.",
      });
    }

    // Create a new user
    const newUser = new User({
      Name,
      Gmail,
      Number,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Return the ID of the newly created user
    res.status(201).json({ id: savedUser._id });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Upload API controller function
const upload = async (req, res) => {
  try {
    console.log(req.body, "body");
    const { id } = req.body;
    const { personPhoto, docFront, docBack, pan, passport } = req.body;

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user with photo, docFront, and docBack URLs
    user.Photo = personPhoto;
    user.docFront = docFront;
    user.docBack = docBack;
    if (user.pan) {
      user.pan = pan;
    }
    if (user.passport) {
      user.passport = passport;
    }

    // Save the updated user
    await user.save();

    mailService(
      user.Gmail,
      "Your details have been received",
      `<p>Dear ${user.Name},</p>
      <p>Thank you for sharing your details. Stay tuned for further updates about your journey.</p>
      <p>See you soon!</p>
      <p>Team Ceat</p>`
    );
    // Return a success message
    res.status(201).json({ message: "Documents uploaded successfully" });
  } catch (err) {
    console.error("Error uploading documents:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const details = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      address,
      landmark,
      pincode,
      city,
      state,
      Gmail,
      Number,
    } = req.body;

    // Check if the email is already used
    const existingUser = await User.findOne({ Gmail });
    if (existingUser) {
      return res.status(200).json({
        message: "Email already in use. Please log in with a new email.",
      });
    }

    const newUser = new User({
      // Update the user with details
      Name: firstName,
      middleName: middleName,
      lastName: lastName,
      address: address,
      landmark: landmark,
      pincode: pincode,
      city: city,
      state: state,
      Gmail: Gmail,
      Number: Number,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    console.log(savedUser, "newuser");
    // Return the ID of the newly created user
    res.status(201).json({ id: savedUser._id });
  } catch (err) {
    console.error("Error uploading details:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const uploadDocuments = async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.body.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract base64 data from the request
    if (req.files.visa  && req.files.ticket  && req.files.visa[0] && req.files.ticket[0]) {
      const visaBase64 = req.files.visa[0].buffer.toString("base64");
      const ticketBase64 = req.files.ticket[0].buffer.toString("base64");
      const insuranceBase64 = req.files.insurance[0].buffer.toString('base64')

      // Upload files to Cloudinary
      const visaResult = await cloudinary.uploader.upload(
        `data:${req.files.visa[0].mimetype};base64,${visaBase64}`,
        { folder: "visa" }
      );
      const ticketResult = await cloudinary.uploader.upload(
        `data:${req.files.ticket[0].mimetype};base64,${ticketBase64}`,
        { folder: "ticket" }
      );
      const insuranceResult = await cloudinary.uploader.upload(
        `data:${req.files.insurance[0].mimetype};base64,${insuranceBase64}`,
        { folder: "insurance" }
      );


      // Update user with visa and ticket URLs
      user.visa = visaResult.secure_url;
      user.ticket = ticketResult.secure_url;
      user.insurance= insuranceResult.secure_url;

      // Save the updated user
      await user.save();

      await mailService(
        user.Gmail,
        "Your ticket & visa for Vietnam have arrived!",
        `<p>Dear ${user.Name},</p>
          <p>Congratulations! Your ticket & visa for Vietnam are ready. Please click on the link below to view & download.</p>
          <p>ticktet: ${user.ticket}</p>
          <p>visa: ${user.visa}</p>
          <p>visa: ${user.insurance}</p>
          <p>Please make sure you are able to display the required document at the airport.</p>
          <p>Go through the document carefully and in case you find any discrepancy, then please reply at the earliest.</p>
          <p>Get ready for an exciting journey.</p>
          <p>See you soon!</p>
          <p>Team Ceat</p>`
      );
      // Return success response
      return res
        .status(200)
        .json({ message: "Documents uploaded successfully" });
    } else if (req.files.visa && req.files.visa[0]) {
      const visaBase64 = req.files.visa[0].buffer.toString("base64");
      // Upload files to Cloudinary
      const visaResult = await cloudinary.uploader.upload(
        `data:${req.files.visa[0].mimetype};base64,${visaBase64}`,
        { folder: "visa" }
      );
      // Update user with visa and ticket URLs
      user.visa = visaResult.secure_url;
      // Save the updated user
      await user.save();
      await mailService(
        user.Gmail,
        "Your visa for Vietnam have arrived!",
        `<p>Dear ${user.Name},</p>
            <p>Congratulations! Your visa for Vietnam are ready. Please click on the link below to view & download.</p>
            <p>visa: ${user.visa}</p>
            <p>Please make sure you are able to display the required document at the airport.</p>
            <p>Go through the document carefully and in case you find any discrepancy, then please reply at the earliest.</p>
            <p>Get ready for an exciting journey.</p>
            <p>See you soon!</p>
            <p>Team Ceat</p>`
      );
      // Return success response
      return res
        .status(200)
        .json({ message: "Documents uploaded successfully" });
    } else if (req.files.ticket && req.files.ticket[0]) {
      const ticketBase64 = req.files.ticket[0].buffer.toString("base64");
      const insuranceBase64 = req.files.ticket[0].buffer.toString("base64");


      const ticketResult = await cloudinary.uploader.upload(
        `data:${req.files.ticket[0].mimetype};base64,${ticketBase64}`,
        { folder: "ticket" }
      );
      const insuranceResult = await cloudinary.uploader.upload(
        `data:${req.files.ticket[0].mimetype};base64,${insuranceBase64}`,
        { folder: "insurance" }
      );
      user.ticket = ticketResult.secure_url;
      user.insurance = insuranceResult.secure_url;
      // Save the updated user
      await user.save();
      await mailService(
        user.Gmail,
        "Your ticket for Vietnam have arrived!",
        `<p>Dear ${user.Name},</p>
            <p>Congratulations! Your ticket for Vietnam are ready. Please click on the link below to view & download.</p>
            <p>ticktet: ${user.ticket}</p>
            <p>visa: ${user.insurance}</p>
            <p>Please make sure you are able to display the required document at the airport.</p>
            <p>Go through the document carefully and in case you find any discrepancy, then please reply at the earliest.</p>
            <p>Get ready for an exciting journey.</p>
            <p>See you soon!</p>
            <p>Team Ceat</p>`
      );
      // Return success response
      return res
        .status(200)
        .json({ message: "Documents uploaded successfully" });
    }
  } catch (error) {
    console.error("Error uploading documents:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    console.log(req.body, "body");
    const { email } = req.body;
    // Check if the user exists in the database
    // This is just a placeholder, you need to replace it with actual logic to check user existence
    const userExists = await User.findOne({ Gmail: email });

    if (userExists) {
      // User exists, send success response with status code 201
      return res.status(201).json({ message: "User exists" });
    } else {
      // User does not exist, send error response with status code 404
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error uploading documents:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const mailService = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: to,
    subject: subject,
    html: text,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("error in sending email");
  }
};

module.exports = {
  register,
  upload,
  details,
  getAllUsers,
  uploadDocuments,
  login,
};

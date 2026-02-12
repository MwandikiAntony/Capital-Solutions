const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Save to database
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        // Send email
        const transporter = nodemailer.createTransport({
            service: "gmail", // use your provider
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"Capital Solutions Website" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: `New Inquiry from ${name}`,
            text: `You received a new message from your website:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: "Message saved and email sent successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;

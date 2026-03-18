import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Leyvolve Backend is running!');
});

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.error('SMTP CONNECTION ERROR:', error);
    } else {
        console.log('STMP Connection ready');
    }
});

app.post('/api/send-message', async (req, res) => {
    const { name, email, phone, service, message } = req.body;

    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_RECEIVER,
        replyTo: email,
        subject: `New Message from ${name} - Leyvolve`,
        text: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Service: ${service}
            Message: ${message}
        `,
        html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
                <h2>New Project Inquiry</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Service:</strong> ${service}</p>
                <hr />
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send message' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

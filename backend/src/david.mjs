import nodemailer from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';

// Create a transporter using Gmail SMTP details
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dedamraz26122024@gmail.com',
        pass: 'yatm dvvg khug rhng'
    }
});

// Load and compile the HTML template
const source = fs.readFileSync('secret_santa.html', 'utf-8');
const template = handlebars.compile(source);
const replacements = {
    name: 'Pando',
    interests: 'Miroriro, cokolada, spavanac'
};

const htmlToSend = template(replacements);

// Email message details
let message = {
    from: 'dedamraz26122024@gmail.com', // Sender address
    to: 'david.mikulic44@gmail.com',           // Recipient address
    subject: 'Secret-Santa 2025',       
    text: 'Tvoj Secret-Santa zadatak', 
    html: htmlToSend,                   
};

// Send the email
transporter.sendMail(message, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent successfully!');
        console.log('Message ID:', info.messageId);
    }
});

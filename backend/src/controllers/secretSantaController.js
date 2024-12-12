// secretSantaController.js
import knex from '../../db/knex.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


// Helper function to shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to assign Secret Santa pairs
async function assignSecretSanta() {
  const participants = await knex('people').select('*');

  const recipients = participants.map((p) => p.id);
  const assignments = new Map();

  for (const giver of participants) {
    let availableRecipients = recipients.filter(
      (id) =>
        id !== giver.id &&
        participants.find((p) => p.id === id).family !== giver.family &&
        id !== giver.previous_recipient_id
    );

    if (availableRecipients.length === 0) {
      throw new Error('No valid assignments available for all participants.');
    }

    availableRecipients = shuffle(availableRecipients);
    const recipientId = availableRecipients.pop();
    assignments.set(giver.id, recipientId);

    const index = recipients.indexOf(recipientId);
    if (index > -1) {
      recipients.splice(index, 1);
    }

    // Log dodeljeni par
    const recipient = participants.find((p) => p.id === recipientId);
    console.log(`🎅 ${giver.name} -> ${recipient.name}`);
  }

  return assignments;
}


// Function to send emails
async function sendEmails(assignments) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  for (const [giverId, recipientId] of assignments) {
    const giver = await knex('people').where('id', giverId).first();
    const recipient = await knex('people').where('id', recipientId).first();

    const mailOptions = {
      from: 'dedamraz26122024@gmail.com',
      to: giver.email,
      subject: 'Secret Santa 2025.',
      html: `
    <div>
      <h1 style="font-family: Arial, sans-serif; color: #333;">Your Secret Santa Reveal</h1>
      <p style="font-family: Arial, sans-serif; color: #333;">Click the link below to reveal your Secret Santa name:</p>

      <!-- Hidden radio button -->
      <input type="radio" id="reveal" name="reveal" style="display:none;">
      
      <!-- Label that acts as a clickable link -->
      <label for="reveal" style="cursor: pointer; color: blue; text-decoration: underline; font-family: Arial, sans-serif;">Click to reveal</label>

      <!-- Hidden content that is revealed when the radio button is checked -->
      <div style="margin-top: 10px;">
        <p style="font-family: Arial, sans-serif; color: transparent; display: none;" id="name">Ferimir</p>
      </div>

      <!-- Inline CSS to reveal the name when the radio button is checked -->
      <style>
        input[type="radio"]:checked + label + div #name {
          color: black; /* Reveals the name in black when checked */
          display: block; /* Make it visible */
        }
      </style>
    </div>
  `
    };

    await transporter.sendMail(mailOptions);
  }
}

// Main controller function
async function handleSecretSanta(req, res) {
  try {
    const assignments = await assignSecretSanta();


    // Send emails
    await sendEmails(assignments);

    

    res.status(200).send('Secret Santa assignments completed and emails sent!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error during Secret Santa assignment.');
  }

  
}

export default handleSecretSanta;


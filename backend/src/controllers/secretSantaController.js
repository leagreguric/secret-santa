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
      subject: 'Your Secret Santa Assignment',
      text: `Bok ${giver.name},

Tvoj trošitelj novaca je ${recipient.name}! 

Happy Holidays!`,
    };

    await transporter.sendMail(mailOptions);
  }
}

// Main controller function
async function handleSecretSanta(req, res) {
  try {
    const assignments = await assignSecretSanta();

    // Save assignments in the database
    for (const [giverId, recipientId] of assignments) {
      await knex('people').where('id', giverId).update({
        previous_recipient_id: recipientId,
      });
    }

    

    // Send emails
    await sendEmails(assignments);

    

    res.status(200).send('Secret Santa assignments completed and emails sent!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error during Secret Santa assignment.');
  }

  
}

export default handleSecretSanta;


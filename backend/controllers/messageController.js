const Message = require('../models/Message');
const nodemailer = require('nodemailer');

exports.sendMessage = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    // Mesajı veritabanına kaydet
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // E-posta gönder
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Site Mesajı" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Yeni İletişim Mesajı",
      text: `Ad: ${name}\nE-posta: ${email}\nMesaj: ${message}`
    });

    res.status(200).json({ success: true, message: "Mesaj gönderildi!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Bir hata oluştu." });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Mesajlar alınamadı." });
  }
}; 
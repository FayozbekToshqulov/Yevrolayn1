import React, { useState } from 'react';
import axios from 'axios';

const TelegramForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const sendtelegram = async () => {
    const { name, email, message } = formData;
    const telegram_bot_id = '7374100149:AAH29VkatfBmyTWUONd1WDz3vWbZWp9mNd4'; // Replace with your bot token
    const chat_id = "telegram Id"; // Replace with the chat ID

    const data = {
      chat_id: chat_id,
      text: `Ismi: ${name}\nEmail: ${email}\nIzoh: ${message}`
    };

    try {
      const response = await axios.post(
        `https://api.telegram.org/bot${telegram_bot_id}/sendMessage`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error sending message to Telegram', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendtelegram();
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-r from-blue-300 via-blue-500 to-blue-900 shadow-lg rounded-lg p-6 mt-10 sm:p-8 sm:mt-16">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label htmlFor="name" className="block text-white font-bold mb-2">Ismingiz</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Ismingiz"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-transparent rounded-md focus:outline-none focus:border-white bg-gray-200 text-gray-700"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-white font-bold mb-2">Email manzilingiz</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email manzilingiz"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-transparent rounded-md focus:outline-none focus:border-white bg-gray-200 text-gray-700"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-white font-bold mb-2">Izoh qoldiring</label>
          <textarea
            name="message"
            id="message"
            placeholder="Izoh qoldiring"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-transparent rounded-md focus:outline-none focus:border-white bg-gray-200 text-gray-700"
          />
        </div>
        <div className="text-center">
          <input
            type="submit"
            value="Yuborish"
            id="btn"
            className="bg-white text-blue-700 font-bold px-6 py-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
      </form>
    </div>
  );
};

export default TelegramForm;

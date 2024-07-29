import { Fragment, useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa";
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { notification } from "antd";

function AddToCard() {
  const [web, setWeb] = useState([]);
  const [cost, setCost] = useState(0);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    message: '',
    username: '',
  });

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem("cards"));
    if (storedCards) {
      setWeb(storedCards);
      calculateTotalCost(storedCards);
    }
  }, []);

  const calculateTotalCost = (cards) => {
    const totalCost = cards.reduce((acc, item) => acc + item.price * item.piece, 0);
    setCost(totalCost);
  };

  const handleDelete = (index) => {
    const updatedCards = web.filter((_, i) => i !== index);
    setWeb(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
    calculateTotalCost(updatedCards);
    window.location.reload();
  };

  const handleIncrement = (index) => {
    const updatedCards = web.map((item, i) => {
      if (i === index) {
        return { ...item, piece: item.piece + 1 };
      }
      return item;
    });
    setWeb(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
    calculateTotalCost(updatedCards);
  };

  const handleDecrement = (index) => {
    const updatedCards = web.map((item, i) => {
      if (i === index && item.piece > 1) {
        return { ...item, piece: item.piece - 1 };
      }
      return item;
    });
    setWeb(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
    calculateTotalCost(updatedCards);
  };

  const showModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      number: value
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const sendTelegram = async () => {
    const { name, username, number, message } = formData;
    const localStoragedata = JSON.parse(localStorage.getItem('cards'));

    // Formatting the cart data into a readable string
    let orderDetails = localStoragedata.map(item => {
      return `Mahsulot nomi: ${item.name}\nNarxi: ${item.price}$ \nSoni: ${item.piece} dona`;
    }).join('\n\n');

    const telegram_bot_id = '7230178618:AAFzczp-dWV-pRawh0Jc_Ywhufoo5YIXQCY'; // Replace with your bot token
    const chat_id = 1452204552; // Replace with the chat ID

    const data = {
      chat_id: chat_id,
      text: `Buyurtma bergan odamning: \n\nIsmi: ${name} \nTelegram username: @${username} \nNomeri: +${number}\nDastavka manzili: ${message}\n\nBuyurtmalar:\n\n${orderDetails}\n\nJami narxi: ${cost} $`
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
      localStorage.removeItem('cards');
      window.location.reload();
    } catch (error) {
      console.error('Error sending message to Telegram', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.number && formData.message) {
      sendTelegram();
      setFormData({
        name: '',
        number: '',
        message: '',
        username: '',
      });
      closeModal();
    } else {
      notification.error({
        message: "Ma'lumotlar yetarli emas!",
        description: "Buyurtma berish uchun barcha maydonlarni to'ldiring!"
      });
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <div className="flex m-auto items-center">
              <Link to={"/"}><span className="text-[30px] ease-in duration-300 hover:text-orange-600">Bosh sahifa</span></Link> <IoIosArrowForward className="text-[30px] text-gray-800" /> <span className="text-[30px] text-orange-600">Savatcha</span>
            </div>
          </div>
          <div className="lg:w-2/3 w-full mx-auto overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Img</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Piece</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {web.length > 0 ? web.map((item, index) => (
                  <Fragment key={index}>
                    <tr className="hover:bg-gray-100">
                      <td className=""><img className="w-20 h-20" src={item.img} alt="" /></td>
                      <td className="px-6 py-4 text-sm text-gray-500">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.price} $</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <FaMinus className="cursor-pointer" onClick={() => handleDecrement(index)} />
                          <p className="mx-2 text-base">{item.piece}</p>
                          <FaPlus className="cursor-pointer" onClick={() => handleIncrement(index)} />
                        </div>
                      </td>
                      <td className="px-6  py-4 whitespace-nowrap text-[30px] font-medium text-blue-600 cursor-pointer">
                        <MdDelete onClick={() => handleDelete(index)} />
                      </td>
                    </tr>
                  </Fragment>
                )) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-lg text-gray-500">
                      <div className="p-30">
                        <h1 className="text-4xl mb-2">🛒</h1>
                        <p className="text-2xl mb-2">Sizning savatingiz bo'sh</p>
                        <p>O'zingizga yoqqan mahsulotlarni veb-sayt savatga qo'shishingiz mumkin.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
            <div>
              <h1 className="text-blue-500 text-2xl">Jami narxi: <span className="text-black">{cost} $</span></h1>
            </div>
            {show ? (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-8 rounded-lg flex flex-col max-w-md w-full">
                  <h2 className="text-2xl font-bold mb-4">
                    <p className="text-blue-500">Ma'lumotlarni to'liq va aniq kiriting</p>
                  </h2>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Ismingiz"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-4"
                  />
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Tg username kiriting: @yevrolaynshop"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-4"
                  />

                  <PhoneInput
                    inputProps={{
                      name: 'number',
                      id: 'number'
                    }}
                    country={'uz'}
                    value={formData.number}
                    onChange={handlePhoneChange}
                    className="w-full bg-white rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out mb-4"
                  />
                  <input
                    name="message"
                    id="message"
                    placeholder="Buyurtma manzili:"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-4"
                  />
                  <div className="flex justify-end">
                    <button
                      className="text-gray-600 bg-white border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded mr-2"
                      onClick={closeModal}
                    >
                      Yopish
                    </button>
                    <button
                      className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Jo'natish
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                onClick={showModal}
              >
                Tasdiqlash
              </button>
            )}

          </div>
        </div>
      </section>
    </>
  );
}

export default AddToCard;

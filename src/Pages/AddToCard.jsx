import { Fragment, useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa";
import axios from 'axios';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
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

      // Clear localStorage after successful submission
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
          <div className="flex  flex-col text-center w-full mb-20">
            <div className="flex m-auto items-center">
              <Link to={"/"}><span className="text-[30px] ease-in duration-300 hover:text-orange-600">Bosh sahifa</span></Link> <IoIosArrowForward className="text-[30px] text-gray-800" /> <span className="text-[30px] text-orange-600">Savatcha</span>
            </div>
          </div>
          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            <div>
              <hr className="border-black mb-3" />
              <div className="flex justify-between mx-3">
                <h1>Img</h1>
                <h1>Name</h1>
                <h1>Price</h1>
                <h1>Piece</h1>
                <h1>Delete</h1>
              </div>
              <hr className="border-black mt-3" />
            </div>
            <div className=" flex flex-col">
              {web.length > 0 ? web.map((item, index) => (
                <Fragment key={index}>
                  <div className="mt-3 w-[100%] flex justify-between items-center mb-3">
                    <img className="w-[10%] h-[10%]" src={item.img} alt="" />
                    <b className="w-[10%] text-[12px] ml-[-5%] text-center">{item.name}</b>
                    <p className="">{item.price} $</p>

                    <div className="w-16 text-[22px] text-center flex items-center justify-center">
                      <FaMinus className="cursor-pointer" onClick={() => handleDecrement(index)} />
                      <p className="w-16 text-center">{item.piece}</p>
                      <FaPlus className="cursor-pointer" onClick={() => handleIncrement(index)} />
                    </div>
                    <MdDelete className="text-[25px] text-blue-500 w-16 text-center cursor-pointer" onClick={() => handleDelete(index)} />
                  </div>
                </Fragment>
              )) : (

                <div className="p-[40px] text-center">
                  <h1 className="text-[30px] mb-2">🛒</h1>
                  <p className="text-[20px] mb-2">Sizning savatingiz bo'sh</p>
                  <p>O'zingizga yoqqan mahsulotlarni veb-sayt savatga qo'shishingiz mumkin.</p>
                </div>
              )

              }
            </div>
          </div>
          <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
            <div>
              <h1 className="text-blue-500 text-[20px]">Jami narxi: <span className=" text-black">{cost} $</span></h1>
            </div>
            {show ? (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-8 rounded-lg flex flex-col max-w-md w-full">
                  <h2 className="text-2xl font-bold mb-4">
                    <span className="text-red-500 text-[18px]">Iltimos!</span>
                    <p className="text-blue-500">Ma'lumotlarni to'liq va tushunarli kiriting...</p>
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
                      className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded mr-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    <button
                      className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Submit
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
  )
}

export default AddToCard

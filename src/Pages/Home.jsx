import { db } from "../firebase";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { FaRegHeart } from "react-icons/fa";
import TelegramForm from "./Telegram";
import { notification } from 'antd';
import { TbShoppingBagPlus } from "react-icons/tb";

const Home = () => {
  const [blog, setBlog] = useState([]);
  const [retryCount, setRetryCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    const fetchData = () => {
      const dataBase = collection(db, 'blogs');
      const unsubscribe = onSnapshot(dataBase, (snapshot) => {
        const malumot = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setBlog(malumot);
        setRetryCount(0);
      }, (error) => {
        console.error("Ma'lumot olishda xato: ", error);
        setRetryCount(prevRetryCount => prevRetryCount + 1);
      });
      return () => unsubscribe();
    };

    fetchData();

    if (retryCount > 0 && retryCount <= 3) {
      const retryTimeout = setTimeout(() => {
        fetchData();
      }, 2000 * retryCount);

      return () => clearTimeout(retryTimeout);
    }
  }, [retryCount]);

  const handleAddToCard = (dataCard) => {
    let data = localStorage.getItem("cards");
    if (data) {
      data = JSON.parse(data);
    } else {
      data = [];
    }
    const existingItem = data.find(item => item.id === dataCard.id);
    if (existingItem) {
      existingItem.piece += 1;
      existingItem.price += Number(dataCard.price)
    } else {
      data.push({
        name: dataCard.title,
        img: dataCard.img,
        price: Number(dataCard.price),
        piece: 1,
        id: dataCard.id,
      });
    }
    localStorage.setItem("cards", JSON.stringify(data));
    notification.success({
      message: "Savatga qo'shildi !",
      description: "Tanlagan mahsulotingiz savatga qo'shildi. Savatga o'tib buyurtma berishingiz mumkin !"
  });

  setCount(prevCount => prevCount + 1);
  
  };

  const filteredBlogs = blog.filter((data) =>
    data.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="">
      <div className="home_bg h-[100vh]">
        <div className="pl-[85px] pt-[220px]">
          <h1 className="text-white text-[50px]">Smartfonlar uchun <br /> aksessuarlar</h1>
          <p className="text-white text-[18px]">Eng sifatli va hamyonbob tovarlar!</p>
        </div>
      </div>

      <div className="container px-5 py-10 mx-auto">
        <input
          type="text"
          placeholder="Qidirish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border w-full border-blue-500 rounded text-blue-500"
        />
      </div>

      <section className="text-gray-400 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {filteredBlogs.map(data => (
              <div key={data.id} className="p-4 lg:w-1/4 md:w-1/2">
                <div className="h-full flex flex-col items-center text-center border-[2px] p-3 rounded-lg">
                  <img alt="rasm bor" className="p-0 w-full h-full object-cover object-center mb-4" src={data.img} />
                  <div className="w-full">
                    <h2 className="title-font font-mono text-lg text-gray-500">{data.title}</h2>
                    <p className="mb-4 text-black hover:text-yellow-600">{data.descript}</p>
                    <div className="flex items-center justify-around">
                      <p className="text-black">{data.price} $</p>
                      <span className="inline-flex">
                        <a className="text-gray-700 text-[20px] hover:text-red-600 transition duration-300 cursor-pointer">
                          <FaRegHeart className="text-blue-800 text-[23px]" />
                        </a>
                        <a className="ml-2 text-gray-700 text-[20px] hover:text-green-600 transition duration-300 cursor-pointer" onClick={() => handleAddToCard(data)}>
                          <TbShoppingBagPlus className="text-blue-800 text-[23px]" />
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TelegramForm />
    </div>
  );
};

export default Home;

import { db } from "../firebase";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { FaRegHeart } from "react-icons/fa";
import TelegramForm from "./Telegram";
import { notification } from 'antd';
import { TbShoppingBagPlus } from "react-icons/tb";
import Footer from "./Footer";
import { IoRemoveOutline } from "react-icons/io5";
import { FaWrench } from "react-icons/fa";

const Home = ({ count, setCount }) => {
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
        <div className="pl-[45px] sm:pl-[85px] pt-[220px] ">
          <h1 className="text-white text-[30px] md:text-[45px] sm:text-[40px] ">Smartfonlar uchun <br /> aksessuarlar</h1>
          <p className="text-white text-[18px]">Eng sifatli va hamyonbob tovarlar!</p>
        </div>
      </div>

      <section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-20">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Master Cleanse Reliac Heirloom</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them man bun deep jianbing selfies heirloom prism food truck ugh squid celiac humblebrag.</p>
    </div>
    <div class="flex flex-wrap -m-4 text-center justify-center">
      <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
        <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"class="text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
            <path d="M8 17l4 4 4-4m-4-5v9"></path>
            <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
          </svg>
          <h2 class="title-font font-medium text-3xl text-gray-900">2.7K</h2>
          <p class="leading-relaxed">Downloads</p>
        </div>
      </div>
      <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
        <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"class="text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
          </svg>
          <h2 class="title-font font-medium text-3xl text-gray-900">1.3K</h2>
          <p class="leading-relaxed">Users</p>
        </div>
      </div>
      <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
        <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"class="text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
            <path d="M3 18v-6a9 9 0 0118 0v6"></path>
            <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"></path>
          </svg>
          <h2 class="title-font font-medium text-3xl text-gray-900">74</h2>
          <p class="leading-relaxed">Files</p>
        </div>
      </div>
    </div>
  </div>
</section>

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
      <Footer />
    </div>
  );
};

export default Home;

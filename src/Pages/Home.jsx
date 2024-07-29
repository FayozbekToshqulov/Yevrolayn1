import { db } from "../firebase";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { FaRegHeart } from "react-icons/fa";
import { TbShoppingBagPlus } from "react-icons/tb";
import Footer from "./Footer";
import { notification } from "antd";
import bir from "../Images/1.png"
import ImageSlider from './ImageSlider';

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
      <div className="bg-blue-600 h-[100vh] bg-no-repeat bg-hero bg-cover bg-center py-24">
        <ImageSlider />
      </div><br /><br />

      <section className="text-gray-800 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-10">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-10 text-gray-900">Biz haqimizda</h1>
          </div>

          <div className="flex flex-wrap -m-4 text-center justify-center">
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="px-4 py-6">
                <h2 className="title-font font-medium text-[20px] text-gray-900 mb-3">Har xil turdagi aksessuarlar</h2>
                <p className="leading-relaxed text-sm">Bizning do'konimizda turli xil aksessuarlar mavjud.</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="px-4 py-6">
                <h2 className="title-font font-medium text-[20px]  text-gray-900 mb-3">Tajribali ishchilar</h2>
                <p className="leading-relaxed text-sm">Bizning ishchilarimiz o'z sohasida katta tajribaga ega.</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className=" px-4 py-6">
                <h2 className="title-font font-medium text-[20px] text-gray-900 mb-3">Qulay joylashuv</h2>
                <p className="leading-relaxed text-sm">Mahsulotlarimiz yuqori sifatli va mijozlarning talablariga javob beradi.</p>
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
          className="p-4 border w-full border-blue-500 rounded-lg text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>


      <section className="text-gray-400 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {filteredBlogs.map(data => (
              <div key={data.id} className="p-4 lg:w-1/4 md:w-1/2">
                <div className="h-full flex flex-col items-center text-center border-[2px] p-3 rounded-lg">
                  <img alt="rasm bor" className="p-0 w-full h-full object-cover object-center mb-4" src={data.img} />
                  <div className="w-full border-2 border-[black] mb"></div>
                  <div className="w-full">
                    <h2 className="title-font font-mono text-lg text-gray-500">{data.title}</h2>
                    <p className="mb-4 text-black hover:text-yellow-600">{data.descript}</p>
                    <div className="flex items-center justify-around">
                      <p className="text-black">{data.price} so'm</p>
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

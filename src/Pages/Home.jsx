import { db } from "../firebase";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";



const Home = () => {

  const [blog, setBlog] = useState([]);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      const dataBase = collection(db, 'blogs');
      const unsubscribe = onSnapshot(dataBase, (snapshot) => {
        const malumot = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setBlog(malumot);
        setRetryCount(0); // Muvaffaqiyatli o‘qishdan keyin qayta urinish sonini nolga tushiring
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
      }, 2000 * retryCount); // Ekstremal orqaga chekinish

      return () => clearTimeout(retryTimeout);
    }
  }, [retryCount]);



  return (
    <div className="">
      <div className="home_bg h-[500px]">
        <div className="pl-[85px] pt-[150px]">
          <h1 className="text-white text-[50px]">Smartfonlar uchun <br /> aksessuarlar</h1>
          <p className="text-white text-[18px]">Eng sifatli va hamyonbob tovarlar!</p>
        </div>
      </div>

      <section className="text-gray-400 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {blog.map(data => (
              <div key={data.id} className="p-4 lg:w-1/4 md:w-1/2">
                <div className="h-full flex flex-col items-center text-center">
                  <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src={data.img} />
                  <div className="w-full">
                    <h2 className="title-font font-mono text-lg text-gray-500">{data.title}</h2>
                    <p className="mb-4 text-black hover:text-yellow-600 ">{data.descript}</p>

                    <div className="flex items-center justify-around" >
                      <p className="text-black">{data.price} so'm</p>
                      <span className="inline-flex">
                        <a className="text-gray-700 text-[20px]">
                          <FaRegHeart />
                        </a>
                        <a className="ml-2 text-gray-700 text-[20px]">
                          <MdOutlineShoppingCart />
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
    </div>
  );
};

export default Home;

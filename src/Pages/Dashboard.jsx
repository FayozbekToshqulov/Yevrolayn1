import { db } from "../firebase";
import { useState, useEffect, useContext } from "react";
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { notification } from 'antd';
import { AuthContext } from "../context/AuthContext";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [blog, setBlog] = useState([]);
  const [title, setTitle] = useState('');
  const [descript, setDescript] = useState('');
  const [img, setImg] = useState('');
  const [price, setPrice] = useState('');
  const [show, setShow] = useState(true);
  const [id, setId] = useState('');
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const dataBase = collection(db, 'blogs');

    const unsubscribe = onSnapshot(dataBase, (snapshot) => {
      const malumot = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBlog(malumot);
    });

    return () => unsubscribe();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (title === "" || descript === "" || img === "" || price === "") {
      return notification.error({
        message: "Input bo'sh",
        description: "Iltimos ma'lumotlarni to'liq kiriting.",
      });
    } else {
      await addDoc(collection(db, 'blogs'), {
        title,
        descript,
        img,
        price,
        id: uuidv4(),
      });

      notification.success({
        message: "Ma'lumotlar yuborildi",
        description: "Bir doim xizmatingizdamiz taxsir",
      });

      setTitle("");
      setDescript("");
      setImg("");
      setPrice("");
    }
  };

  const handleDelete = async (id) => {
    const deletePost = doc(db, 'blogs', id);
    await deleteDoc(deletePost);
  };

  const handleEdit = (id, title, descript, price, img) => {
    setId(id);
    setTitle(title);
    setDescript(descript);
    setPrice(price);
    setImg(img);
    setShow(false);
  };

  const handleUpdate = async () => {
    const updateData = doc(db, 'blogs', id);
    await updateDoc(updateData, { title, descript, img, price });
    setShow(true);
    setId("");
    setTitle("");
    setDescript("");
    setImg("");
    setPrice("");
  };

  const logOut = () => {
    dispatch({ type: "LOGOUT", payload: null });
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-4 dashboard-bg">
      <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col m-auto w-full mt-10 md:mt-0">
        <div className="relative mb-4">
          <label htmlFor="title" className="leading-7 text-sm text-gray-600">Nomi</label>
          <input
            value={title} onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="descript" className="leading-7 text-sm text-gray-600">Ma'lumot</label>
          <textarea value={descript} onChange={(e) => setDescript(e.target.value)} type="text" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
        </div>
        <div className="relative mb-4">
          <label htmlFor="price" className="leading-7 text-sm text-gray-600">Narxi</label>
          <input
            value={price} onChange={(e) => setPrice(e.target.value)}
            type="text"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="img" className="leading-7 text-sm text-gray-600">Img</label>
          <input
            value={img} onChange={(e) => setImg(e.target.value)}
            type="text"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="flex justify-center">
          {show ? (
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={handleCreate}>Create</button>
          ) : (
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={handleUpdate}>Update</button>
          )}
        </div>
        <button onClick={logOut} className="mt-4 text-blue-700 text-[30px] border-0 py-2 px-8 m-auto focus:outline-none"><IoIosLogOut /></button>
      </div>

      <section className="text-gray-400 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {blog.map(data => (
              <div key={data.id} className="p-4 lg:w-1/4 md:w-1/2">
                <div className="h-full flex flex-col items-center text-center">
                  <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src={data.img} />
                  <div className="w-full">
                    <h2 className="title-font font-medium text-lg text-white">{data.title}</h2>
                    <p className="mb-4">{data.descript}</p>
                    <div className="flex justify-between">
                      <p className="mb-4">{data.price} so'm</p>
                    </div>
                    <div className="items-center flex-wrap m-auto">
                      <button className="border px-4 py-2 mr-2 bg-blue-600 text-center text-white rounded-md hover:bg-blue-700" onClick={() => handleEdit(data.id, data.title, data.descript, data.price, data.img)}>Update</button>
                      <button className="border px-4 py-2 bg-red-600 text-center text-white rounded-md hover:bg-red-700" onClick={() => handleDelete(data.id)}>Delete</button>
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

export default Dashboard;

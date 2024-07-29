import { db } from "../firebase";
import { useState, useEffect } from "react";
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { notification } from 'antd';
import { IoBagAddSharp, IoCloseSharp } from "react-icons/io5";

const Dashboard = () => {
  const [blog, setBlog] = useState([]);
  const [title, setTitle] = useState('');
  const [descript, setDescript] = useState('');
  const [img, setImg] = useState('');
  const [price, setPrice] = useState('');
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');

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
        description: "",
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

  const showModal = () => {
    setShow(true);
  };

  const closeModal = () => {
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



  return (
    <div className="container mx-auto p-4 dashboard-bg">
      <h1 className="mt-32"></h1>
      {show ? (
        <div className=" top-[70px] left-[400px] lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col m-auto w-full md:mt-0">
          <div className='flex justify-end p-4'>
              <IoCloseSharp className='text-[28px]' onClick={closeModal} />
            </div>
          <div className="relative mb-4">
            <label htmlFor="title" className="leading-7 text-sm text-gray-600">Nomi</label>
            <input
              value={title} onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="descript" className="leading-7 text-sm text-gray-600">Ma'lumot</label>
            <input
              value={descript} onChange={(e) => setDescript(e.target.value)}
              type="text"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

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
          </div>
        </div>) : (<button
          onClick={showModal}
          className="flex items-center justify-around w-[110px] text-white bg-green-700 border-0 py-2 px-6 focus:outline-none  rounded"
          type="submit"
        >
          <IoBagAddSharp />
          New
        </button>)}


      <section className="text-gray-400 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Image</th>
                  <th className="py-2">Title</th>
                  <th className="py-2">Description</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blog.map(data => (
                  <tr key={data.id} className="bg-gray-100 border-b text-black">
                    <td className="py-2">
                      <img alt="team" className="flex-shrink-0 rounded-lg w-20 h-20 object-cover object-center mb-4" src={data.img} />
                    </td>
                    <td className="py-2">{data.title}</td>
                    <td className="py-2">{data.descript}</td>
                    <td className="py-2">{data.price} $</td>
                    <td className="py-2">
                      <button className="border px-4 py-2 mr-2 bg-blue-600 text-center text-white rounded-md hover:bg-blue-700" onClick={() => handleEdit(data.id, data.title, data.descript, data.price, data.img)}><TiEdit /></button>
                      <button className="border px-4 py-2 bg-red-600 text-center text-white rounded-md hover:bg-red-700" onClick={() => handleDelete(data.id)}><MdDelete /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard
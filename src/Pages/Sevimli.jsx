import React, { Fragment } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'

export const Sevimli = () => {
  const web = JSON.parse(localStorage.getItem("cards"))
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex  flex-col text-center w-full mb-20">
            <div className="flex m-auto items-center">
              <Link to={"/"}><span className="text-[30px] ease-in duration-300 hover:text-orange-600">Bosh sahifa</span></Link> <IoIosArrowForward className="text-[30px] text-gray-800" /> <span className="text-[30px] text-orange-600">Sevimli</span>
            </div>
          </div>
          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            <div>
              <hr className="border-black mb-3" />
              <h1 className='block text-center text-[20px] text-black'>Sizning sevimli xaridlaringiz</h1>
              <hr className="border-black mt-3" />
            </div>
            <div className=" flex flex-col">
              {web ? web.map((item, index) => (
                <Fragment key={index}>
                  <div className="mt-3 w-[100%] flex justify-around items-center mb-3">
                    <img className="w-[10%] h-[10%]" src={item.img} alt="" />
                    <b className="w-[10%] ml-[-5%] text-center">{item.name}</b>
                    
                  </div>
                </Fragment>
              )) : (

                <div className="p-[40px] text-center">
                  <h1 className="text-[30px] mb-2">🛒</h1>
                  <p className="text-[20px] mb-2">Sizning sevimli xaridlaringiz bo'sh</p>
                  <p>O'zingizga yoqqan mahsulotlarni veb-sayt sevimliga qo'shishingiz mumkin.</p>
                </div>
              )

              }
            </div>
          </div>
          
        </div>
      </section>
    </div>
  )
}

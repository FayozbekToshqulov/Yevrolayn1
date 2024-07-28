import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import bir from '../Images/1.png';
import ikki from './../Images/ikki.png';
import uch from '../Images/uch.png';

const images = [bir, ikki, uch];

const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-blue-600 h-[100vh] bg-no-repeat bg-cover bg-center py-24">
      <div className="container mx-auto flex justify-around h-full">
        <div className="mt-20 p-10">
          <h1 className="text-white text-[30px] md:text-[45px] sm:text-[40px]">
            Smartfonlar uchun <br /> aksessuarlar
          </h1>
          <p className="text-white text-[18px]">Eng sifatli va hamyonbob tovarlar!</p>
        </div>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            className={classNames('w-30 hidden md:block', {
              'block md:block': index === currentImageIndex,
              'hidden md:hidden': index !== currentImageIndex,
            })}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;

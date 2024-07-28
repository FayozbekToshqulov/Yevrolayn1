import logo from './../Images/yevrolayn.png';
import { IoLogoInstagram } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";

export default function Footer() {
    return (
        <div>
            <footer className="text-gray-600 body-font">
                <div className="bg-gray-800">
                    <div className="container px-5 py-6 mx-auto flex justify-around items-center sm:flex-row ">

                        <img src={logo} alt="logo" className='max-w-40 mr-7' />
                        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                            <a href="https://www.instagram.com/yevrolayn/#"><IoLogoInstagram className='text-white  hover:text-yellow-400 ease-in duration-300 text-[30px]' /></a>
                            <a href="https://t.me/yevrolayn"><FaTelegramPlane className='text-white  hover:text-yellow-400 ease-in duration-300 text-[30px] ml-2' /></a>
                            <a href="https://www.google.com/maps/place/YEVROLAYN/@40.028092,67.588659,16z/data=!4m14!1m7!3m6!1s0x38b2b9d3b8d3b09d:0x19bbc5e48ff24647!2sYEVROLAYN!8m2!3d40.0278294!4d67.5921067!16s%2Fg%2F11l5dtq4sk!3m5!1s0x38b2b9d3b8d3b09d:0x19bbc5e48ff24647!8m2!3d40.0278294!4d67.5921067!16s%2Fg%2F11l5dtq4sk?hl=ru&entry=ttu"> <SiGooglemaps className='text-white  hover:text-yellow-400 ease-in duration-300 text-[30px] ml-2' /></a>
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

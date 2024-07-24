import logo from './../Images/yevrolayn.png';
import { IoLogoInstagram } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
    return (
        <div>
            <footer class="text-gray-600 body-font">
                <div class="bg-gray-800">
                    <div class="container px-5 py-6 mx-auto flex justify-around items-center sm:flex-row ">

                        <img src={logo} alt="logo" className='max-w-40 mr-7' />
                        <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                            <a href="https://www.instagram.com/yevrolayn/#"><IoLogoInstagram className='text-white  hover:text-yellow-400 ease-in duration-300 text-[30px]' /></a>
                            <a href="https://t.me/yevrolayn"><FaTelegramPlane className='text-white  hover:text-yellow-400 ease-in duration-300 text-[30px] ml-2' /></a>
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

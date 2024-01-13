import Logo from "../../asset/image/LogoBgWhite.png";
import facebookLogo from "../../asset/svg/facebook.svg";
import instagram from "../../asset/svg/instagram.svg";
import telegram from "../../asset/svg/telegram.svg";
import xtwitter from "../../asset/svg/x-twitter.svg";

export default function Footer() {
  return (
    <footer className="bg-[#283d50] py-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 text-sm md:text-l px-5 space-y-5 gap-5">
        {/* for logo */}
        <div className="flex flex-col gap-5 justify-end md:justify-center">
          <a href="/">
            <img src={Logo} className="w-1/2 md:w-1/4" alt="FlowBite Logo" />
          </a>
          <span className="text-white font-semibold text-xs md:text-base">
            We curate a collection of handpicked books that cater to diverse
            tastes, ensuring there's something for every reader.
          </span>
        </div>
        {/* for col 1 */}
        <div className="flex flex-col gap-5">
          <h2 className="text-sm font-semibold text-gray-900 uppercase dark:text-white">
            Categories
          </h2>
          <ul className="text-gray-500 dark:text-gray-400 font-medium flex flex-col gap-5 uppercase">
            <li>
                comic
            </li>
            <li>
                free
            </li>
            <li>
                novel
            </li>
            <li>
                study
            </li>
          </ul>
        </div>
        {/* for col 2 */}
        <div className="flex flex-col gap-5">
          <h2 className="text-sm font-semibold text-gray-900 uppercase dark:text-white">
            About us
          </h2>
          <ul className="text-gray-500 dark:text-gray-400 font-medium flex flex-col gap-5 uppercase">
            <li>
              <a href="#" >
                about name
              </a>
            </li>
            <li>
              <a href="#">
                new_blog
              </a>
            </li>
            <li>
              <a href="#" >
                help
              </a>
            </li>
            <li>
              <a href="#">
                partners
              </a>
            </li>
          </ul>
        </div>
        {/* for col 2 */}
        <div className="flex flex-col gap-5">
          <h2 className="text-sm font-semibold text-gray-900 uppercase dark:text-white">
            Services
          </h2>
          <ul className="text-gray-500 dark:text-gray-400 font-medium flex flex-col gap-5 uppercase">
            <li>
              <a href="#" >
                Shpping & delivery
              </a>
            </li>
            <li>
              <a href="#" >
                gift cart
              </a>
            </li>
            <li>
              <a href="#">
                order pickup
              </a>
            </li>
            <li>
              <a href="#">
                Account signup
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-sm font-semibold text-gray-900 uppercase dark:text-white">
            Social
          </h2>
          <ul className="text-gray-500 dark:text-gray-400 font-medium flex flex-col gap-5 uppercase">
            <li>
              <a href="#">
                <div className="flex gap-2">
                  <img src={facebookLogo} alt="" className="w-5 h-5" />
                  FaceBook
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="flex gap-2">
                  <img src={instagram} alt="" className="w-5 h-5" />
                  Instagram
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="flex gap-2">
                  <img src={telegram} alt="" className="w-5 h-5" />
                  Telegram
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="flex gap-2">
                  <img src={xtwitter} alt="" className="w-5 h-5" />
                  Twitter
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

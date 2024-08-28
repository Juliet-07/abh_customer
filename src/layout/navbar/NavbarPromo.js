import { Fragment, useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Transition, Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import SettingServices from "@services/SettingServices";
import Cookies from "js-cookie";

//internal import
import { notifyError } from "@utils/toast";
import useGetSetting from "@hooks/useGetSetting";
import Category from "@component/category/Category";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";

const NavbarPromo = () => {
  const [languages, setLanguages] = useState([]);
  const [currentLang, setCurrentLang] = useState({});
  const { lang, storeCustomizationSetting } = useGetSetting();
  const { isLoading, setIsLoading } = useContext(SidebarContext);

  const { showingTranslateValue } = useUtilsFunction();

  const handleLanguage = (lang) => {
    setCurrentLang(lang);
    Cookies.set("_lang", lang?.iso_code, {
      sameSite: "None",
      secure: true,
    });
  };

  // useEffect(() => {
  //   (async () => {
  //     {
  //       try {
  //         const res = await SettingServices.getShowingLanguage();
  //         setLanguages(res);

  //         const result = res?.find((language) => language?.iso_code === lang);
  //         setCurrentLang(result);
  //       } catch (err) {
  //         notifyError(err);
  //         console.log("error on getting lang", err);
  //       }
  //     }
  //   })();
  // }, []);

  return (
    <>
      <div className="hidden lg:block xl:block bg-white border-b">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10 h-12 flex justify-between items-center">
          <div className="inline-flex">
            <div className="max-w-7xl mx-auto">
              <div className="md:flex space-x-10 items-center text-xs font-primaryMedium">
                {/* Dropdown */}
                <Popover className="relative font-serif">
                  <Popover.Button className="group inline-flex items-center py-2 hover:text-[#8DCB90] focus:outline-none">
                    <span className="font-serif text-sm font-medium">
                      Categories
                    </span>

                    <ChevronDownIcon
                      className="ml-1 h-3 w-3 group-hover:text-[#8DCB90]"
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 -ml-1 mt-1 transform w-screen max-w-xs c-h-65vh bg-white">
                      <div className="rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-y-scroll flex-grow scrollbar-hide w-full h-full">
                        <Category />
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
                <Link
                  href="/about-us"
                  onClick={() => setIsLoading(!isLoading)}
                  className="font-serif mx-4 py-2 text-sm font-medium hover:text-[#8DCB90]"
                >
                  About Us
                </Link>
                <Link
                  onClick={() => setIsLoading(!isLoading)}
                  href="/contact-us"
                  className="font-serif mx-4 py-2 text-sm font-medium hover:text-[#8DCB90]"
                >
                  Contact Us
                </Link>
                <Link
                  onClick={() => setIsLoading(!isLoading)}
                  href="/faq"
                  className="font-serif mx-4 py-2 text-sm font-medium hover:text-[#8DCB90]"
                >
                  FAQ
                </Link>
                {/* <Link
                  onClick={() => setIsLoading(!isLoading)}
                  href="/privacy-policy"
                  className="font-serif mx-4 py-2 text-sm font-medium hover:text-[#8DCB90]"
                >
                  Privacy Policy
                </Link>
                <Link
                  onClick={() => setIsLoading(!isLoading)}
                  href="/terms-and-conditions"
                  className="font-serif mx-4 py-2 text-sm font-medium hover:text-[#8DCB90]"
                >
                  Terms & Conditions
                </Link> */}
                <Link
                  onClick={() => setIsLoading(!isLoading)}
                  href="/vendor/signup"
                  className="font-serif mx-4 py-2 text-sm font-medium hover:text-[#8DCB90]"
                >
                  Sell on ABH
                </Link>
                <Link
                  onClick={() => setIsLoading(!isLoading)}
                  href="https://abh-bulk.vercel.app/"
                  className="font-serif mx-4 py-2 text-sm font-medium hover:text-[#8DCB90]"
                >
                  Bulk Purchase
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarPromo;

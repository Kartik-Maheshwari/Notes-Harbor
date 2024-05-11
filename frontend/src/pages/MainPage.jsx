import React from "react";
import Img from "../components/Img.jsx"
import Input from "../components/Input.jsx"
import Text from "../components/Text.jsx"
import { CloseSVG } from "../assets/images";

const MainPage = () => {
  const [inputfieldvalue, setInputfieldvalue] = React.useState("");
  return (
    <div className="bg-gray-50 flex flex-col font-gilroy items-center justify-start mx-auto w-full">
      {" "}
      <div className="flex flex-col items-start justify-start w-full">
        {" "}
        <div className="bg-white-A700 flex flex-col items-center justify-start p-[22px] sm:px-5 w-full">
          {" "}
          <div className="flex flex-col items-center justify-start mx-auto md:px-5 w-full">
            {" "}
            <div className="flex md:flex-col flex-row md:gap-5 items-center justify-start w-full">
              {" "}
              <Img
                className="h-[35px] w-[13%]"
                src="images/img_group_8.svg"
                alt="Group"
              />{" "}
              <Input
                name="InputField"
                placeholder="Search"
                value={inputfieldvalue}
                onChange={(e) => setInputfieldvalue(e)}
                className="font-medium p-0 placeholder:text-blue_gray-200 sm:pr-5 text-base text-blue_gray-200 text-left w-full"
                wrapClassName="bg-white-A700 border border-blue_gray-300 border-solid flex md:flex-1 md:ml-[0] ml-[101px] md:mt-0 my-1.5 pr-[35px] py-[13px] rounded-md w-[32%] md:w-full"
                prefix={
                  <Img
                    className="cursor-pointer h-5 m-3"
                    src="images/img_search_black_900.svg"
                    alt="search"
                  />
                }
                suffix={
                  <CloseSVG
                    fillColor="#bac1ce"
                    className="cursor-pointer h-5 my-auto"
                    onClick={() => setInputfieldvalue("")}
                    style={{
                      visibility:
                        inputfieldvalue?.length <= 0 ? "hidden" : "visible",
                    }}
                    height={20}
                    width={20}
                    viewBox="0 0 20 20"
                  />
                }></Input>{" "}
              <div className="bg-white-A700 border border-blue_gray-100 border-solid flex flex-col font-opensans h-14 items-end justify-start md:ml-[0] ml-[480px] p-2 rounded-[50%] w-14">
                {" "}
                <div className="md:h-9 h-[35px] mb-1 relative w-9">
                  {" "}
                  <Img
                    className="absolute bottom-[0] h-8 left-[0] w-8"
                    src="images/img_notification.svg"
                    alt="notification"
                  />{" "}
                  <Text
                    className="absolute bg-red-700 border border-blue_gray-50 border-solid h-[18px] justify-center pb-[5px] pt-0.5 px-[5px] right-[0] rounded-[50%] text-white-A700 text-xs top-[0] w-[18px]"
                    size="txtOpenSansRomanSemiBold12">
                    {" "}
                    2{" "}
                  </Text>{" "}
                </div>{" "}
              </div>{" "}
              <div className="border border-blue-A700 border-solid flex flex-col h-14 items-center justify-start ml-6 md:ml-[0] p-1 rounded-[50%] w-14">
                {" "}
                <Img
                  className="h-12 md:h-auto rounded-[50%] w-12"
                  src="images/img_profileimglarg_85X85.png"
                  alt="ProfileImgLarg"
                />
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      </div>{" "}
    </div>
  );
};

export default MainPage;

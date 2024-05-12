import React from "react";
import { Img } from "../components/Img.jsx";
import Input from "../components/Input.jsx";
import { Button } from "../components/Button.jsx";
import Text from "../components/Text.jsx";
import { CloseSVG } from "../assets/images";
import { List } from "../components/List.jsx";

const MainPage = () => {
  const [inputfieldvalue, setInputfieldvalue] = React.useState("");
  return (
    <>
      <div className="bg-gray-50 flex flex-col font-gilroy items-center justify-start mx-auto w-full">
        <div className="flex flex-col items-start justify-start w-full">
          <div className="bg-white-A700 flex flex-col items-center justify-start p-[22px] sm:px-5 w-full">
            <div className="flex flex-col items-center justify-start mx-auto md:px-5 w-full">
              <div className="flex md:flex-col flex-row md:gap-5 items-center justify-start w-full">
                <Img
                  className="h-[35px] w-[13%]"
                  src="images/img_group_8.svg"
                  alt="Group"
                />
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
                  }
                ></Input>
                <div className="bg-white-A700 border border-blue_gray-100 border-solid flex flex-col font-opensans h-14 items-end justify-start md:ml-[0] ml-[480px] p-2 rounded-[50%] w-14">
                  <div className="md:h-9 h-[35px] mb-1 relative w-9">
                    <Img
                      className="absolute bottom-[0] h-8 left-[0] w-8"
                      src="images/img_notification.svg"
                      alt="notification"
                    />
                    <Text
                      className="absolute bg-red-700 border border-blue_gray-50 border-solid h-[18px] justify-center pb-[5px] pt-0.5 px-[5px] right-[0] rounded-[50%] text-white-A700 text-xs top-[0] w-[18px]"
                      size="txtOpenSansRomanSemiBold12"
                    >
                      2
                    </Text>
                  </div>
                </div>
                <div className="border border-blue-A700 border-solid flex flex-col h-14 items-center justify-start ml-6 md:ml-[0] p-1 rounded-[50%] w-14">
                  <Img
                    className="h-12 md:h-auto rounded-[50%] w-12"
                    src="images/img_profileimglarg_85X85.png"
                    alt="ProfileImgLarg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-[31px] items-start justify-start md:mt-0 mt-[37px] w-full">
            <Text className="text-gray-900 text-lg" size="txtGilroySemiBold18">
              QA Tracler
            </Text>
            <div className="flex flex-col gap-[30px] items-center justify-start w-full">
              <div className="bg-white-A700 flex flex-col items-center justify-start p-4 rounded-md shadow-bs w-full">
                <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between w-[99%] md:w-full">
                  <div className="flex flex-row gap-2 items-center justify-between md:mt-0 mt-1.5 w-[28%] md:w-full">
                    <Img
                      className="h-[60px] md:h-auto rounded-[50%] w-[60px]"
                      src="images/img_ellipse91.png"
                      alt="EllipseNinetyOne"
                    />
                    <div className="flex flex-col gap-[5px] items-start justify-start">
                      <Text
                        className="text-black-900 text-lg"
                        size="txtGilroySemiBold18Black900"
                      >
                        Top Secret: v3.0 release
                      </Text>
                      <Text
                        className="text-base text-blue-A700_01"
                        size="txtGilroyBold16"
                      >
                        iOS
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[34px] items-end justify-start w-[39%] md:w-full">
                    <div className="flex flex-row gap-[30px] items-center justify-end w-3/5 md:w-full">
                      <div className="flex flex-row items-start justify-evenly w-[43%]">
                        <Img
                          className="h-6 w-6"
                          src="images/img_ticket_24X24.svg"
                          alt="ticket"
                        />
                        <Text
                          className="mt-[3px] text-base text-blue_gray-400"
                          size="txtGilroyMedium16"
                        >
                          85 Ticket
                        </Text>
                      </div>
                      <div className="flex flex-row items-start justify-evenly w-[44%]">
                        <Img
                          className="h-6 w-6"
                          src="images/img_point1.svg"
                          alt="pointOne"
                        />
                        <Text
                          className="mt-[3px] text-base text-blue_gray-400"
                          size="txtGilroyMedium16"
                        >
                          60 Points
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 items-center justify-between w-full">
                      <Button className="border border-blue-A700_01 border-solid cursor-pointer min-w-[110px] py-2 rounded-[15px] text-blue-A700_01 text-center text-sm">
                        Ticket
                      </Button>
                      <Button className="border border-blue-A700_01 border-solid cursor-pointer min-w-[111px] py-2 rounded-[15px] text-blue-A700_01 text-center text-sm">
                        Details
                      </Button>
                      <Button className="border border-blue-A700_01 border-solid cursor-pointer min-w-[111px] py-1.5 rounded-[15px] text-blue-A700_01 text-center text-sm">
                        Activity
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[30px] items-end justify-start w-full">
                <Button
                  className="bg-blue-A700_01 cursor-pointer flex items-center justify-center min-w-[86px] pr-3 py-2.5 rounded-md"
                  leftIcon={
                    <Img
                      className="h-4 ml-3 mr-2 my-[9px]"
                      src="images/img_filter.svg"
                      alt="filter"
                    />
                  }
                >
                  <div className="font-medium text-left text-sm text-white-A700">
                    Filters
                  </div>
                </Button>

                <List
                  className="sm:flex-col flex-row gap-8 grid md:grid-cols-1 grid-cols-2 justify-center w-full"
                  orientation="horizontal"
                >
                  <div className="flex flex-1 flex-col gap-6 items-center justify-start w-full">
                    <div className="bg-white-A700 flex flex-col items-start justify-start p-6 sm:px-5 rounded-md shadow-bs1 w-full">
                      <div className="flex flex-col gap-[7px] items-start justify-start pt-[3px] w-[61%] md:w-full">
                        <div className="flex flex-col items-start justify-start w-full">
                          <Text
                            className="text-blue-A700_01 text-sm"
                            size="txtGilroyMedium14"
                          >
                            Delivered
                          </Text>
                          <Text
                            className="mt-[15px] text-blue_gray-900 text-lg"
                            size="txtGilroySemiBold18Bluegray900"
                          >
                            Silde drawer project navigation
                          </Text>
                          <Text
                            className="mt-2.5 text-base text-blue_gray-400"
                            size="txtGilroyRegular16"
                          >
                            Navigation, iOS, needs design
                          </Text>
                        </div>
                        <div className="flex relative w-[43%]">
                          <div className="flex my-auto w-[79%]">
                            <div className="flex my-auto w-[73%]">
                              <Img
                                className="h-10 my-auto rounded-[50%] w-10"
                                src="images/img_ellipse92.png"
                                alt="EllipseNinetyTwo"
                              />
                              <Img
                                className="h-10 ml-[-16px] my-auto rounded-[50%] w-10 z-[1]"
                                src="images/img_profileimglarg_85X85.png"
                                alt="EllipseNinetyThree"
                              />
                            </div>
                            <Img
                              className="h-10 ml-[-16px] my-auto rounded-[50%] w-10 z-[1]"
                              src="images/img_ellipse91_40X40.png"
                              alt="EllipseNinetyOne One"
                            />
                          </div>
                          <Img
                            className="h-10 ml-[-16px] my-auto rounded-[50%] w-10 z-[1]"
                            src="images/img_ellipse94.png"
                            alt="EllipseNinetyFour"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white-A700 flex flex-col items-start justify-start p-6 sm:px-5 rounded-md shadow-bs1 w-full">
                      <div className="flex flex-col gap-[7px] items-start justify-start pt-[3px] w-[61%] md:w-full">
                        <div className="flex flex-col items-start justify-start w-full">
                          <Text
                            className="text-blue-A700_01 text-sm"
                            size="txtGilroyMedium14"
                          >
                            Delivered
                          </Text>
                          <Text
                            className="mt-[15px] text-blue_gray-900 text-lg"
                            size="txtGilroySemiBold18Bluegray900"
                          >
                            Silde drawer project navigation
                          </Text>
                          <Text
                            className="mt-2.5 text-base text-blue_gray-400"
                            size="txtGilroyRegular16"
                          >
                            Navigation, iOS, needs design
                          </Text>
                        </div>
                        <div className="flex relative w-[43%]">
                          <div className="flex my-auto w-[79%]">
                            <div className="flex my-auto w-[73%]">
                              <Img
                                className="h-10 my-auto rounded-[50%] w-10"
                                src="images/img_ellipse92.png"
                                alt="EllipseNinetyTwo One"
                              />
                              <Img
                                className="h-10 ml-[-16px] my-auto rounded-[50%] w-10 z-[1]"
                                src="images/img_profileimglarg_85X85.png"
                                alt="EllipseNinetyThree One"
                              />
                            </div>
                            <Img
                              className="h-10 ml-[-16px] my-auto rounded-[50%] w-10 z-[1]"
                              src="images/img_ellipse91_40X40.png"
                              alt="EllipseNinetyOne One"
                            />
                          </div>
                          <Img
                            className="h-10 ml-[-16px] my-auto rounded-[50%] w-10 z-[1]"
                            src="images/img_ellipse94.png"
                            alt="EllipseNinetyFour One"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white-A700 flex flex-col items-start justify-start p-6 sm:px-5 rounded-md shadow-bs1 w-full">
                      <div className="flex flex-col gap-[7px] items-start justify-start pt-[3px] w-[61%] md:w-full">
                        <div className="flex flex-col items-start justify-start w-full">
                          <Text
                            className="text-blue-A700_01 text-sm"
                            size="txtGilroyMedium14"
                          >
                            Delivered
                          </Text>
                          <Text
                            className="mt-[15px] text-blue_gray-900 text-lg"
                            size="txtGilroySemiBold18Bluegray900"
                          >
                            Silde drawer project navigation
                          </Text>
                          <Text
                            className="mt-2.5 text-base text-blue_gray-400"
                            size="txtGilroyRegular16"
                          >
                            Navigation, iOS, needs design
                          </Text>
                        </div>
                        <div className="flex relative w-[43%]">
                          <div className="flex my-auto w-[79%]">
                            <div className="flex my-auto w-[73%]">
                              <Img
                                className="h-10 my-auto rounded-[50%] w-10"
                                src="images/img_ellipse92.png"
                                alt="EllipseNinetyTwo Two"
                              />
                              <Img
                                className="h-10 ml-[-16px] my-auto rounded-[50%] w-10 z-[1]"
                                src="images/img_profileimglarg_85X85.png"
                                alt="EllipseNinetyThree Two"
                              />
                            </div>
                            <Img
                              className="h-10 ml-[-16px] my-auto rounded-[50%] w-10 z-[1]"
                              src="images/img_ellipse91_40X40.png"
                              alt="EllipseNinetyOne Two"
                            />
                          </div>
                          <Img
                            className="h-10 ml-[-16px] my-auto rounded-[50%] w-10 z-[1]"
                            src="images/img_ellipse94.png"
                            alt="EllipseNinetyFour Two"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-6 items-center justify-start w-full">
                    <div className="bg-white-A700 flex flex-col items-start justify-start p-6 sm:px-5 rounded-md shadow-bs1 w-full">
                      <div className="flex flex-col gap-[7px] items-start justify-start pt-[3px] w-[61%] md:w-full">
                        <div className="flex flex-col items-start justify-start w-full">
                          <Text
                            className="text-blue-A700_01 text-sm"
                            size="txtGilroyMedium14"
                          >
                            Delivered
                          </Text>
                          <Text
                            className="mt-[15px] text-blue_gray-900 text-lg"
                            size="txtGilroySemiBold18Bluegray900"
                          >
                            Silde drawer project navigation
                          </Text>
                          <Text
                            className="mt-2.5 text-base text-blue_gray-400"
                            size="txtGilroyRegular16"
                          >
                            Navigation, iOS, needs design
                          </Text>
                        </div>
                        <div className="flex relative w-[43%]">
                          <div className="flex my-auto w-[79%]">
                            <div className="flex my-auto w-[73%]">
                              <Img
                                className="h-10 my-auto rounded-[50%] w-10"
                                src="images/img_ellipse92.png"
                                alt="EllipseNinetyTwo One"
                              />
                              <Img
                                className="h-10 ml-[-16px] my-auto rounded-[50%] w-10 z-[1]"
                                src="images/img_profileimglarg_85X85.png"
                                alt="EllipseNinetyThree One"
                              />
                            </div>
                            <Img
                              className="h-10 ml-[-16px] my-auto rounded-[50%] w-10 z-[1]"
                              src="images/img_ellipse91_40X40.png"
                              alt="EllipseNinetyOne Two"
                            />
                          </div>
                          <Img
                            className="h-10 ml-[-16px] my-auto rounded-[50%] w-10 z-[1]"
                            src="images/img_ellipse94.png"
                            alt="EllipseNinetyFour One"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white-A700 flex flex-col items-start justify-start p-6 sm:px-5 rounded-md shadow-bs1 w-full">
                      <div className="flex flex-col gap-[7px] items-start justify-start pt-[3px] w-[61%] md:w-full">
                        <div className="flex flex-col items-start justify-start w-full">
                          <Text
                            className="text-blue-A700_01 text-sm"
                            size="txtGilroyMedium14"
                          >
                            Delivered
                          </Text>
                          <Text
                            className="mt-[15px] text-blue_gray-900 text-lg"
                            size="txtGilroySemiBold18Bluegray900"
                          >
                            Silde drawer project navigation
                          </Text>
                          <Text
                            className="mt-2.5 text-base text-blue_gray-400"
                            size="txtGilroyRegular16"
                          >
                            Navigation, iOS, needs design
                          </Text>
                        </div>
                        <div className="flex relative w-[43%]">
                          <div className="flex my-auto w-[79%]">
                            <div className="flex my-auto w-[73%]">
                              <Img
                                className="h-10 my-auto rounded-[50%] w-10"
                                src="images/img_ellipse92.png"
                                alt="EllipseNinetyTwo One One"
                              />
                              <Img
                                className="h-10 ml-[-16px] my-auto rounded-[50%] w-10 z-[1]"
                                src="images/img_profileimglarg_85X85.png"
                                alt="EllipseNinetyThree One One"
                              />
                            </div>
                            <Img
                              className="h-10 ml-[-16px] my-auto rounded-[50%] w-10 z-[1]"
                              src="images/img_ellipse91_40X40.png"
                              alt="EllipseNinetyOne One One"
                            />
                          </div>
                          <Img
                            className="h-10 ml-[-16px] my-auto rounded-[50%] w-10 z-[1]"
                            src="images/img_ellipse94.png"
                            alt="EllipseNinetyFour One One"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white-A700 flex flex-col items-start justify-start p-6 sm:px-5 rounded-md shadow-bs1 w-full">
                      <div className="flex flex-col gap-[7px] items-start justify-start pt-[3px] w-[61%] md:w-full">
                        <div className="flex flex-col items-start justify-start w-full">
                          <Text
                            className="text-blue-A700_01 text-sm"
                            size="txtGilroyMedium14"
                          >
                            Delivered
                          </Text>
                          <Text
                            className="mt-[15px] text-blue_gray-900 text-lg"
                            size="txtGilroySemiBold18Bluegray900"
                          >
                            Silde drawer project navigation
                          </Text>
                          <Text
                            className="mt-2.5 text-base text-blue_gray-400"
                            size="txtGilroyRegular16"
                          >
                            Navigation, iOS, needs design
                          </Text>
                        </div>
                        <div className="flex relative w-[43%]">
                          <div className="flex my-auto w-[79%]">
                            <div className="flex my-auto w-[73%]">
                              <Img
                                className="h-10 my-auto rounded-[50%] w-10"
                                src="images/img_ellipse92.png"
                                alt="EllipseNinetyTwo Two One"
                              />
                              <Img
                                className="h-10 ml-[-16px] my-auto rounded-[50%] w-10 z-[1]"
                                src="images/img_profileimglarg_85X85.png"
                                alt="EllipseNinetyThree Two One"
                              />
                            </div>
                            <Img
                              className="h-10 ml-[-16px] my-auto rounded-[50%] w-10 z-[1]"
                              src="images/img_ellipse91_40X40.png"
                              alt="EllipseNinetyOne Two One"
                            />
                          </div>
                          <Img
                            className="h-10 ml-[-16px] my-auto rounded-[50%] w-10 z-[1]"
                            src="images/img_ellipse94.png"
                            alt="EllipseNinetyFour Two One"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </List>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;

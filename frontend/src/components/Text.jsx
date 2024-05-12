import React from "react";
const sizeClasses = {
  txtGilroyBold16: "font-bold font-gilroy",
  txtOpenSansRomanSemiBold16: "font-opensans font-semibold",
  txtGilroySemiBold18Black900: "font-gilroy font-semibold",
  txtGilroyMedium14: "font-gilroy font-medium",
  txtGilroySemiBold16BlueA70001: "font-gilroy font-semibold",
  txtGilroySemiBold18Bluegray900: "font-gilroy font-semibold",
  txtGilroySemiBold18: "font-gilroy font-semibold",
  txtGilroySemiBold16: "font-gilroy font-semibold",
  txtGilroyRegular16: "font-gilroy font-normal",
  txtGilroyMedium16: "font-gilroy font-medium",
  txtOpenSansRomanSemiBold12: "font-opensans font-semibold",
};
const Text = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "p";
  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {" "}
      {children}{" "}
    </Component>
  );
};
export default Text;

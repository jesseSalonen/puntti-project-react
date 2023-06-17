import React from "react";

function Sidebar() {
  return (
    <div
      className={`
        fixed
        top-[94px]
        right-0
        h-full
        w-80
        bg-[#1E2831]
        px-2
        text-white
        [&>ul>li>a:hover]:text-gray-400
        [&>ul>li>a>svg]:mr-1
        [&>ul>li>a]:flex
        [&>ul>li>a]:items-center
        [&>ul>li]:mt-4
      `}
    ></div>
  );
}

export default Sidebar;

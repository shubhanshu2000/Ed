import React from "react";

const Text = ({ txt }) => {
  return (
    <>
      <div className="flex items-center my-6 justify-evenly">
        <hr className=" w-1/3 h-[1px]" />
        <h1 className="text-xl">{txt}</h1>
        <hr className=" w-1/3 h-[1px]" />
      </div>
    </>
  );
};

export default Text;

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { download } from "../assets";
import { downloadImage } from "../utils";

const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card_css">
      <img src={photo} alt={prompt} />
      <div className=" text-white group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className=" text-sm overflow-y-auto prompt_css">
          {prompt}
        </p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="rounded-full h-6 w-6 flex justify-center items-center  bg-green-700 text-xs font-bold text-white">
            {name[0]}
          </div>
          <div>{name}</div>
          <button type="button" onClick={()=>downloadImage(_id,photo)} className="outline-none bg-transparent border-none">
            <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

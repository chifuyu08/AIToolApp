/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";

const PrompGen = ({ updatePrompt, handleAiGen }) => {
  const [inputValue, setInputValue] = useState("");
  const [genText, setGenText] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleRecordingComplete = () => {
    updatePrompt(genText);
  };
  const generateImagePrompt = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/idea/", {
        keywords: inputValue,
      });
      setGenText(response.data);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };
  return (
    <div className="w-[25vw] h-[45vh] z-20 fixed top-[20vh] left-[38vw] flex flex-col justify-around  bg-[#F9FAFE] rounded-lg">
      <div className="flex justify-around ">
        <Button onClick={generateImagePrompt} variant="contained">
          Generate
        </Button>
        <Button
          type="button"
          onClick={() => {
            handleRecordingComplete();
            handleAiGen(false);
          }}
          variant="contained"
        >
          Submit
        </Button>
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter Keywords"
        className="w-[90%] h-auto bg-[#F9FAFE] focus:bg-gray-100 focus:outline-none p-3 rounded-lg text-purple-900 ml-6"
      />

      <div className="w-[90%] h-[30%] font-bold p-3 bg-[#d5e0ef88] rounded-lg text-purple-900 ml-6">
        {genText}
      </div>
    </div>
  );
};

export default PrompGen;

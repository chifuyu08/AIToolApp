/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { FormField, Loader } from "../components";
import { getrandomPrompt } from "../utils";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TiMicrophone } from "react-icons/ti";
import Recording from "../components/Recording";
import Overlay from "../components/Overlay";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [Recordingaudio, setRecording] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const allphoto = await axios.post(
          "https://aitoolapp.onrender.com/api/v1/post/",
          {
            name: form.name,
            prompt: form.prompt,
            photo: form.photo,
          }
        );
        // await allphoto.json();
        navigate("/");
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Generate image first");
    }
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSupriseMe = () => {
    const randomPrompt = getrandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    try {
      form.photo = "";
      setGeneratingImg(true);
      setImageLoaded(false);
      const response = await axios.post(
        "https://aitoolapp.onrender.com/api/v1/gen/",
        {
          prompt: form.prompt,
        }
      );
      setForm({ ...form, photo: `${response.data.data[0].asset_url}` });
    } catch (error) {
      if (
        error.toString() ===
        "TypeError: Cannot read properties of undefined (reading '0')"
      ) {
        toast.error("Check tomorrow");
      }
      setGeneratingImg(false);
      throw new Error(`${error}`);
    }
  };

  const handleRecording =()=>{
    let newVal=!Recordingaudio;
    setRecording(newVal);
  }

  const handleImageLoad = () => {
    setGeneratingImg(false);
    setImageLoaded(true);
  };

  const handleRecordingUpdate = (newPrompt) => {
    setForm((prevForm) => ({
      ...prevForm,
      prompt: newPrompt,
    }));
  };

  return (
    <section className="max-w-7xl mx-auto ">
      {Recordingaudio && <Recording handleRecording={handleRecording} updatePrompt={handleRecordingUpdate}/>}
      {Recordingaudio && <Overlay />}
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] ">
          Create imaginative images and share them with Community
        </p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            LabelName="name"
            type="text"
            name="name"
            placeholder="Sujal"
            value={form.name}
            handleOnChange={handleChange}
          />
          <div className="flex gap-3">
            <FormField
              LabelName="prompt"
              type="text"
              name="prompt"
              placeholder="an oil painting by Matisse of a humanoid robot playing chess"
              value={form.prompt}
              handleOnChange={handleChange}
              isSupriseMe
              handleSupriseMe={handleSupriseMe}
              className="w-[45rem]"
            />
            <button  type="button" onClick={handleRecording}  className="text-2xl flex mt-8 my-4 p-2">
              <TiMicrophone />
            </button>
          </div>

          <div className="photo_preview relative border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                onLoad={handleImageLoad}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className="photo_preview_loader absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5 ">
          <button
            type="button"
            onClick={generateImage}
            className="generate_button text-white bg-green-700 font-medium rounded-md w-full px-5 py-2.5 text-sm text-center sm:w-auto "
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have generated share it with Community
          </p>
          <button
            type="submit"
            className=" share_button mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "sharing..." : "Share with community"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </section>
  );
};

export default CreatePost;

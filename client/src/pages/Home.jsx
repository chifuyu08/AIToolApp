/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Loader, Card, FormField } from "../components/index";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPost, setAllPost] = useState(null);
  const [searchtext, setSearchtext] = useState("");
  const [searchedPost, setsearchedPost] = useState(null);
  const [searchTimeout, setsearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const result = await axios.get("https://aitoolapp.onrender.com/api/v1/post/");
        setAllPost(result.data.data.reverse());
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  const handleSearch = (e) => {
    clearTimeout(setsearchTimeout);
    setSearchtext(e.target.value);
    setsearchTimeout(
      setTimeout(() => {
        const searchRes = allPost.filter(
          (item) =>
            item.name.toLowerCase().includes(searchtext.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchtext.toLowerCase())
        );
        setsearchedPost(searchRes);
      }, 500)
    );
  };

  const RenderCards = ({ data, errorText }) => {
    if (data?.length > 0) {
      return data.map((post) => <Card key={post._id} {...post} />);
    }
    return (
      <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">
        {errorText}
      </h2>
    );
  };
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Community Showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] ">
          Browse through a collection of imaginative and visually stunning
          images{" "}
        </p>
      </div>
      <div className="mt-16">
        <FormField
          LabelName="Search Text"
          type="text"
          name="Search Text"
          placeholder=""
          value={searchtext}
          handleOnChange={handleSearch}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchtext && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing results for{" "}
                <span className="text-[#222328]">{searchtext}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchtext ? (
                <RenderCards data={searchedPost} errorText="No Results Found" />
              ) : (
                <RenderCards data={allPost} errorText="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default Home;

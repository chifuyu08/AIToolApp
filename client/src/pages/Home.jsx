/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Loader, Card, FormField } from "../components/index";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPost, setAllPost] = useState(null);
  const [search, setSearch] = useState(" ");

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
        <FormField />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {search && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing results for{" "}
                <span className="text-[#222328]">{search}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {search ? (
                <RenderCards data={[]} errorText="No Results Found" />
              ) : (
                <RenderCards data={[]} errorText="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;

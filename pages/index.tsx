import { useUser } from "@auth0/nextjs-auth0";
import Layout from "../components/layout";
import SearchBar from "../components/searchbar";
import { useState, useEffect } from "react";
import { getRecipe } from "./api/edamam";
import { useRouter } from "next/router";
import FoodList from "../components/foodlist";

type ProcessProps = {
  data: Object;
};

const Home = ({ data }: ProcessProps) => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const handleChange = (input: string) => {
    const sParameter = encodeURIComponent(input.trim());
    router.push(
      { pathname: "/", query: { ...router.query, qstring: sParameter } },
      undefined,
      {}
    );
    console.log(data);
  };

  return (
    <Layout user={user} loading={isLoading}>
      <h1>Foodies</h1>
      <p>
        Looking for a recipe? Try searching for one from the search field below!
      </p>

      <SearchBar change={handleChange} />
      <FoodList data={data}/>
    </Layout>
  );
};

// fast/cached SSR page
export default Home;

export async function getServerSideProps(context) {
  const { qstring } = context.query;
  console.log(qstring);
  const res = await fetch(
    `https://api.edamam.com/api/recipes/v2?type=public&q=${qstring}&app_id=949504a2&app_key=e072ae54fa208667a922bfbb0ec21f2f`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

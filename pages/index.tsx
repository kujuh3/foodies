import { useUser } from "@auth0/nextjs-auth0";
import Layout from "../components/layout";
import SearchBar from "../components/searchbar";
import { useRouter } from "next/router";
import FoodList from "../components/foodlist";
import { useState, useEffect } from "react";
import randomFood from "../components/randomfoods";

type ProcessProps = {
  data: Object;
};

const Home = ({ data }: ProcessProps) => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [foodlist, setFoodlist] = useState();
  const defaultSearch = randomFood();

  const handleChange = (input: string) => {
    ;(async () => {
      const res = await fetch(`/api/edamam`, {
        method: "POST",
        body: JSON.stringify({qstring: input}),
      })
      const data = await res.json()
      setFoodlist(data)
    })()
  };
 
  //For first time load boilerplate search
  useEffect(() => {
    ;(async () => {
      const res = await fetch(`/api/edamam`, {
        method: "POST",
        body: JSON.stringify({qstring: defaultSearch}),
      })
      const data = await res.json()
      setFoodlist(data)
    })()
  }, [])

  return (
    <Layout user={user} loading={isLoading}>
      <h1>Foodies</h1>
      <p>
        Looking for a recipe? Try searching for one from the search field below!
      </p>

      <SearchBar defaultWord={defaultSearch} change={handleChange} />
      <FoodList data={foodlist} />
    </Layout>
  );
};

// fast/cached SSR page
export default Home;

// export async function getServerSideProps(context) {
//   const { qstring } = context.query;
//   console.log(qstring);
//   const res = await fetch(
//     `https://api.edamam.com/api/recipes/v2?type=public&q=${qstring}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`
//   );
//   const data = await res.json();

//   // Pass data to the page via props
//   return { props: { data } };
// }

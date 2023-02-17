import Layout from "../components/layout";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FoodList from "../components/foodlist";
import CircularProgress from "@mui/material/CircularProgress";

const GetRecipe = () => {
  const router = useRouter();
  const { pid } = router.query;
  const { user, isLoading } = useUser();
  const [likes, setLikes] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/likes", {
        method: "GET",
      });

      const data = await res.json();
      console.log(data)
      setLikes({hits: data, count: data.length});
    })();
  }, []);

  return (
    <Layout user={user} loading={isLoading}>
      {likes ? (
        <FoodList data={likes} />
      ) : (
        <div style={{textAlign: "center", marginTop: "100px"}}>
          <CircularProgress sx={{ color: "#ffa700"}} />
        </div>
      )}
    </Layout>
  );
};

export default GetRecipe;

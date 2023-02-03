import Layout from "../components/layout";
import { useUser } from "@auth0/nextjs-auth0";


const GetRecipe = () => {
  const { user, isLoading } = useUser();

  return (
    <Layout user={user} loading={isLoading}>
      <h1>Test</h1>
    </Layout>
  );
};

export default GetRecipe;

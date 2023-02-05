export async function getRecipe() {
  async function getServerSideProps() {
    const res = await fetch("https://api.edamam.com/api/recipes/v2", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "public",
        q: "chicken",
        app_id: process.env.EDAMAM_APP_ID,
        app_key: process.env.EDAMAM_APP_KEY
      }),
    });

    const response = await res.json();
    console.log(response)
    return {
      props: { key: response },
    };
  }
  getServerSideProps()
}

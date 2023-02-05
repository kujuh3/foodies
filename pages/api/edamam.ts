export default async function handler(req, res) {
  const { qstring } = JSON.parse(req.body);
  if (qstring) {
    const data = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${qstring}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`
    ).then((response) => response.json());

    res.status(200).json(data); // Send the response
  } else {
    console.log("NO QSTRING")
    const data = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`
    ).then((response) => response.json());

    res.status(200).json(data); // Send the response
  }
}

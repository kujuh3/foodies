import clientPromise from "../../lib/mongodb";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default async (req, res) => {
  try {
    const { user } = getSession(req, res);
    const client = await clientPromise;
    const db = client.db("likes");
    const insertObject = {
        recipe: req.body,
        owner: user.sub
    }

    switch (req.method) {
      case "POST":
        // let recipe = JSON.parse(req.body.recipe);
        let post = await db.collection("userlikes").insertOne(insertObject);
        res.json(post);
        break;
      case "GET":
        const likes = await db
          .collection("userlikes")
          .find({ owner: user.sub }, { projection: {recipe: 1}}) //Projection to exclude the owner id for security. Honestly doesn't matter its just liked recipes but in sake of interest.
          .toArray();
        //Doesnt like returning objects from database for some reason, just parse them all in a for loop.
        for(let i = 0; i < likes.length; i++){
            likes[i].recipe = JSON.parse(likes[i].recipe)
        }
        res.json(likes);
        break;
    }
  } catch (e) {
    console.error(e);
  }
};

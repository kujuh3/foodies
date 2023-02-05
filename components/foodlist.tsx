import Link from "next/link";
import Grid from "@mui/material/Grid";
import FoodCard from "./card";


type ListProps = {
  data?: any;
};

const FoodList = ({ data }: ListProps) => {
  console.log(data);
  return (
    <>
      {data ? (
        <Grid
          sx={{marginTop: "0px !important"}}
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {data.hits.map((item, idx) => {
            return (
              <Grid key={idx} item xs={4} sm={4} md={4}>
                <FoodCard foodItem={item.recipe}/>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
};

export default FoodList;

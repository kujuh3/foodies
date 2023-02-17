import Link from "next/link";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import { BiHeart, BiArrowToBottom, BiListOl } from "react-icons/bi";
import { RxDot } from "react-icons/rx";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

type CardProps = {
  foodItem?: any;
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const FoodCard = ({ foodItem }: CardProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleLike = async () => {
    const recipe = JSON.stringify(foodItem);
    const res = await fetch("/api/likes", {
      method: "POST",
      body: recipe
    });

    const data = await res.json();

    console.log(data);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#271542cc" }}>
      <CardHeader
        title={
          <a
            style={{color: "rgb(228, 148, 8)"}}
            aria-label="Open recipe in another tab"
            title="Open recipe in another tab"
            href={foodItem.url}
            target="__blank"
          >
            {foodItem.label}
          </a>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={foodItem.images.SMALL.url}
        alt={foodItem.label}
        loading="lazy"
      ></CardMedia>
      <CardActions disableSpacing>
        <IconButton onClick={handleLike} aria-label="add to favorites">
          <BiHeart color="rgb(228, 148, 8)"/>
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <BiListOl color="rgb(228, 148, 8)"/>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ backgroundColor: "#2715429e", color: "white" }}>
          <List>
            {foodItem.ingredientLines.map((ingredient, idx) => {
              return (
                <ListItem key={idx} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <RxDot color="white" />
                    </ListItemIcon>
                    <ListItemText primary={ingredient} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default FoodCard;

import React from "react";
import MaterialCard from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styles from "./card.module.scss";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NotFavoriteIcon from "@material-ui/icons/FavoriteBorder";

const Card = ({
  title,
  description,
  imageSrc,
  isMine,
  onDelete,
  toggleLike,
  likesCount,
  isLiked
}) => (
  <MaterialCard className={styles.card}>
    <CardMedia className={styles.media} image={imageSrc} />
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        {title}
      </Typography>
      <Typography component="p">{description}</Typography>
    </CardContent>
    <CardActions className={styles.actions} disableActionSpacing>
      <IconButton onClick={toggleLike}>
        {isLiked ? <FavoriteIcon /> : <NotFavoriteIcon />}
      </IconButton>
      <Typography component="p">{likesCount}</Typography>
      {isMine && (
        <IconButton onClick={onDelete} className={styles.delete}>
          <DeleteIcon />
        </IconButton>
      )}
    </CardActions>
  </MaterialCard>
);

export default Card;

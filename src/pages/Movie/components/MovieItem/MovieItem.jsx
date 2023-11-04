import React from "react"
import { useNavigate } from "react-router-dom";
import classes from "./MovieItem.module.scss";


export const MovieItem = ({movie}) => {

const navigate = useNavigate()


  return (
    <div className={classes.wrapper} onClick={()=>navigate(`/movies/${movie.id}`)}>
      <img className={classes.img} src={movie?.image?.url} />
      <div className={classes.title}>{movie.name}</div>
    </div>
  )
}

export default MovieItem

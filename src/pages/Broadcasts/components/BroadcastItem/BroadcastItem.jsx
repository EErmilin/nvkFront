import React from "react"
import { useNavigate } from "react-router-dom";
import classes from "./BroadcastItem.module.scss";


export const BroadcastItem = ({brodcast}) => {

const navigate = useNavigate()




  return (
    <div className={classes.wrapper} onClick={()=>navigate(`/broadcasts/${brodcast.id}`)}>
      <img className={classes.img} src={brodcast?.image?.url} />
      <div className={classes.title}>{brodcast.name}</div>
    </div>
  )
}

export default BroadcastItem

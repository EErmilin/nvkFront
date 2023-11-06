import React from "react"
import { useNavigate } from "react-router-dom";
import classes from "./SerialsItem.module.scss";


export const SerialsItem = ({serial}) => {

const navigate = useNavigate()

  return (
    <div className={classes.wrapper} onClick={()=>navigate(`/serials/${serial.id}`)}>
      <img className={classes.img} src={serial?.image?.url} />
      <div className={classes.title}>{serial.name}</div>
    </div>
  )
}

export default SerialsItem

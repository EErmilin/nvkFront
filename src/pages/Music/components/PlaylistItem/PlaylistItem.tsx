import React, { useEffect, useMemo, useState } from 'react'
import classes from "./PlaylistItem.module.scss";


const TAKE = 8;

function PlaylistItem({playlist, onClick}: any) {

    const [error, setError] = useState(false)



    return (
        <div onClick={() => onClick(playlist, 'playlist')} className={classes.music_field_item} >
            {!playlist.cover?.url_256 || error? <div className={classes.music_field_no_img} /> : <img src={playlist.cover?.url_256} className={classes.music_field_img} alt="Logo" onError={()=>setError(true)}/>}
            <div className={classes.music_field_item_title}>{playlist.name}</div>
        </div>
    );
}

export default PlaylistItem;


import React, { useEffect, useMemo, useState } from 'react'
import classes from "./PlaylistItem.module.scss";

function PlaylistItem({ playlist, onClick }: any) {
    
    const [error, setError] = useState(false)

    return (
        <div onClick={() => onClick(playlist, 'playlist')} className={classes.music_field_item} >
            <div className={classes.music_field_img_mask_wrp}>
                <div className={classes.music_field_img_mask}>
                    {!playlist.cover?.url_256 || error ? <div className={classes.music_field_no_img} /> :
                        <div>
                            <img src={playlist.cover?.url_256} className={classes.music_field_img} alt="Logo" onError={() => setError(true)} />
                        </div>}
                </div>
            </div>
            <div className={classes.music_field_item_title}>{playlist.name}</div>
        </div>
    );
}

export default PlaylistItem;


import React, { useEffect, useMemo, useState } from 'react'
import classes from "./PopularItem.module.scss";


function PopularItem({ album, onClick }: any) {

    const [error, setError] = useState(false)



    return (
        <div onClick={() => onClick(album, 'album')} className={classes.music_field_item} >
            <div className={classes.music_field_img_mask_wrp}>
                <div className={classes.music_field_img_mask}>
                    {!album.cover?.url_256 || error ? <div className={classes.music_field_no_img} /> :
                        <div>
                            <img src={album.cover?.url_256} className={classes.music_field_img} alt="Logo" onError={() => setError(true)} />
                        </div>}
                </div>
            </div>
            <div className={classes.music_field_item_title}>{album.name}</div>
        </div>
    );
}

export default PopularItem;
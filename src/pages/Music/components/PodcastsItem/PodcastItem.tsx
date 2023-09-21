import React, { useEffect, useMemo, useState } from 'react'
import classes from "./PodcastItem.module.scss";


function PodcastItem({ podcast, onClickPodcasts }: any) {

    const [error, setError] = useState(false)



    return (
        <div onClick={() => onClickPodcasts(podcast)} className={classes.music_field_item} >
            <div className={classes.music_field_img_mask_wrp}>
                <div className={classes.music_field_img_mask}>
                    {!podcast.cover?.url_256 || error ? <div className={classes.music_field_no_img} /> :
                        <div>
                            <img src={podcast.cover?.url_256} className={classes.music_field_img} alt="Logo" onError={() => setError(true)} />
                        </div>}
                </div>
            </div>
            <div className={classes.music_field_item_title}>{podcast.name}</div>
        </div>
    );
}

export default PodcastItem;
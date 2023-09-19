import React, { useEffect, useMemo, useState } from 'react'
import MusicPlayer from '../../../../components/MusicPlayer/MusicPlayer';
import classes from "./MusicItem.module.scss";


function MusicItem({item}: any) {

    const [play, setPlay] = useState(false)
    console.log(item)
    const cls = [classes.music_field_music_item_wrp]
    if (play) {
        cls.push(classes.music_field_music_item_wrp_active)

  
    }
    const tempateItem = () => {
        if (play) {
            return (
                <div className={classes.music_wrp}>
                    <MusicPlayer music={item} />
                </div>
            )
        }
    }

    return (
        <div className={classes.music_field_music_item}>
        {!item.cover?.url_256 ? <div className={classes.music_field_music_item_no_img} onClick={()=>setPlay(true)}/> : <img onClick={()=>setPlay(true)} className={classes.music_field_music_item_img} src={item.cover?.url_256} alt="Logo" />}
        <div className={cls.join(" ")}>
            <div className={classes.music_field_music_item_title}>{item.title} </div>
            <div className={classes.music_field_music_item_name}>{item.artist.name}</div>
            {tempateItem()}
            <div className={classes.music_field_music_item_btn} />
        </div>
    </div>
    );
}

export default MusicItem;


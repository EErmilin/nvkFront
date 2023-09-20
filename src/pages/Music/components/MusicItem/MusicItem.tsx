import React, { useEffect, useMemo, useState } from 'react'
import MusicPlayer from '../../../../components/MusicPlayer/MusicPlayer';
import classes from "./MusicItem.module.scss";


function MusicItem({ item, currentPlayer, onClick,audioRef }: any) {
    const isPlay = currentPlayer === item

    const cls = [classes.music_item_wrp]
    if (isPlay) {
        cls.push(classes.music_item_wrp_active)
    }

    const tempateItem = () => {
        if (isPlay) {
            return (
                <div className={classes.music_wrp}>
                    <MusicPlayer music={item} audioRef={audioRef}/>
                </div>
            )
        }
    }

    return (
        <div className={classes.music_item}>
            {!item.cover?.url_256 ? <div className={classes.music_item_no_img} onClick={onClick} /> : <img className={classes.music_item_img} src={item.cover?.url_256} alt="Logo" />}
            <div className={cls.join(" ")}>
                <div className={classes.music_item_title}>{item.title} </div>
                <div className={classes.music_item_name}>{item.artist.name}</div>
                {tempateItem()}
                <div className={classes.music_item_btn} />
            </div>
        </div>
    );
}

export default MusicItem;


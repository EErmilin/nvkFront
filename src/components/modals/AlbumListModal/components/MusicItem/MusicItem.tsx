
import { useState } from 'react';
import classes from './MusicItem.module.scss';
import React from 'react';
import FavoriteBtn from '../../../../FavoriteBtn/FavoriteBtn';
import MusicPlayer from '../../../../MusicPlayer/MusicPlayer';


const MusicItem = ({ item }: any) => {
    const [isNoImg, setIsNoImg] = useState(false)
    const [play, setPlay] = useState(false)

    const cls = [classes.music_item_wrp]
    if (play) {
        cls.push(classes.music_item_wrp_active)
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
        <div className={classes.music_wrp}>
            <div className={classes.music_item}>

                {!item.artwork || isNoImg ? <div className={classes.music_item_no_img} onClick={() => setPlay(true)} /> :
                    <img className={classes.music_item_img} src={item.artwork} alt="Logo" onError={() => setIsNoImg(true)} onClick={() => setPlay(true)} />}
                <div className={cls.join(" ")}>
                    <div className={classes.music_item_title}>{item.title} </div>
                    <div className={classes.music_item_name}>{item.artist}</div>
                    {tempateItem()}
                </div>

            </div>
            <div className={classes.music_item_btn_wrp}>
                <FavoriteBtn id={item.id}></FavoriteBtn>

                <div className={classes.music_item_btn} />
            </div>

        </div>
    );
}

export default MusicItem;



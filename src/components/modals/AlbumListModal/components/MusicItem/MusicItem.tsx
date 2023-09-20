
import { useEffect, useState } from 'react';
import classes from './MusicItem.module.scss';
import React from 'react';
import FavoriteBtn from '../../../../FavoriteBtn/FavoriteBtn';
import MusicPlayer from '../../../../MusicPlayer/MusicPlayer';


const MusicItem = ({ item, currentPlayer, setCurrentPlayer, audioRef, player }: any) => {
    const [isNoImg, setIsNoImg] = useState(false)

    const [isPlay, setIsPlay] = useState(false)
   

    useEffect(() => {
        if (currentPlayer === item) {
            setIsPlay(true)
        }
        else{
            setIsPlay(false) 
        }
    }, [currentPlayer])



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
        <div className={classes.music_wrp} ref={isPlay? player: null}>
            <div className={classes.music_item} ref={player}>

                {!item.artwork || isNoImg ? <div className={classes.music_item_no_img} onClick={()=>setCurrentPlayer(item)}/> :
                    <img className={classes.music_item_img} src={item.artwork} alt="Logo" onError={() => setIsNoImg(true)} onClick={()=>setCurrentPlayer(item)}/>}
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



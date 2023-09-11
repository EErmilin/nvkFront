
import { useState } from 'react';
import FavoriteBtn from '../../../../FavoriteBtn/FavoriteBtn';
import classes from './MusicItem.module.scss';



const MusicItem = ({ item }: any) => {

    console.log('@@@@@@@@@@@')
    console.log(item)

    const [isNoImg, setIsNoImg] = useState(false)
    return (
        <div className={classes.music_wrp}>
            <div className={classes.music_item}>

                {!item.artwork || isNoImg ? <div className={classes.music_item_no_img} /> : <img className={classes.music_item_img} src={item.artwork} alt="Logo" onError={() => setIsNoImg(true)} />}
                <div className={classes.music_item_wrp}>
                    <div className={classes.music_item_title}>{item.title} </div>
                    <div className={classes.music_item_name}>{item.artist}</div>

                </div>
                </div>
                <div className={classes.music_item_btn_wrp}>
                    <FavoriteBtn id={item.id}></FavoriteBtn>
                    <div className={classes.music_item_btn} />
                </div>
        
        </div>
    );
};

export default MusicItem;


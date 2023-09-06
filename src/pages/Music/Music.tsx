import React, { useEffect } from 'react'
import '../../assets/css/main.css';
import classes from "./Music.module.scss";


function Music() {

    return (
        <div className={classes.music}>
            <div className={classes.music_field}>
                <div className={classes.music_field_header}>
                    <h1 className={classes.music_field_title}>Сборник</h1>
                    <div className={classes.music_field_header_btn}>Все</div>
                </div>
                <div className={classes.music_field_wrp}>

                </div>

            </div>
            <div className={classes.music_field}>
                <div className={classes.music_field_header}>
                    <h1 className={classes.music_field_title}>Популярные альбомы</h1>
                    <div className={classes.music_field_header_btn}>Все</div>
                </div>
                <div className={classes.music_field_wrp}>

                </div>

            </div>
            <div className={classes.music_field}>
                <div className={classes.music_field_header}>
                    <h1 className={classes.music_field_title}>Новые треки</h1>
                    <div className={classes.music_field_header_btn}>Все</div>
                </div>
                <div className={classes.music_field_wrp}>

                </div>

            </div>
            <div className={classes.music_field}>
                <div className={classes.music_field_header}>
                    <h1 className={classes.music_field_title}>Подкасты</h1>
                    <div className={classes.music_field_header_btn}>Все</div>
                </div>
                <div className={classes.music_field_wrp}>

                </div>

            </div>
            <div className={classes.music_field}>
                <div className={classes.music_field_header}>
                    <h1 className={classes.music_field_title}>Подкасты - олонхо</h1>
                    <div className={classes.music_field_header_btn}>Все</div>
                </div>
                <div className={classes.music_field_wrp}>

                </div>

            </div>
        </div>
    );
}

export default Music;


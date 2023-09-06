import React, { useEffect, useMemo } from 'react'
import '../../assets/css/main.css';
import classes from "./Music.module.scss";
import { ReactComponent as FakeCompilation } from '../../assets/img/music.svg'

function Music() {

    const templateСompilations = useMemo(() => {
        return <div>
            <FakeCompilation />
            <div className={classes.music_field_item_title}>Мой плейлист</div>
        </div>
    }, [])

    const templatePopulars = useMemo(() => {
        return <div>
            <FakeCompilation />
            <div className={classes.music_field_item_title}>Мой плейлист</div>
        </div>
    }, [])

    const templatePodcasts = useMemo(() => {
        return <div>
            <FakeCompilation />
            <div className={classes.music_field_item_title}>Мой плейлист</div>
        </div>
    }, [])

    const templateMusics = useMemo(() => {
        return <div className={classes.music_field_music_item}>
            <div className={classes.music_field_music_img}>
            </div>
            <div className={classes.music_field_music_title}>Мой плейлист</div>
        </div>
    }, [])

    return (
        <div className={classes.music}>
            <div className={classes.music_field}>
                <div className={classes.music_field_header}>
                    <h1 className={classes.music_field_title}>Сборник</h1>
                    <div className={classes.music_field_header_btn}>Все</div>
                </div>
                <div className={classes.music_field_wrp}>
                    {templateСompilations}
                </div>

            </div>
            <div className={classes.music_field}>
                <div className={classes.music_field_header}>
                    <h1 className={classes.music_field_title}>Популярные альбомы</h1>
                    <div className={classes.music_field_header_btn}>Все</div>
                </div>
                <div className={classes.music_field_wrp}>
                    {templatePopulars}
                </div>

            </div>
            <div className={classes.music_field}>
                <div className={classes.music_field_header}>
                    <h1 className={classes.music_field_title}>Новые треки</h1>
                    <div className={classes.music_field_header_btn}>Все</div>
                </div>
                <div className={classes.music_field_wrp}>
                    {templateMusics}
                </div>

            </div>
            <div className={classes.music_field}>
                <div className={classes.music_field_header}>
                    <h1 className={classes.music_field_title}>Подкасты</h1>
                    <div className={classes.music_field_header_btn}>Все</div>
                </div>
                <div className={classes.music_field_wrp}>
                    {templatePodcasts}
                </div>

            </div>
            <div className={classes.music_field}>
                <div className={classes.music_field_header}>
                    <h1 className={classes.music_field_title}>Подкасты - олонхо</h1>
                    <div className={classes.music_field_header_btn}>Все</div>
                </div>
                <div className={classes.music_field_wrp}>
                    {templatePodcasts}
                </div>

            </div>
        </div>
    );
}

export default Music;


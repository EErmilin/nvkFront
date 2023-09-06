import React, { useEffect, useMemo } from 'react'
import '../../assets/css/main.css';
import classes from "./Music.module.scss";
import { ReactComponent as FakeCompilation } from '../../assets/img/music.svg'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getMusics } from '../../redux/thunks/screens/musics/GetMusics';
import { getPodcasts } from '../../redux/thunks/screens/podcasts/GetPodcasts';


const TAKE = 8;

function Music() {
    const musicsRedux: any = useAppSelector(state => state.screens.musics);
    const podcastsRedux: any = useAppSelector(state => state.screens.podcasts);
    const dispatcher = useAppDispatch()

    const update = React.useCallback(async () => {
        await dispatcher(getMusics({ take: TAKE }));
        await dispatcher(getPodcasts({ take: TAKE }));
    }, [dispatcher]);

    React.useEffect(() => {
        update();
    }, [update]);

    console.log('!!!!!!!')
    console.log(musicsRedux)

    const templatePlaylists = useMemo(() => {
        return musicsRedux?.playlists.map((elem: any, key: number) => {
            return <div>
                {!elem.cover?.url_256 ? <div className={classes.music_field_no_img} /> : <img src={elem.cover?.url_256} className={classes.music_field_img} alt="Logo" />}
                <div className={classes.music_field_item_title}>{elem.name}</div>
            </div>
        })
    }, [musicsRedux])

    const templatePopulars = useMemo(() => {
        return musicsRedux?.albums.map((elem: any, key: number) => {
            return <div>
                {!elem.cover?.url_256 ? <div className={classes.music_field_no_img} /> : <img className={classes.music_field_img} src={elem.cover?.url_256} alt="Logo" />}
                <div className={classes.music_field_item_title}>{elem.name}</div>
            </div>
        })
    }, [musicsRedux])

    const templatePodcasts = useMemo(() => {
        if(!podcastsRedux)return
        return podcastsRedux.map((elem: any, key: number) => {
            return <div>
                {!elem.cover?.url_256 ? <div className={classes.music_field_no_img} /> : <img className={classes.music_field_img} src={elem.cover?.url_256} alt="Logo" />}
                <div className={classes.music_field_item_title}>{elem.name}</div>
            </div>
        })
    }, [podcastsRedux])

    const templatePodcastsCurrent = useMemo(() => {
        return podcastsRedux&&podcastsRedux.length&& podcastsRedux[0].podcastAlbums.map((elem: any, key: number) => {

            return <div>
                {!elem.cover?.url_256 ? <div className={classes.music_field_no_img} /> : <img className={classes.music_field_img} src={elem.cover?.url_256} alt="Logo" />}
                <div className={classes.music_field_item_title}>{elem.name}</div>
            </div>
        })
    }, [podcastsRedux])

    console.log('!!!!!!')
    console.log(podcastsRedux)


    const templateMusics = useMemo(() => {
        if(!musicsRedux)return
        return musicsRedux.songs.map((elem: any, key: number) => {

            return <div className={classes.music_field_music_item}>
                {!elem.cover?.url_256 ? <div className={classes.music_field_music_item_no_img} /> : <img className={classes.music_field_music_item_img} src={elem.cover?.url_256} alt="Logo" />}
                <div className={classes.music_field_music_item_wrp}>
                    <div className={classes.music_field_music_item_title}>{elem.title} </div>
                    <div className={classes.music_field_music_item_name}>{elem.artist.name}</div>
                    <div className={classes.music_field_music_item_btn} />
                </div>
            </div>
        })
    }, [musicsRedux])

    return (
        <div className={classes.music}>
            <div className={classes.music_field}>
                <div className={classes.music_field_header}>
                    <h1 className={classes.music_field_title}>Сборник</h1>
                    <div className={classes.music_field_header_btn}>Все</div>
                </div>
                <div className={classes.music_field_wrp}>
                    {templatePlaylists}
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
                <div className={classes.music_field_wrp_music}>
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
                    {templatePodcastsCurrent}
                </div>

            </div>
        </div>
    );
}

export default Music;


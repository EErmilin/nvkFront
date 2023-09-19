import React, { useEffect, useMemo, useState } from 'react'
import '../../assets/css/main.scss';
import classes from "./Music.module.scss";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getMusics } from '../../redux/thunks/screens/musics/GetMusics';
import { getPodcasts } from '../../redux/thunks/screens/podcasts/GetPodcasts';
import useToggleVisibility from '../../hooks/useToggleVisibility';
import AlbumListModal from '../../components/modals/AlbumListModal/AlbumListModal';
import { useSearchParams } from 'react-router-dom';
import PlaylistItem from './components/PlaylistItem/PlaylistItem';
import MusicItem from './components/MusicItem/MusicItem';
import { useRef } from 'react';


const TAKE = 8;

function Music() {

      /** Модалка  плэйлиста*/
  const [IsShowCurrentModal, setIsShowCurrentModal, closeIsShowCurrentModal] = useToggleVisibility(false)
  
    const musicsRedux: any = useAppSelector(state => state.screens.musics);
    const podcastsRedux: any = useAppSelector(state => state.screens.podcasts);
    const [album, setAlbum] = useState();
    const [type, setType]: any = useState();
    const dispatcher = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams();

    const player = useRef(null)

    const update = React.useCallback(async () => {
        await dispatcher(getMusics({ take: TAKE }));
        await dispatcher(getPodcasts({ take: TAKE }));
    }, [dispatcher]);

    React.useEffect(() => {
        update();
    }, [update]);


    const templateUserRegisterModal = IsShowCurrentModal && (
        <AlbumListModal
          closeModal={closeIsShowCurrentModal}
          btnCancelClick={setIsShowCurrentModal}
          album={album}
          type={type}/>
      )

    const onClick = (item: any, type?: string) => {
        setType(type)
        setAlbum(item)
        setIsShowCurrentModal(true)
    }

        /**Добавляем скролл к нужным полям если он нужен*/
        useEffect(() => {
                let isScroll = searchParams.get("scroll")
    
                if (isScroll==="podcasts") {
                    document.getElementById(`#podcasts`)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    })
                }

        }, [podcastsRedux])
    

    const templatePlaylists = useMemo(() => {
        return musicsRedux?.playlists.map((elem: any, key: number) =>{ return <PlaylistItem playlist={elem} onClick={onClick}></PlaylistItem>})
    }, [musicsRedux])

    const templatePopulars = useMemo(() => {
        return musicsRedux?.albums.map((elem: any, key: number) => {
            return <div onClick={()=>onClick(elem, 'album')} className={classes.music_field_item} key={key}>
                {!elem.cover?.url_256 ? <div className={classes.music_field_no_img} /> : <img className={classes.music_field_img} src={elem.cover?.url_256} alt="Logo" />}
                <div className={classes.music_field_item_title}>{elem.name}</div>
            </div>
        })
    }, [musicsRedux])

    const templatePodcasts = useMemo(() => {
        if (!podcastsRedux) return
        return podcastsRedux.map((elem: any, key: number) => {
            return <div onClick={()=>onClick(elem)} className={classes.music_field_item} key={key}>
                {!elem.cover?.url_256 ? <div className={classes.music_field_no_img}/> : <img className={classes.music_field_img} src={elem.cover?.url_256} alt="Logo" />}
                <div className={classes.music_field_item_title}>{elem.name}</div>
            </div>
        })
    }, [podcastsRedux])

    const templatePodcastsCurrent = useMemo(() => {
        return podcastsRedux && podcastsRedux.length && podcastsRedux[0].podcastAlbums.map((elem: any, key: number) => {
            return <div onClick={()=>onClick(elem)} className={classes.music_field_item} key={key}>
                {!elem.cover?.url_256 ? <div className={classes.music_field_no_img}/> : <img className={classes.music_field_img} src={elem.cover?.url_256} alt="Logo" />}
                <div className={classes.music_field_item_title}>{elem.name}</div>
            </div>
        })
    }, [podcastsRedux])


    const templateMusics = useMemo(() => {
        if (!musicsRedux) return
        return musicsRedux.songs.map((elem: any, key: number) => {
            return <MusicItem item={elem} key={key} player={player}/>
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
            <div className={classes.music_field} id="#podcasts">
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
            {templateUserRegisterModal}
        </div>
    );
}

export default Music;


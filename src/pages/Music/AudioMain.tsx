import React, { useEffect, useMemo, useState } from 'react'
import '../../assets/css/main.scss';
import classes from "./AudioMain.module.scss";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getMusics } from '../../redux/thunks/screens/musics/GetMusics';
import { getPodcasts } from '../../redux/thunks/screens/podcasts/GetPodcasts';
import useToggleVisibility from '../../hooks/useToggleVisibility';
import AlbumListModal from '../../components/modals/AlbumListModal/AlbumListModal';
import { NavLink, useSearchParams } from 'react-router-dom';
import PlaylistItem from './components/PlaylistItem/PlaylistItem';
import MusicItem from './components/MusicItem/MusicItem';
import { useRef } from 'react';
import PopularItem from './components/PopularItem/PopularItem';
import { BsCloudSnowFill } from 'react-icons/bs';
import CurrentPodcastItem from './components/CurrentPodcastItem/CurrentPodcastItem';
import { IPodcastData } from '../../models/Music';
import PodcastItem from './components/PodcastsItem/PodcastItem';

const TAKE = 8;

function AudioMain() {

      /** Модалка  плэйлиста*/
  const [IsShowCurrentModal, setIsShowCurrentModal, closeIsShowCurrentModal] = useToggleVisibility(false)
  
    const musicsRedux: any = useAppSelector(state => state.screens.musics);
    const podcastsRedux: any = useAppSelector(state => state.screens.podcasts);
    const [album, setAlbum] = React.useState<any>(null);
    const [currentPodcast, setCurrentPodcast]= React.useState<IPodcastData | null>(null);
    const [type, setType]: any = useState();
    const dispatcher = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams();
    const [isTinny, setIsTinny] = useState(false)
    const [currentPlayer, setCurrentPlayer] = useState(null)
    const audioRef = useRef(null);


    const update = React.useCallback(async () => {
        await dispatcher(getMusics({ take: TAKE }));
        await dispatcher(getPodcasts({ take: TAKE }));
    }, [dispatcher]);

    React.useEffect(() => {
        update();
    }, [update]);


    const templateAlbumListModal = IsShowCurrentModal && (
        <AlbumListModal
          closeModal={closeIsShowCurrentModal}
          btnCancelClick={setIsShowCurrentModal}
          album={album}
          type={type}
          audioRef={audioRef}
          isTinny={isTinny}
          setIsTinny={setIsTinny}
          setCurrentPlayer={setCurrentPlayer}
          currentPlayer={currentPlayer}/>
      )

    const onClick = (item: any, type?: string) => {
        setType(type)
        setAlbum(item)
        setIsTinny(false)
        setCurrentPlayer(null)
        setIsShowCurrentModal(true)
    }
    const onClickPodcasts = (podcast: IPodcastData) => {
        setCurrentPodcast(podcast)
        //document.getElementById(`#podcast`)?.scrollIntoView({
        //    behavior: "smooth",
        //    block: "start"
        //})
    }


        /**Добавляем скролл к нужным полям если он нужен*/
        useEffect(() => {
            setCurrentPodcast(podcastsRedux[0])
                let isScroll = searchParams.get("scroll")
    
                if (isScroll==="podcasts") {
                    document.getElementById(`#podcasts`)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    })
                }

        }, [podcastsRedux])
    

    const templatePlaylists = useMemo(() => {
        return musicsRedux?.playlists.map((elem: any, key: number) =>{ return <PlaylistItem playlist={elem} onClick={onClick} key={key}/>})
    }, [musicsRedux])

    const templatePopulars = useMemo(() => {
        return musicsRedux?.albums.map((album: any, key: number) => {
            return <PopularItem album={album} onClick={onClick} key={key}/>
        })
    }, [musicsRedux])

    const templatePodcasts = useMemo(() => {
        if (!podcastsRedux) return
        return podcastsRedux.map((podcast: any, key: number) => {
            return <PodcastItem podcast={podcast} key={key} onClickPodcasts={onClickPodcasts}/>
        })
    }, [podcastsRedux])

    const templatePodcastsCurrent = useMemo(() => {
        return currentPodcast && currentPodcast.podcastAlbums?.length ? currentPodcast.podcastAlbums.map((podcast: any, key: number) => {
            return <CurrentPodcastItem podcast={podcast} onClick={onClick} key={key}/>
        }) : null
    }, [currentPodcast])


    const templateMusics = useMemo(() => {
        if (!musicsRedux) return
        return musicsRedux.songs.map((elem: any, key: number) => {
            return <MusicItem item={elem} key={key} onClick={()=>setCurrentPlayer(elem)} audioRef={audioRef} currentPlayer={currentPlayer}/>
        })
    }, [musicsRedux,currentPlayer])


    return (
        <div className={classes.music}>
            <div className={classes.music_field}>
                <div className={classes.music_field_header}>
                    <h1 className={classes.music_field_title}>Сборник</h1>
                    <NavLink to="/audio/playlists" className={classes.music_field_header_btn}>Все</NavLink>
                </div>
                <div className={classes.music_field_wrp}>
                    {templatePlaylists}
                </div>
            </div>
            <div className={classes.music_field}>
                <div className={classes.music_field_header}>
                    <h1 className={classes.music_field_title}>Популярные альбомы</h1>
                    <NavLink to="/audio/albums" className={classes.music_field_header_btn}>Все</NavLink>
                </div>
                <div className={classes.music_field_wrp}>
                    {templatePopulars}
                </div>
            </div>
            <div className={classes.music_field}>
                <div className={classes.music_field_header}>
                    <h1 className={classes.music_field_title}>Новые треки</h1>
                    <NavLink to="/audio/tracks" className={classes.music_field_header_btn}>Все</NavLink>
                </div>
                <div className={classes.music_field_wrp_music}>
                    {templateMusics}
                </div>

            </div>
            <div className={classes.music_field} id="#podcasts">
                <div className={classes.music_field_header}>
                    <h1 className={classes.music_field_title}>Подкасты</h1>
                    <NavLink className={classes.music_field_header_btn} to="/audio/podcasts">Все</NavLink>
                </div>
                <div className={classes.music_field_wrp}>
                    {templatePodcasts}
                </div>

            </div>
            <div className={classes.music_field} id="#podcast">
                <div className={classes.music_field_header}>
                    <h1 className={classes.music_field_title}>Подкасты - {currentPodcast?.name}</h1>
                    <NavLink className={classes.music_field_header_btn} to={`/audio/podcasts/${currentPodcast?.id}`}>Все</NavLink>
                </div>
                <div className={classes.music_field_wrp}>
                    {templatePodcastsCurrent}
                </div>
            </div>
            {templateAlbumListModal}
        </div>
    );
}

export default AudioMain;


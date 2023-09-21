import { useEffect, useMemo, useRef, useState } from 'react';
import ModalWithBackground from '../ModalWithBackground/ModalWithBackground';
import classes from './AlbumListModal.module.scss';
import React from "react";
import TransitionContainer from '../../TransitionContainer/TransitionContainer';
import { ISong, ISongPodcast } from '../../../models/Music';
import { getUpdateClient } from '../../../requests/updateHeaders';
import { AlBUM_SONGS, ARTIST_SONGS, PLAYLIST_SONGS } from '../../../gql/query/music/Music';
import { PODCAST_ALBUM } from '../../../gql/query/podcast/Podcast';
import MusicItem from './components/MusicItem/MusicItem';
import SearchInput from '../../UI/areas/CustomSelect/SearchInput';
import { PlayerTinny } from '../../MusicPlayer/PlayerTinny/PlayerTinny';


const AlbumListModal = ({ closeModal, btnCancelClick, album, type, currentPlayer, setCurrentPlayer, isTinny, setIsTinny, audioRef }: any) => {

    const [musics, setMusics] = React.useState<any>(null);





    React.useEffect(() => {
        (async () => {
            try {
                const client = await getUpdateClient();
                const response = await client.query({
                    query:
                        type === 'album'
                            ? AlBUM_SONGS
                            : type === 'playlist'
                                ? PLAYLIST_SONGS
                                : type === 'artist'
                                    ? ARTIST_SONGS
                                    : PODCAST_ALBUM,
                    variables: {
                        id: album.id,
                    },
                });
                switch (type) {
                    case 'album':
                        setMusics(
                            response.data.album.songs
                                ?.filter((item2: ISong) => Boolean(item2.url))
                                ?.map((item: ISong) => {
                                    return {
                                        id: item.id,
                                        url: item.url,
                                        title: item.title,
                                        artist: item.artist?.name,
                                        artwork: item.artwork?.url_256,
                                        type: item?.media ? 'hls' : 'default',
                                    };
                                }),
                        );
                        break;
                    case 'playlist':
                        setMusics(
                            response.data.playlist.songs
                                ?.filter((item2: { song: ISong }) => Boolean(item2.song.url))
                                ?.map((item: { song: ISong }) => {
                                    return {
                                        id: item.song.id,
                                        url: item.song.url,
                                        title: item.song.title,
                                        artist: item.song.artist?.name,
                                        artwork: item.song.artwork?.url_256,
                                        type: item.song?.media ? 'hls' : 'default',
                                    };
                                }),
                        );
                        break;
                    case 'artist':
                        setMusics(
                            response.data.artist.songs
                                ?.filter((item2: ISong) => Boolean(item2.url))
                                ?.map((item: ISong) => {
                                    return {
                                        id: item.id,
                                        url: item.url,
                                        title: item.title,
                                        artist: item.artist?.name,
                                        artwork: item.artwork?.url_256,
                                        type: item?.media ? 'hls' : 'default',
                                    };
                                }),
                        );
                        break;
                    case 'podcast':
                        setMusics(
                            response.data.podcastAlbum.podcastEpisode
                                ?.filter((item2: ISongPodcast) => Boolean(item2.url))
                                ?.map((item: ISongPodcast) => {
                                    return {
                                        id: item.id,
                                        url: item.url,
                                        title: item.title,
                                        artist: item.podcastAlbum?.name,
                                        artwork: item.artwork?.url_256,
                                        type: item?.media ? 'hls' : 'default',
                                    };
                                }),
                        );
                        break;

                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, [album.id, type]);




    const templateMusics = useMemo(() => {
        if (!musics) return
        return <>
            <div className={classes.modal_music_title}>Плейлист: {album.name}</div>
            {musics.map((item: any, key: number) => {
                return <MusicItem item={item} currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} key={key} audioRef={audioRef} type={type}></MusicItem>
            })}
        </>
    }, [musics, currentPlayer])

    const blocks = [
        {
            title: "Текущий плейлист",
            block: templateMusics,
        },
        {
            title: "Мой плейлист",
            block: <div />
        },

    ]


    if (isTinny && audioRef.current && audioRef.current.audio && audioRef.current.audio.current&& audioRef.current.audio.current.currentTime) {
        return <div className={classes.tinny}><PlayerTinny music={currentPlayer} timeJump={audioRef?.current?.audio.current.currentTime}></PlayerTinny></div>

    }

    const onClose = () => {
        if (currentPlayer) {
            return setIsTinny(true)
        } else {
            btnCancelClick()
        }
    }



    return (
        <ModalWithBackground
            // closeModal={onClose}
            btnCancelClick={onClose}
            width={750}
        >
            <div className={classes.modal}>
                <div className={classes.modal_search_wrp}>
                    <SearchInput></SearchInput>
                </div>
                <TransitionContainer
                    withTitleBorder={true}
                    classNameTitlesWrap={classes.favorites_titles}
                    blocks={blocks}
                    classNameBody={classes.modal_music_wrp}>

                </TransitionContainer>

            </div>
        </ModalWithBackground>
    );
};

export default AlbumListModal;


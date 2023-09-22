import { Route, Routes, useNavigate, useParams } from "react-router-dom"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useAppDispatch } from "../../../../redux/hooks"
import { getMusics } from "../../../../redux/thunks/screens/musics/GetMusics"
import { getPodcasts } from "../../../../redux/thunks/screens/podcasts/GetPodcasts"
import { getUpdateClient } from "../../../../requests/updateHeaders"
import { SONG_ALBUMS, SONG_MUSICS, SONG_PLAYLISTS } from "../../../../gql/query/music/Music"
import PlaylistItem from "../PlaylistItem/PlaylistItem"
import classes from "./AllPage.module.scss";
import useToggleVisibility from "../../../../hooks/useToggleVisibility"
import AlbumListModal from "../../../../components/modals/AlbumListModal/AlbumListModal"
import { PODCASTS, PODCAST_ALL_ALBUMS } from '../../../../gql/query/podcast/Podcast';
import MusicItem from "../MusicItem/MusicItem"

function AllPage({ routes }) {
  const navigate = useNavigate()
  const urlParams = useParams()
  const [isTinny, setIsTinny] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState(null)
  const audioRef = useRef(null);
  const [album, setAlbum] = useState();
  const [type, setType]: any = useState();
  const dispatcher = useAppDispatch()
  const [IsShowCurrentModal, setIsShowCurrentModal, closeIsShowCurrentModal] = useToggleVisibility(false)

  const [data, setData]: any = useState()

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
      currentPlayer={currentPlayer} />
  )

  const update = React.useCallback(
    async () => {
      try {
        const client = await getUpdateClient();
        const variables = urlParams.id ? { podcastId: Number(urlParams.id) } : {}
        const response = await client.query({
          query: urlParams.id ? PODCAST_ALL_ALBUMS : urlParams['*'] === "tracks" ? SONG_MUSICS : urlParams['*'] === "podcasts" ? PODCASTS : urlParams['*'] === "playlists" ? SONG_PLAYLISTS : SONG_ALBUMS,
          variables: variables
        });


        if (urlParams.id) {
          setData(response.data.podcast.podcastAlbums);
        } else if (urlParams['*'] === "playlists") {
          setData(response.data.musics.playlists);
        } else if (urlParams['*'] === "podcasts") {
          setData(response.data.podcasts);
        } else if (urlParams['*'] === "tracks") {
          setData(response.data.musics.songs);
        } else {
          setData(response.data.musics.albums);
        }
        return response;
      } catch (e) {
        console.log(e);
      }
    },
    [urlParams],
  );


  const onClick = (item: any, type?: string) => {
    setType(type)
    setAlbum(item)
    setIsTinny(false)
    setCurrentPlayer(null)
    setIsShowCurrentModal(true)
  }

  const templatePlaylists = useMemo(() => {
    if (urlParams.id) {
      return data?.map((elem: any, key: number) => { return <PlaylistItem playlist={elem} onClick={() => onClick(elem, "podcast")} key={key} /> })
    }
    if (urlParams['*'] === "playlists") {
      return data?.map((elem: any, key: number) => { return <PlaylistItem playlist={elem} onClick={() => onClick(elem, "playlist")} key={key} /> })
    }
    if (urlParams['*'] === "podcasts") {
      return data?.map((elem: any, key: number) => { return <PlaylistItem playlist={elem} onClick={() => navigate(`${elem.id}`)} key={key} /> })
    }
    if (urlParams['*'] === "tracks") {
      return data?.map((elem: any, key: number) => { return <MusicItem item={elem} key={key} onClick={() => setCurrentPlayer(elem)} audioRef={audioRef} currentPlayer={currentPlayer} /> })
    }
    return data?.map((elem: any, key: number) => { return <PlaylistItem playlist={elem} onClick={() => onClick(elem, "album")} key={key} /> })
  }, [data, currentPlayer])


  React.useEffect(() => {
    update();
  }, [update]);


  return (
    <div className={classes.all_wrp}>
      {templatePlaylists}
      {templateAlbumListModal}
    </div>
  )
}

export default AllPage
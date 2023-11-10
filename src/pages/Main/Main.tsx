

import classes from "./Main.module.scss";
import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as NvkLogo } from '../../assets/img/nvk.svg'
import { ReactComponent as Mamont } from '../../assets/img/mamont.svg'
import { ReactComponent as Yakutia } from '../../assets/img/yakutia.svg'
import { ReactComponent as Teteam } from '../../assets/img/teteam.svg'
import { ReactComponent as SeriesButton } from '../../assets/img/seriesButton.svg'
import { ReactComponent as PodcastsButton } from '../../assets/img/podcastsButton.svg'
import { ReactComponent as MusicButton } from '../../assets/img/musicButton.svg'
import { ReactComponent as ShowsButton } from '../../assets/img/showsButton.svg'
import { ReactComponent as FilmsButton } from '../../assets/img/filmsButton.svg'
import { ReactComponent as CartoonsButton } from '../../assets/img/cartoonsButton.svg'
import NewsItem from "./components/NewsItem/NewsItem";
import MainSlider from "./components/MainSlider/MainSlider";
import ShowItem from "./components/ShowItem/ShowItem";
import LiveItem from "./components/LiveItem/LiveItem";
import { fetchStreams } from "../LiveStream/utils";
import { useNavigate } from "react-router-dom";
import { IPost } from "../../models/Post";
import { ApolloError } from "@apollo/client";
import { getUpdateClient } from "../../requests/updateHeaders";
import { POSTS } from "../../gql/query/posts/Post";
import { useMemo } from "react";



function Main({ }) {

    const [streams, setStreams]: any = useState([])
    const [takeNews, setTakeNews] = useState(4)
    const [posts, setPosts] = React.useState<IPost[]>([]);
    const navigate = useNavigate()
    useEffect(() => {
        (async function () {
            try {
                const streams = await fetchStreams();
                setStreams(streams)
            } catch (e) {
                console.log('fetchStreamsError:', e);
            }
        })();
    }, []);


    const refresh = React.useCallback(async (takeNews: number) => {

        try {
            const client = await getUpdateClient();
            let response = await client.query({
                query: POSTS,
                variables:
                { 
                    take: takeNews
                }
            });

            setPosts(response.data.posts);
        } catch (e) {
            if (e instanceof ApolloError) {
            }
        }
    }, []);

    React.useEffect(() => {
        refresh(takeNews);
    }, [refresh, takeNews]);




    const templateNews = useMemo(() => {
        return posts.map((post: any, key) => <NewsItem post={post} key={key}/>)
    }, [posts])

    return (
        <div className={classes.main}>
            <div className={classes.main_links}>
            <div className={classes.main_links_slider}
                ><MainSlider/></div>
                <div className={classes.main_links_wrp}>
                    <div className={classes.main_links_item} onClick={() => navigate("/live?id=1")}>
                        <NvkLogo />
                    </div>
                    <div className={classes.main_links_item} onClick={() => navigate("/live?id=2")}>
                        <Mamont />
                    </div>
                    <div className={classes.main_links_item} onClick={() => navigate("/live?id=3")}>
                        <Yakutia />
                    </div>
                    <div className={classes.main_links_item} onClick={() => navigate("/live?id=4")}>
                        <Teteam />
                    </div>
                </div>
            </div>
           <div className={classes.main_videos}>
                <h1 className={classes.main_title}>Видео</h1>
                <div className={classes.main_videos_wrp}>
                    <div className={classes.main_videos_item} onClick={() => navigate("/serials")}>
                        <SeriesButton style={{ height: 199 }} />
                    </div>
                    <div className={classes.main_videos_item} onClick={() => navigate("/movies")}>
                        <FilmsButton />
                    </div>
                    <div className={classes.main_videos_item} onClick={() => navigate("/live")}>
                        <ShowsButton />
                    </div>
                   {// <div className={classes.main_videos_item}>
                    //    <CartoonsButton />
                    //</div>
                }
                </div>
    </div>
            <div className={classes.main_musics}>
                <h1 className={classes.main_title}>Музыка</h1>
                <div className={classes.main_videos_wrp}>
                    <div className={classes.main_musics_item}>
                        <PodcastsButton style={{ height: 199 }} onClick={() => navigate("/audio?scroll=podcasts")}/>
                    </div>
                    <div className={classes.main_musics_item} onClick={() => navigate("/audio")}>
                        <MusicButton />
                    </div>
                </div>
            </div>
            <div className={classes.main_news}>
                <h1 className={classes.main_title}>Новости</h1>
                <div className={classes.main_news_wrp}>
                    {templateNews}
                </div>
                <div className={classes.main_news_btn_wrp}>
                    <button className={classes.main_news_btn} onClick={()=>setTakeNews(takeNews + 4)}>Смотреть еще</button>
                </div>
            </div>
            {streams && streams.length && <div className={classes.main_live}>
                <h1 className={classes.main_title}>Прямые эфиры</h1>
                <div className={classes.main_live_wrp}>
                    {streams.slice(0, 4).map((stream: any, key) => <LiveItem stream={stream} key={key}/>)}
                </div>
                <div className={classes.main_news_btn_wrp}>
                    <button className={classes.main_news_btn} onClick={()=>{navigate("/live")}}>Смотреть еще</button>
                </div>
            </div>}
  {   /**        <div className={classes.main_top}>
                <div className={classes.main_top_header}>
                    <h1 className={classes.main_top_title}>Топ 5</h1>
                    <div className={classes.main_top_header_btn}>Все</div>
                </div>
                <div className={classes.main_top_wrp}>
                    <ShowItem></ShowItem>
                    <ShowItem></ShowItem>
                    <ShowItem></ShowItem>
                    <ShowItem></ShowItem>
                    <ShowItem></ShowItem>
                </div>
            </div>
            <div className={classes.main_forUser}>
                <div className={classes.main_forUser_header}>
                    <h1 className={classes.main_forUser_title}>Для вас</h1>
                    <div className={classes.main_forUser_header_btn}>Все</div>
                </div>
                <div className={classes.main_forUser_wrp}>
                    <ShowItem></ShowItem>
                    <ShowItem></ShowItem>
                    <ShowItem></ShowItem>
                    <ShowItem></ShowItem>
                    <ShowItem></ShowItem>
                </div>
            </div>*/}
        </div>
    )
}

export default Main
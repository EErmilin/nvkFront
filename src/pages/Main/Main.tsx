

import classes from "./Main.module.scss";
import React from 'react';
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

function Main({ }) {

    return (
        <div className={classes.main}>
            <div className={classes.main_links}>
                <div className={classes.main_links_slider}></div>
                <div className={classes.main_links_wrp}>
                    <div className={classes.main_links_item}>
                        <NvkLogo />
                    </div>
                    <div className={classes.main_links_item}>
                        <Mamont />
                    </div>
                    <div className={classes.main_links_item}>
                        <Yakutia />
                    </div>
                    <div className={classes.main_links_item}>
                        <Teteam />
                    </div>
                </div>
            </div>
            <div className={classes.main_videos}>
                <h1 className={classes.main_title}>Видео</h1>
                <div className={classes.main_videos_wrp}>
                    <div className={classes.main_videos_item}>
                        <SeriesButton style={{ height: 199 }} />
                    </div>
                    <div className={classes.main_videos_item}>
                        <FilmsButton />
                    </div>
                    <div className={classes.main_videos_item}>
                        <ShowsButton  />
                    </div>
                    <div className={classes.main_videos_item}>
                        <CartoonsButton  />
                    </div>
                </div>
            </div>
            <div className={classes.main_musics}>
                <h1 className={classes.main_title}>Музыка</h1>
                <div className={classes.main_videos_wrp}>
                    <div className={classes.main_musics_item}>
                        <PodcastsButton style={{ height: 199 }} />
                    </div>
                    <div className={classes.main_musics_item}>
                        <MusicButton />
                    </div>
                </div>
            </div>
            <div className={classes.main_news}>
                <h1 className={classes.main_title}>Новости</h1>
                <div className={classes.main_news_wrp}>
                    <NewsItem/>
                    <NewsItem/>
                    <NewsItem/>
                    <NewsItem/>
                </div>
            </div>
        </div>
    )
}

export default Main
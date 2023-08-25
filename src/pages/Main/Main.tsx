import React, { useEffect } from 'react'
import '../../assets/css/main.css';



function Main() {

    return (
        <div className="slim-container">
            <div >
                <div className="carousel-block">
                    <div className="carousel-wrapper" id="carousel-wrapper">
                        <div className="carousel-content" id="carousel-content">
                            <div className="carousel-item">
                                <div className="item__img">
                                    <img src="../../assets/img/crsl-1.png" alt="" />
                                </div>
                                <div className="item__name">Главное</div>
                            </div>
                            <div className="carousel-item">
                                <div className="item__img">
                                    <img src="../../assets/img/crsl-2.png" alt=""/>
                                </div>
                                <div className="item__name">Анонсы</div>
                            </div>
                            <div className="carousel-item">
                                <div className="item__img">
                                    <img src="../../assets/img/crsl-3.png" alt="" />
                                </div>
                                <div className="item__name">Tatia_12</div>
                            </div>
                            <div className="carousel-item">
                                <div className="item__img">
                                    <img src="../../assets/img/crsl-4.png" alt="" />
                                </div>
                                <div className="item__name">MTC</div>
                            </div>
                            <div className="carousel-item">
                                <div className="item__img">
                                    <img src="../../assets/img/crsl-1.png" alt=""/>
                                </div>
                                <div className="item__name">Главное</div>
                            </div>
                            <div className="carousel-item">
                                <div className="item__img">
                                    <img src="../../assets/img/crsl-2.png" alt=""/>
                                </div>
                                <div className="item__name">Анонсы</div>
                            </div>
                            <div className="carousel-item">
                                <div className="item__img">
                                    <img src="../../assets/img/crsl-3.png" alt=""/>
                                </div>
                                <div className="item__name">Tatia_12</div>
                            </div>
                            <div className="carousel-item">
                                <div className="item__img">
                                    <img src="../../assets/img/crsl-4.png" alt=""/>
                                </div>
                                <div className="item__name">MTC</div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-btn__prev" id="carousel-btn__prev"></div>
                    <div className="carousel-btn__next" id="carousel-btn__next"></div>
                </div>
                <div className="feed-block style__flexbox style__flexdirection-column">

                    <div className="feed-item">
                        <div className="feed-item__img">
                            <div className="feed-img__counter">
                                <span>1/3</span>
                            </div>
                            <img src="../../assets/img/feed-1.png" alt="" />
                        </div>
                        <div className="feed-item__info style__flexbox style__flex-jc-sb style__flex-ai-c">
                            <div className="info-author style__flexbox style__flex-ai-c">
                                <div className="author-photo">
                                    <img src="../../assets/img/d1a5c7f78fc2cecc047737b4dbc878b5.png" alt="author" />
                                </div>
                                <div className="author-name">Mark_Starostin13</div>
                                <div className="author-subscribe">В подписках</div>
                            </div>
                            <div className="info-bookmark"></div>
                        </div>
                        <div className="feed-item__content">
                            <div className="content-text">
                                С другой стороны рамки и место обучения кадров требуют от нас анализа существенных финансовых и административных условий. Разнообразный и  <a className="showmore" href="javascript:void(0)">ещё...</a>
                            </div>
                            <div className="content-viewcomments">
                                <a href="#" className="view-text">Смотреть комментарии</a> (<span className="view-counter">11</span>)
                            </div>
                        </div>
                        <div className="content-date">11 ноября 2022</div>
                    </div>

                    <div className="feed-item">
                        <div className="feed-item__img">
                            <div className="feed-img__counter">
                                <span>1/3</span>
                            </div>
                            <img src="../../assets/img/Rectangle_16.png" alt="" />
                        </div>
                        <div className="feed-item__info style__flexbox style__flex-jc-sb style__flex-ai-c">
                            <div className="info-author style__flexbox style__flex-ai-c">
                                <div className="author-photo">
                                    <img src="../../assets/img/5f0debde6a1f33efabcffbead697cc75.jpg" alt="author" />
                                </div>
                                <div className="author-name">NVK sakha</div>
                                <div className="author-subscribe">В подписках</div>
                            </div>
                            <div className="info-bookmark filled"></div>
                        </div>
                        <div className="feed-item__content">
                            <div className="content-text">
                                С другой стороны рамки и место обучения кадров требуют от нас анализа существенных финансовых и административных условий. Разнообразный и  <a className="showmore" href="javascript:void(0)">ещё...</a>
                            </div>
                            <div className="content-viewcomments">
                                <a href="#" className="view-text">Смотреть комментарии</a> (<span className="view-counter">11</span>)
                            </div>
                        </div>
                        <div className="content-date">11 ноября 2022</div>
                    </div>

                    <div className="feed-item">
                        <div className="feed-item__img">
                            <img src="../../assets/img/Rectangle_16_2.png" alt="" />
                        </div>
                        <div className="feed-item__info style__flexbox style__flex-jc-sb style__flex-ai-c">
                            <div className="info-author style__flexbox style__flex-ai-c">
                                <div className="author-photo">
                                    <img src="../../assets/img/3c6646022a18ad8353e3d52fdda6c2da.png" alt="author" />
                                </div>
                                <div className="author-name">Yan_Zor0</div>
                                <div className="author-subscribe">В подписках</div>
                            </div>
                            <div className="info-bookmark filled"></div>
                        </div>
                        <div className="feed-item__content">
                            <div className="content-text">
                                С другой стороны рамки и место обучения кадров требуют от нас анализа существенных финансовых и административных условий. Разнообразный и  <a className="showmore" href="javascript:void(0)">ещё...</a>
                            </div>
                            <div className="content-viewcomments">
                                <a href="#" className="view-text">Смотреть комментарии</a> (<span className="view-counter">11</span>)
                            </div>
                        </div>
                        <div className="content-date">11 ноября 2022</div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Main;


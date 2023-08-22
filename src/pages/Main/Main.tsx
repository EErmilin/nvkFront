import React, { useEffect } from 'react'
import '../../assets/css/main.css';
import Header from '../../components/Header/Header';


function Main() {




    return (
        <div>
            <div className="slim-container style__flexbox style__flexdirection-column">
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


            <footer>
                <div className="footer-container">
                    <div className="footer-upper style__flexbox style__flex-jc-sb style__flex-ai-s">
                        <div className="footer-upper__contacts style__flexbox style__flexdirection-column">
                            <a href="/" className="logotype">
                                <img src="../../assets/img/logotype.svg" alt="logotype" />
                            </a>
                            <ul className="footer-contacts__data style__flexbox style__flexdirection-column">
                                <li><a href="mailto:priemnvk2015@yandex.ru">priemnvk2015@yandex.ru</a></li>
                                <li><a href="tel:+74112420088">+7 4112 42-00-88</a></li>
                            </ul>
                            <ul className="footer-contacts__social style__flexbox">
                                <li><a href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                        <g clip-path="url(#clip0_2644_3510)">
                                            <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.95431 31.0457 0 20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40Z" fill="#BBBBBB" />
                                            <path d="M30.9981 14.5244C30.7324 13.5353 29.9499 12.7529 28.9608 12.4872C27.1746 12 19.9852 12 19.9852 12C19.9852 12 12.7959 12.0148 11.0096 12.5019C10.0205 12.7677 9.23813 13.5501 8.9724 14.5392C8.5 16.3254 8.5 20.0603 8.5 20.0603C8.5 20.0603 8.5 23.7952 8.98716 25.5963C9.25289 26.5854 10.0353 27.3678 11.0244 27.6335C12.8107 28.1207 20 28.1207 20 28.1207C20 28.1207 27.1893 28.1207 28.9756 27.6335C29.9647 27.3678 30.7471 26.5854 31.0128 25.5963C31.5 23.81 31.5 20.0603 31.5 20.0603C31.5 20.0603 31.4852 16.3254 30.9981 14.5244Z" fill="white" />
                                            <path d="M17.6953 23.5153L23.6594 20.0609L17.6953 16.6064V23.5153Z" fill="#BBBBBB" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2644_3510">
                                                <rect width="40" height="40" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </a></li>
                                <li><a href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                        <circle cx="20" cy="20" r="20" fill="#BBBBBB" />
                                        <path d="M21.1173 27.2241C13.6855 27.2241 9.17705 22.0682 9 13.5H12.7643C12.8816 19.7944 15.7442 22.4614 17.9398 23.01V13.5H21.5466V18.9318C23.6639 18.6971 25.8801 16.2267 26.6253 13.5H30.1765C29.6073 16.8525 27.1945 19.323 25.49 20.342C27.1966 21.1665 29.9408 23.323 31 27.2241H27.0978C26.2743 24.6168 24.2548 22.5973 21.5486 22.3224V27.2241H21.1173Z" fill="white" />
                                    </svg>
                                </a></li>
                                <li><a href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                        <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.95431 31.0457 0 20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40Z" fill="#BBBBBB" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.05564 19.7889C14.886 17.2487 18.7739 15.574 20.7192 14.7649C26.2734 12.4547 27.4275 12.0534 28.1798 12.0402C28.3452 12.0373 28.7151 12.0783 28.9548 12.2727C29.1571 12.4369 29.2128 12.6587 29.2394 12.8143C29.266 12.97 29.2992 13.3246 29.2728 13.6017C28.9719 16.7641 27.6695 24.4386 27.0069 27.9806C26.7266 29.4794 26.1746 29.9819 25.6401 30.0311C24.4787 30.138 23.5967 29.2636 22.4718 28.5262C20.7116 27.3723 19.7171 26.654 18.0085 25.528C16.0339 24.2268 17.3139 23.5116 18.4393 22.3428C18.7338 22.0369 23.8511 17.3823 23.9501 16.9601C23.9625 16.9072 23.974 16.7104 23.8571 16.6065C23.7401 16.5025 23.5675 16.5381 23.443 16.5663C23.2664 16.6064 20.4544 18.465 15.0069 22.1423C14.2087 22.6904 13.4857 22.9574 12.838 22.9434C12.1239 22.928 10.7502 22.5397 9.72904 22.2077C8.47654 21.8006 7.48108 21.5853 7.56776 20.8939C7.61291 20.5337 8.10887 20.1654 9.05564 19.7889Z" fill="white" />
                                    </svg>
                                </a></li>
                            </ul>
                        </div>
                        <div className="footer-upper__menu style__flexbox">
                            <ul className="footer-menu style__flexbox style__flexdirection-column">
                                <li className="menu-title"><a href="">Новости</a></li>
                                <li><a href="">Главное</a></li>
                                <li><a href="">Общество</a></li>
                                <li><a href="">Политика</a></li>
                            </ul>
                            <ul className="footer-menu style__flexbox style__flexdirection-column">
                                <li className="menu-title"><a href="">О компании</a></li>
                                <li><a href="">Главное</a></li>
                                <li><a href="">Общество</a></li>
                                <li><a href="">Политика</a></li>
                            </ul>
                            <ul className="footer-menu style__flexbox style__flexdirection-column">
                                <li className="menu-title"><a href="">Смотреть</a></li>
                                <li><a href="">Главное</a></li>
                                <li><a href="">Общество</a></li>
                                <li><a href="">Политика</a></li>
                            </ul>
                            <ul className="footer-menu style__flexbox style__flexdirection-column">
                                <li className="menu-title"><a href="">Услуги</a></li>
                                <li><a href="">Главное</a></li>
                                <li><a href="">Общество</a></li>
                                <li><a href="">Политика</a></li>
                            </ul>
                            <ul className="footer-menu style__flexbox style__flexdirection-column">
                                <li className="menu-title"><a href="">Сервисы</a></li>
                                <li><a href="">Главное</a></li>
                                <li><a href="">Общество</a></li>
                                <li><a href="">Политика</a></li>
                            </ul>
                            <ul className="footer-menu style__flexbox style__flexdirection-column">
                                <li className="menu-title"><a href="">Другое</a></li>
                                <li><a href="">Главное</a></li>
                                <li><a href="">Общество</a></li>
                                <li><a href="">Политика</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-middle style__flexbox">
                        <div className="footer-middle__text style__flexbox style__flexdirection-column">
                            <div className="text">Мобильное приложение “НВК” - самый удобный способ, как провести свободное время</div>
                            <div className="app-list style__flexbox">
                                <a href=""><img src="../../assets/img/apple.png" alt="" /></a>
                                <a href=""><img src="../../assets/img/google-play.png" alt="" /></a>
                            </div>
                        </div>
                        <div className="footer-middle__qr style__flexbox style__flexdirection-column style__flex-ai-c">
                            <img src="../../assets/img/qr-code.png" alt="qr" />
                                <span>Наведите камеру</span>
                        </div>
                    </div>
                    <div className="footer-down style__flexbox style__flex-jc-sb style__flex-ai-c">
                        <div className="copyright">© 2010-2022 ГБУ РС(Я) НВК «Саха». Все права защищены. <a href="">Условия использования</a>, <a href="">Политика конфиденциальности</a></div>
                        <div className="developer">Made by <a href="">Qwantum</a></div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Main;


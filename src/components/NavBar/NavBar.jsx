import { useEffect, useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import classes from "./NavBar.module.scss";


function NavBar() {
    const page = useParams();


    /** Масив ссылок */
    const templateLinks = useMemo(() => {
        let arrLinks = [
            { link: "profile", title: "Редактировать профиль" },
            { link: "changePassword", title: "Сменить пароль" },
            { link: "support", title: "Мои хэштеги" },
            { link: "settings", title: "Настройки" },
            { link: "payment", title: "Платежные данные" },
            { link: "hashtags", title: "Тех.поддержка" },
            { link: "favorites", title: "Избранное" },
            { link: "blog", title: "Стать блогером" },
        ]

        return arrLinks.map((elem, id) => {
            let activePage = page['*']
            activePage = activePage.split("/")[0]
            let currentRoute = elem.link.split('/')[0]
            return (
                <li
                    className={[classes.list_item, (currentRoute === activePage ? classes.list_item_active : '')].join(' ')}
                    key={id} >
                    <NavLink
                        className={classes.link}
                        to={`/personal-area/${elem.link}`}
                    >
                        <p>{elem.title}</p>
                    </NavLink>
                </li>
            )

        })
    }, [page['*']])


    return (
        <div className={classes.wrap}>
            <div className={classes.links}>
                <ul className={classes.list}>
                    {templateLinks}
                </ul>
            </div>
        </div>
    )
}

export default NavBar
import { useEffect, useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import classes from "./NavBar.module.scss";


function NavBar() {
    const page = useParams();
    const user = useAppSelector(state => state.user.data);

    console.log('@@@@@@@@@@@@@')
    console.log(user)

    /** Масив ссылок */
    const templateLinks = useMemo(() => {
        let arrLinks = [
            { link: "/personal-area/profile", title: "Редактировать профиль" },
            { link: "/personal-area/changePassword", title: "Сменить пароль" },
           // { link: "hashtags", title: "Мои хэштеги" },
            { link: "/personal-area/settings", title: "Настройки" },
          //  { link: "payment", title: "Платежные данные" },
            { link: "/personal-area/support", title: "Тех.поддержка" },
            { link: "/personal-area/favorites", title: "Избранное" },
            { link: user.isAuthor  ? `/blog/${user.author.id}` : "/personal-area/blog", title: !user.isAuthor  ? "Стать блогером": "Мои посты" },
        ]

        return arrLinks.map((elem, id) => {
            let activePage = page['*']
            activePage = activePage.split("/")[0]
            let currentRoute = elem.link.split('/')[2]
            return (
                <li
                    className={[classes.list_item].join(' ')}
                    key={id} >
                    <NavLink
                        className={[(currentRoute == activePage ? classes.list_item_active : classes.list_item_noactive)].join(' ')}
                        to={elem.link}
                    >
                        {elem.title}
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
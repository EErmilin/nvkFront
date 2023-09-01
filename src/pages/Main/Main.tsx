

import classes from "./Main.module.scss";
import React from 'react';
import { ReactComponent as NvkLogo } from '../../assets/img/nvk.svg'
import { ReactComponent as Mamont } from '../../assets/img/mamont.svg'
import { ReactComponent as Yakutia } from '../../assets/img/yakutia.svg'
import { ReactComponent as Teteam } from '../../assets/img/teteam.svg'
function Main({ }) {



    return (
        <div className={classes.main}>

<NvkLogo/>
<Mamont />
<Yakutia/>
<Teteam />
        </div>
    )
}

export default Main

//<h1>Видео</h1>
//<h1>Музыка</h1>
//<h1>Новости</h1>
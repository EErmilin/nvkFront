
import classes from "./HashtagBtn.module.scss";
import { Button } from 'antd';


interface HashtagBtnProps {
    hashtag: string
}


function HashtagBtn ({hashtag} : HashtagBtnProps ){



    return (
            <Button className={classes.btn}>{hashtag}</Button>

    )
}

export default HashtagBtn
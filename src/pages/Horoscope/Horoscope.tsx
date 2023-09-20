

import classes from "./Horoscope.module.scss";
import React, { useMemo, useState } from 'react';
import { HOROSCOPE } from '../../gql/query/horoscopes/Horoscopes';
import { IZodiacPeriod, IHoroscope } from '../../models/Horoscope';
import { getUpdateClient } from '../../requests/updateHeaders';
import { zodiacPeriods, zodiacNameFind } from '../../helpers/horoscopeHelpers';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useAppSelector } from "../../redux/hooks";
import moment from "moment";
import 'moment/locale/ru';
import { ReactComponent as Lion } from '../../assets/img/zodiacs/leo.svg'
import { ReactComponent as Aquarius } from '../../assets/img/zodiacs/aquarius.svg'
import { ReactComponent as Aries } from '../../assets/img/zodiacs/aries.svg'
import { ReactComponent as Cancer } from '../../assets/img/zodiacs/cancer.svg'
import { ReactComponent as Capricorn } from '../../assets/img/zodiacs/capricorn.svg'
import { ReactComponent as Gemini } from '../../assets/img/zodiacs/gemini.svg'
import { ReactComponent as Libra } from '../../assets/img/zodiacs/libra.svg'
import { ReactComponent as Pisces } from '../../assets/img/zodiacs/pisces.svg'
import { ReactComponent as Sagittarius } from '../../assets/img/zodiacs/sagittarius.svg'
import { ReactComponent as Scorpio } from '../../assets/img/zodiacs/scorpio.svg'
import { ReactComponent as Taurus } from '../../assets/img/zodiacs/taurus.svg'
import { ReactComponent as Virgo } from '../../assets/img/zodiacs/virgo.svg'
moment().locale('ru')


const getHoroscopeIcon = (zodiac: string) => {
    let icon;
    switch (zodiac) {
        case 'Aquarius':
            icon = <Aquarius />
            break;
        case 'Aries':
            icon = <Aries />
            break;
        case 'Cancer':
            icon = <Cancer />
            break;
        case 'Capricorn':
            icon = <Capricorn />
            break;
        case 'Gemini':
            icon = <Gemini />
            break;
        case 'Libra':
            icon = <Libra />
            break;
        case 'Lion':
            icon = <Lion />
            break;
        case 'Pisces':
            icon = <Pisces />
            break;
        case 'Sagittarius':
            icon = <Sagittarius />
            break;
        case 'Scorpio':
            icon = <Scorpio />
            break;
        case 'Taurus':
            icon = <Taurus />
            break;
        case 'Virgo':
            icon = <Virgo />
            break;
        default:
            break;
    }
    return icon
}

function Horoscope({ }) {

    const [zodiac, setZodiac] = React.useState<IZodiacPeriod>(zodiacPeriods[0]);
    const birthday = useAppSelector(state => state.user.data?.birthdate);
    const [today, setToday] = React.useState<IHoroscope>({} as IHoroscope);
    const [week, setWeek] = React.useState<IHoroscope>({} as IHoroscope);
    const [month, setMonth] = React.useState<IHoroscope>({} as IHoroscope);
    const [period, setPeriod] = useState('today')
    dayjs.extend(isoWeek);
    dayjs().isoWeekday(1);


    React.useEffect(() => {
        setZodiac(
            zodiacPeriods?.find(
                item =>
                    item.value ===
                    (birthday &&
                        zodiacNameFind(
                            new Date(birthday).getDate(),
                            new Date(birthday).getMonth(),
                        )),
            ) ?? zodiacPeriods[0],
        );
    }, [birthday]);

    React.useEffect(() => {
        (async () => {
            const client = await getUpdateClient();
            await client
                .query({
                    query: HOROSCOPE,
                    variables: {
                        name: zodiac.name,
                        date: dayjs().format('YYYY-MM-DD'),
                    },
                })
                .then(res => {
                    setToday(res.data.horoscopeSign.daily[0]);
                    setWeek(res.data.horoscopeSign.weekly[0]);
                    setMonth(res.data.horoscopeSign.monthly[0]);
                })
                .catch(e => {
                    console.log(JSON.stringify(e, null, 2));
                })
                .finally(() => {
                });
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zodiac]);


    const templateZodiacs = useMemo(() => {
        return zodiacPeriods.map((item, key) => {
            return <div className={classes.horoscope_menu_item} key={key}>
                <span className={classes.horoscope_menu_name} onClick={() => setZodiac(item)}>{item === zodiac && <div className={classes.horoscope_menu_item_active}></div>} {item.name}</span>
                <span className={classes.horoscope_menu_period}>{item.period}</span>
            </div>
        })

    }, [zodiacPeriods, zodiac])

    var date = new Date(), y = date.getFullYear(), m = date.getMonth();

    const renderHoroscope = () => {
        if (period === "week") {
            return <div className={classes.horoscope_item_content}>{week?.content ?? " Гороскоп на данную неделю отсутствует"}</div>
        }
        if (period === "month") {
            return <div className={classes.horoscope_item_content}>{month?.content ?? " Гороскоп на данную неделю отсутствует"}</div>
        }
        return <div className={classes.horoscope_item_content}>{today?.content ?? " Гороскоп на данный день отсутствует"}</div>
    }


    const renderDate = () => {
        if (period === "week") {
            return `${dayjs()?.isoWeekday(1)?.format('DD')} - ${moment(new Date(
                dayjs()?.isoWeekday(7)?.toString(),
            )).format('D MMMM')}`
        }
        if (period === "month") {
            return `01 - ${moment(new Date(y, m + 1, 0)).format('D MMMM')}`
        }
        return `Сегодня, 
            ${new Date().toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
        })}.`
    }

    const renderButtons = () => {
        const weekBtn = <div className={classes.horoscope_week}>
            <div>
                <h3>Гороскоп на эту неделю</h3>
                <span className={classes.horoscope_period}> {`${dayjs()?.isoWeekday(1)?.format('DD')} - ${moment(new Date(
                    dayjs()?.isoWeekday(7)?.toString(),
                )).format('D MMMM')}`}</span>
            </div>
            <div className={classes.horoscope_period_btn} onClick={() => setPeriod('week')}>Смотреть</div>
        </div>
        const monthBtn = <div className={classes.horoscope_month}>
            <div>
                <h3>Гороскоп на этот месяц</h3>
                <span className={classes.horoscope_period}> {`01 - ${moment(new Date(y, m + 1, 0)).format('D MMMM')}`}</span>
            </div>
            <div className={classes.horoscope_period_btn} onClick={() => setPeriod('month')}>Смотреть</div>
        </div>
        const dayBtn = <div className={period === "week" ? classes.horoscope_week : classes.horoscope_month}>
            <div>
                <h3>Гороскоп на сегодня</h3>
                <span className={classes.horoscope_period}> {` ${new Date().toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                })}.`}</span>
            </div>
            <div className={classes.horoscope_period_btn} onClick={() => setPeriod('month')}>Смотреть</div>
        </div>

        return <div className={classes.horoscope_period_wrp}>
            {period === "week" ? dayBtn : weekBtn}
            {period === "month" ? dayBtn : monthBtn}
        </div>
    }



    return (
        <div className={classes.horoscope}>
            <div>
                <div className={classes.horoscope_item}>
                    <div className={classes.horoscope_item_header}>
                        {getHoroscopeIcon(zodiac.value)}
                        <div>
                            <h2 className={classes.horoscope_item_header_title}>
                                Гороскоп: {zodiac.name}
                            </h2>
                            <div className={classes.horoscope_item_header_date}>
                                {renderDate()}
                            </div>
                        </div>

                    </div>
                    {renderHoroscope()}
                </div>
                {renderButtons()}
            </div>
            <div className={classes.horoscope_menu}> {templateZodiacs}</div>
        </div>
    )
}

export default Horoscope
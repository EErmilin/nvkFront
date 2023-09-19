

import classes from "./Horoscope.module.scss";
import React, { useMemo } from 'react';
import { HOROSCOPE } from '../../gql/query/horoscopes/Horoscopes';
import { IZodiacPeriod, IHoroscope } from '../../models/Horoscope';
import { getUpdateClient } from '../../requests/updateHeaders';
import { zodiacPeriods, zodiacNameFind } from '../../helpers/horoscopeHelpers';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useAppSelector } from "../../redux/hooks";
import moment from "moment";
import 'moment/locale/ru';
import { ReactComponent as Leo } from '../../assets/img/zodiacs/leo.svg'
import { ReactComponent as Aquarius } from '../../assets/img/zodiacs/aquarius.svg'
moment().locale('ru')


function Horoscope({ }) {

    const [zodiac, setZodiac] = React.useState<IZodiacPeriod>(zodiacPeriods[0]);
    const birthday = useAppSelector(state => state.user.data?.birthdate);
    const [today, setToday] = React.useState<IHoroscope>({} as IHoroscope);
    const [week, setWeek] = React.useState<IHoroscope>({} as IHoroscope);
    const [month, setMonth] = React.useState<IHoroscope>({} as IHoroscope);
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

    console.log('!@!!!!!!!!!!')
    console.log(week)


    return (
        <div className={classes.horoscope}>
            <div>
                <div className={classes.horoscope_item}>
                    <div className={classes.horoscope_item_header}>
                    <Aquarius/>
                    <div>
                        <h2 className={classes.horoscope_item_header_title}>
                            Гороскоп: {zodiac.name}
                        </h2>
                        <div className={classes.horoscope_item_header_date}>
                            Сегодня,{' '}
                            {new Date().toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                            })}
                            .
                        </div>
                        </div>

                    </div>

                    <div className={classes.horoscope_item_content}>{today?.content ?? " Гороскоп на данный день отсутствует"}</div>
                </div>
                <div className={classes.horoscope_period_wrp}>
                    <div className={classes.horoscope_week}>
                        <div>
                            <h3>Гороскоп на эту неделю</h3>
                            <span className={classes.horoscope_period}> {`${dayjs()?.isoWeekday(1)?.format('DD')} - ${moment(new Date(
                                dayjs()?.isoWeekday(7)?.toString(),
                            )).format('D MMMM')}`}</span>
                        </div>
                        <div className={classes.horoscope_period_btn}>Смотреть</div>
                    </div>
                    <div className={classes.horoscope_mounth}>
                        <div>
                            <h3>Гороскоп на этот месяц</h3>
                            <span className={classes.horoscope_period}> {`01 - ${moment(new Date(y, m + 1, 0)).format('D MMMM')}`}</span>
                        </div>
                        <div className={classes.horoscope_period_btn}>Смотреть</div>
                    </div>
                </div>
            </div>
            <div className={classes.horoscope_menu}> {templateZodiacs}</div>
        </div>
    )
}

export default Horoscope
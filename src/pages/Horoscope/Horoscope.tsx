

import classes from "./Horoscope.module.scss";
import React, { useMemo } from 'react';
import { HOROSCOPE } from '../../gql/query/horoscopes/Horoscopes';
import { IZodiacPeriod, IHoroscope } from '../../models/Horoscope';
import { getUpdateClient } from '../../requests/updateHeaders';
import { zodiacPeriods, zodiacNameFind } from '../../helpers/horoscopeHelpers';
import dayjs from 'dayjs';
import { useAppSelector } from "../../redux/hooks";

function Horoscope({ }) {

    const [zodiac, setZodiac] = React.useState<IZodiacPeriod>(zodiacPeriods[0]);
    const birthday = useAppSelector(state => state.user.data?.birthdate);
    const [today, setToday] = React.useState<IHoroscope>({} as IHoroscope);
    const [week, setWeek] = React.useState<IHoroscope>({} as IHoroscope);
    const [month, setMonth] = React.useState<IHoroscope>({} as IHoroscope);

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

    console.log('!@!!!!!!!!!!')
    console.log(today)


    return (
        <div className={classes.horoscope}>
            <div>
                <div className={classes.horoscope_item}>
                    <div className={classes.horoscope_item_header}>
                        
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

                    <div className={classes.horoscope_item_content}>{today?.content ?? " Гороскоп на данный день отсутствует"}</div>
                </div>
                <div className={classes.horoscope_period_wrp}>
                    <div className={classes.horoscope_period}>
                        <h3>Гороскоп на эту неделю</h3>
                    </div>
                    <div className={classes.horoscope_period}>
                        <h3>Гороскоп на этот месяц</h3>
                    </div>
                </div>
            </div>
            <div className={classes.horoscope_menu}> {templateZodiacs}</div>
        </div>
    )
}

export default Horoscope
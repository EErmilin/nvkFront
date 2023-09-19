

import classes from "./CurrentService.module.scss";
import React from 'react';
import { SERVICE } from '../../../../gql/query/services/Services';
import { ANNOUNCEMENT } from '../../../../gql/query/services/Announcements';
import { IService } from '../../../../models/Service';
import { useApolloClient } from "@apollo/client";
import { useAppSelector } from '../../../../redux/hooks';
import { useParams } from "react-router-dom";
import ButtonDefault from "../../../../components/UI/btns/Button/Button";



function CurrentService({ }: any) {


    const { type, id } = useParams()
    const user = useAppSelector(state => state.user.data);
    let client = useApolloClient();
    const [data, setData] = React.useState<IService | null>(null);

    const update = React.useCallback(async () => {
        try {
            let response;
            if (type !== "ads") {
                response = await client.query({
                    query: SERVICE,
                    variables: {
                        serviceId: Number(id),

                    },
                });
            } else {
                response = await client.query({
                    query: ANNOUNCEMENT,
                    variables: {
                        adId: Number(id),

                    },
                });
            }

            setData(type !== 'ads' ? response.data.service : response.data.ad);
        } catch (e) {

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, id, type]);

    React.useEffect(() => {
        update();
    }, [update]);


    return (
        <div className={classes.service}>
             <div className={classes.service_item_img}>
              <img src={data?.images[0].url_1536} className={classes.service_item_img}/>
              </div>
            <div className={classes.service_item}>
            <div className={classes.service_item_title}>  {data?.name} </div>
                {data?.content && <div dangerouslySetInnerHTML={{ __html: data.content }} className={classes.service_item_text}></div>}
                <ButtonDefault
                className={classes.service_item_btn}
                    onClick={() => { }}
                    title={"Заполнить анкету"}
                />
            </div>
        </div>
    )
}

export default CurrentService
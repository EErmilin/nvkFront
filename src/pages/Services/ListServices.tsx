

import classes from "./ListServices.module.scss";
import React, { useMemo } from 'react';
import ServiceItem from "./components/ServiceItem/ServiceItem";
import { getUpdateClient } from '../../requests/updateHeaders';
import { ApolloError } from "@apollo/client";
import { QUERY_SERVICES } from '../../gql/query/services/Query';
import { IAdsPreview, IServicePreview } from "../../models/Service";



function ListServices({ }) {

  const [data, setData] = React.useState({
    ads: [],
    coupons: [],
    services: [],
  });

  const templateServices = useMemo(() => {
    return data.services.map((service: IServicePreview, key: number) => {
      return <ServiceItem service={service} key={key} type={"service"} />
    })
  }, [data.services])

  const templateAds = useMemo(() => {
    return data.ads.map((service: IAdsPreview, key: number) => {
      return <ServiceItem service={service} type={"ads"} key={key} />
    })
  }, [data.ads])


  const update = async () => {
    try {

      let client = await getUpdateClient();
      let response = await client.query({
        query: QUERY_SERVICES,
      });
      setData(response.data);
    } catch (e: unknown) {
      if (e instanceof ApolloError) {

        console.log('e', e.message);
      }
    }
  };

  React.useEffect(() => {
    update();
  }, []);




  return (
    <div className={classes.wrp}>
      <div className={classes.servises}>
        {templateServices}
        {templateAds}
      </div>
    </div>
  )
}

export default ListServices
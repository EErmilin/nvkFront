import React, { useMemo } from "react"
import classes from "./ListSerials.module.scss";
import SerialsItem from "./components/SerialsItem/SerialsItem";
import { useQuery } from "@apollo/client";
import { SERIALS } from "../../gql/query/series/Series";
import Filter from "../../components/Filter/Filter";
import { Spin } from "antd";

export const ListSerials = () => {

  const [search, setSearch] = React.useState('');

  const { data, loading, error } = useQuery(SERIALS);


  const templateMovies = useMemo(() => {
    if (data) {
      return data.serials.map((item, key) => <SerialsItem serial={item} key={key} />)
    }
  }, [data])


  return (
    <>
      <Filter title={"Сериалы смотреть онлайн"} type={'SERIES'}/>
      <div className={classes.wrapper}>

        {!data ? <Spin size="large" /> : templateMovies}
      </div>
    </>
  )
}

export default ListSerials

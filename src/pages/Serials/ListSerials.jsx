import React, { useMemo, useState } from "react"
import classes from "./ListSerials.module.scss";
import SerialsItem from "./components/SerialsItem/SerialsItem";
import { useQuery } from "@apollo/client";
import { SERIALS } from "../../gql/query/series/Series";
import Filter from "../../components/Filter/Filter";
import { Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getSeries } from "../../redux/thunks/screens/getSeries/GetSeries";
import { useFilter } from "../../hooks/useFilter";
import { useOrderBy } from "../../hooks/useOrderBy";

export const ListSerials = () => {

  const [search, setSearch] = React.useState('');
  const dispatcher = useAppDispatch()
  const serials = useAppSelector(state => state.screens.serials);
  const [filters, setFilters] = useState({})
  const mainFilter = useFilter(filters);
  const [isLoading, setIsLoading] = useState(false)
  const [sort, setSort] = useState(null) // убрать в фильтры
  const [sortOption, orderBy] = useOrderBy(sort);

  const templateMovies = useMemo(() => {
    if (serials && serials.length) {
      return serials.map((item, key) => <SerialsItem serial={item} key={key} />)
    }
  }, [serials])

  const update = React.useCallback(async () => { // отрефачить много запросов
    try {
      setIsLoading(true)
      await dispatcher(
        getSeries({
          take: 10,
          //  search,
          orderBy,
          where: {
            mainFilter,
          },
        }),
      );
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false)
    }
  }, [dispatcher, mainFilter, orderBy]);


  React.useEffect(() => {
    (async () => {
      await update();
    })();
  }, [update]);


  return (
    <>
      <Filter title={"Сериалы смотреть онлайн"} type={'SERIES'} setFilters={setFilters} setSort={setSort} />
      <div className={classes.wrapper}>

        {isLoading ? <Spin size="large" /> : serials.length ? templateMovies : "Ничего не найдено :( попробуйте поменять параметры поиска."}
      </div>
    </>
  )
}

export default ListSerials

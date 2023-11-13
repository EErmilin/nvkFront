import React, { useMemo, useState } from "react"
import classes from "./ListMovies.module.scss";
import { getBroadcasts } from "../../redux/thunks/screens/broadcasts/GetBroadcasts";
import { useDispatch } from "react-redux";
import { MovieItem } from "./components/MovieItem/MovieItem";
import { GET_MOVIES } from "../../gql/query/films/films";
import { useQuery } from "@apollo/client";
import Filter from "../../components/Filter/Filter";
import { Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getFilms } from "../../redux/thunks/screens/getFilms/GetFilms";
import { useFilter } from "../../hooks/useFilter";
import { useOrderBy } from "../../hooks/useOrderBy";

export const ListMovies = () => {

  const [search, setSearch] = React.useState('');
  const dispatcher = useAppDispatch()
  const movies = useAppSelector(state => state.screens.movies);
  const [filters, setFilters] = useState({})
  const mainFilter = useFilter(filters);
  const [isLoading, setIsLoading] = useState(false)
  const [sort, setSort] = useState(null)
  const [sortOption, orderBy] = useOrderBy(sort);


  const templateMovies = useMemo(() => {
    if (movies && movies.length) {
      return movies.map((item, key) => <MovieItem movie={item} key={key} />)
    }
  }, [movies])


  const update = React.useCallback(async () => {
    try {
      setIsLoading(true)
      await dispatcher(
        getFilms({
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
  }, [dispatcher, mainFilter]);

  React.useEffect(() => {
    (async () => {
      await update();
    })();
  }, [update]);

  return (
    <>
      <Filter title={"Фильмы смотреть онлайн"} type={"MOVIE"} setFilters={setFilters} setSort={setSort}/>
      <div className={classes.wrapper}>
        {isLoading ? <Spin size="large" /> : movies.length ? templateMovies : "Ничего не найдено :( попробуйте поменять параметры поиска."}
      </div>
    </>
  )
}

export default ListMovies

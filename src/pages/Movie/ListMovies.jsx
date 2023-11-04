import React, { useMemo } from "react"
import classes from "./ListMovies.module.scss";
import { getBroadcasts } from "../../redux/thunks/screens/broadcasts/GetBroadcasts";
import { useAppSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { MovieItem } from "./components/MovieItem/MovieItem";
import { GET_MOVIES } from "../../gql/query/films/films";
import { useQuery } from "@apollo/client";

export const ListMovies = () => {

  const [search, setSearch] = React.useState('');

  const { data, loading, error } = useQuery(GET_MOVIES);


  const templateMovies = useMemo(() => {
    if (data) {
      return data.movies.map((item, key) => <MovieItem movie={item} key={key} />)
    }
  }, [data])


  return (
    <div className={classes.wrapper}>
      {templateMovies}

    </div>
  )
}

export default ListMovies

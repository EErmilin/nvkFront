import React, { useMemo } from "react"
import classes from "./ListSerials.module.scss";
import SerialsItem from "./components/SerialsItem/SerialsItem";
import { useQuery } from "@apollo/client";
import { SERIALS } from "../../gql/query/series/Series";

export const ListSerials = () => {

  const [search, setSearch] = React.useState('');

  const { data, loading, error } = useQuery(SERIALS);


  const templateMovies = useMemo(() => {
    if (data) {
      return data.serials.map((item, key) => <SerialsItem serial={item} key={key} />)
    }
  }, [data])


  return (
    <div className={classes.wrapper}>
      {templateMovies}
    </div>
  )
}

export default ListSerials

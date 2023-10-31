

import classes from "./AllScreenAdmin.module.scss";
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GET_ANIMATIONS, GET_ANIMATIONS_EPISODES, GET_ANIMATIONS_SEASONS, GET_FILMS, GET_SERIALS, GET_SERIES_EPISODES, GET_SERIES_SEASONS } from "../../../gql/query/adminQuery/admin";
import { useQuery } from "@apollo/client";
import moment from "moment";

let columns = [];

const filmColumns = [{
  title: 'Название',
  dataIndex: 'name',
  key: 'name',
  render: (text) => <a>{text}</a>,
},
{
  title: 'id',
  dataIndex: 'id',
  key: 'id',
},
{
  title: 'Дата создания',
  dataIndex: 'createdAt',
  key: 'createdAt',
},
{
  title: 'Дата обновления',
  dataIndex: 'updatedAt',
  key: 'updatedAt',
},
{
  title: 'Длительность',
  dataIndex: 'duration',
  key: 'duration',
},
{
  title: 'Описание',
  dataIndex: 'content',
  key: 'content',
},]

const serialColums = [
  {
    title: 'Название сериала',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Дата создания',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Дата обновления',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
];

const seasonsColumns = [
  {
    title: 'Название сезона',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Название сериала',
    dataIndex: 'serialName',
    key: 'serialName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Дата создания',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Дата обновления',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
];

const episodeColumns = [
  {
    title: 'Название эпизода',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Дата создания',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Дата обновления',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: 'Длительность',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: 'Сериал',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: 'Сезон',
    dataIndex: 'duration',
    key: 'duration',
  },
];




function AllScreenAdmin({ }) {

  const navigate = useNavigate()

  const location = useLocation()

  const { type, subtype } = useParams()

  const qwery = () => {// переписать на свич
    if (type === "animations") {
      if (subtype === "seasons") {
        return GET_ANIMATIONS_SEASONS
      }
      if (subtype === "episodes") {
        return GET_ANIMATIONS_EPISODES
      }
      return GET_ANIMATIONS
    }
    if (type === "films") {
      return GET_FILMS
    }
    if (type === "series") {
      if (subtype === "seasons") {
        return GET_SERIES_SEASONS
      }
      if (subtype === "episodes") {
        return GET_SERIES_EPISODES
      }
      return GET_SERIALS
    }
  }



  const { data, loading, error } = useQuery(qwery(), { type, subtype });

  const [dataArray, setDataArray] = useState(data)

  useEffect(() => {
    if (data) {
      if (type === "series") {
        if (subtype === "seasons") {
          const dataArray = data?.seriesSeasons?.map((season) => {
            season["serialName"] = season.series.name
            return season
          })
          setDataArray(dataArray)
        } else if (subtype === "episodes") {
          setDataArray(data.seriesEpisodes)
        } else {
          return setDataArray(data?.serials)
        }
      } else if (type === "animations") {

        if (subtype === "episodes") {
          return setDataArray(data.seriesEpisodes)
        }
        if (subtype === "seasons") {
          const dataArray = data?.animationSeasons?.map((season) => {
            season["serialName"] = season.animation?.name
            return season
          })
          console.log('!!!!!!!!!!!!!')
          console.log(dataArray)
          setDataArray(dataArray)
        } else {
          return setDataArray(data.animations)
        }

      } else { setDataArray(data?.movies) }
    }
  }, [data, type, subtype])

  useEffect(() => {
    if (type === "series" || type === "animations") {   // переписать на свич
      if (subtype === "all") {
        columns = serialColums
      } else if (subtype === "episodes") {
        columns = episodeColumns
      } else {
        columns = seasonsColumns
      }
    }
    if (type === "films") {
      columns = filmColumns
    }

  }, [type, subtype])

  console.log(dataArray)



  return (
    <div className={classes.films}>
      <div>
        <Button onClick={() => navigate('add')} style={{ margin: "0 20px" }}>Создать</Button>
        {//  <Button >Фильтры</Button>
        }
      </div>
      <Table columns={columns} dataSource={dataArray} />
    </div>
  )
}

export default AllScreenAdmin
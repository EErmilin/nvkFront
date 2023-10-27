

import classes from "./AllScreenAdmin.module.scss";
import React from 'react';
import { Button, Space, Table, Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const columns = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'id',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Дата создания',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Дата обновления',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Номер',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Длительность',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Сезон',
    dataIndex: 'address',
    key: 'address',
  },

];


function AllScreenAdmin({ }) {

  const navigate = useNavigate()

  const { type, subtype } = useParams()

  console.log(type)
  console.log(subtype)



  return (
    <div className={classes.films}>
      <div>
        <Button onClick={() => navigate('add')} style={{margin: 20}}>Создать</Button>
        <Button >Фильтры</Button>
      </div>
      <Table columns={columns} dataSource={null} />
    </div>
  )
}

export default AllScreenAdmin
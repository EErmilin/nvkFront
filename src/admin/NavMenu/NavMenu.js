import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, MailOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import classes from "./NavMenu.module.scss"
  ;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [

  getItem('Фильмы', 'sub1', <VideoCameraOutlined />, [
    getItem('Фильмы', '/admin/films/all'),
  ]),
  getItem('Мультики', 'sub2', <VideoCameraOutlined />, [
    getItem('Мультики', '/admin/animations/all'),
    getItem('Сезоны', '/admin/animations/seasons'),
    getItem('Эпизоды', '/admin/animations/episodes'),
  ]),
  getItem('Сериалы', 'sub3', <VideoCameraOutlined />, [
    getItem('Сериалы', '/admin/series/all'),
    getItem('Сезоны', '/admin/series/seasons'),
    getItem('Эпизоды', '/admin/series/episodes'),
  ]),
];

const NavMenu = () => {

  const { type, subtype } = useParams()
  const location = useLocation()
  const [selectedKeys, setSelectedKeys] = useState({})
  const [defaultOpenKeys, setDefaultOpenKeys] = useState()

  useEffect(() => {
    setSelectedKeys(location.pathname)
  }, [])

  useEffect(() => {
    const sub = location.pathname.includes("animations")? ["sub2"] : location.pathname.includes("series") ? ["sub3"] : ["sub1"]
    setDefaultOpenKeys(sub)
  }, [location])


  const navigate = useNavigate()
  const onClick = (e) => {
    setSelectedKeys(e.key)
    navigate(`${e.key}`)
  };

  if(!defaultOpenKeys)return
  return (
    <div className={classes.wrp}>
      <Menu
        onClick={onClick}

        style={{
          height: '100%',
          width: 256,
        }}
        defaultOpenKeys={defaultOpenKeys}
        selectedKeys={selectedKeys.key}
        mode="inline"
        items={items}
      />
    </div>
  );
};
export default NavMenu;
import React from 'react';
import { AppstoreOutlined, MailOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
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
    getItem('Фильмы', 'films/all'),
    getItem('Сезоны', 'films/seasons'),
    getItem('Эпизоды', 'films/episodes'),
  ]),
  getItem('Мультики', 'sub2', <VideoCameraOutlined />, [
    getItem('Фильмы', 'animations/all'),
    getItem('Сезоны', 'animations/seasons'),
    getItem('Эпизоды', 'animations/episodes'),
  ]),
  getItem('Сериалы', 'sub3', <VideoCameraOutlined />, [
    getItem('Фильмы', 'series/all'),
    getItem('Сезоны', 'series/seasons'),
    getItem('Эпизоды', 'series/episodes'),
  ]),
];

const NavMenu = () => {

  const navigate = useNavigate()
  const onClick = (e) => {
    navigate(`/admin/${e.key}`)
  };
  return (
    <div className={classes.wrp}>
      <Menu
        onClick={onClick}

        style={{
          height: '100%',
          width: 256,
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
    </div>
  );
};
export default NavMenu;
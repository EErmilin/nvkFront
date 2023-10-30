import classes from "./AddScreenAdmin.module.scss";
import React, { useEffect, useMemo, useState } from "react";
import { Button, DatePicker, Input, Select, Space, Table, Tag } from "antd";
import { useFormik } from "formik";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { Form, useParams } from "react-router-dom";
import { getUpdateClient } from "../../../requests/updateHeaders.ts";
import "./AddScreenAdmin.css";
import {
  CREATE_IMAGE,
  CREATE_MOVIE,
  CREATE_MEDIA,
  CREATE_SERIES,
  CREATE_SEASONS,
  CREATE_EPISODS,
} from "../../../gql/mutation/adminMutation/admin";
import { useQuery } from "@apollo/client";
import { GET_SERIALS } from "../../../gql/query/adminQuery/admin";

const props = {
  name: "file",
  multiple: false,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      // message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      //message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

function AddScreenAdmin({}) {
  const [imageId, setImageId] = useState(null);
  const [mediaId, setMediaId] = useState(null);
  const [movieUrl, setMovieUrl] = useState(
    "https://www.youtube.com/watch?v=3ByW1FZAEbw"
  ); //ссылка с админки на фильм
  const [name, setname] = useState("сериал"); // название фильма
  const [dateAge, setDateAge] = useState(2023); // тип number это год фильма не полная дата
  const [content, setContent] = useState("jjjjjjjjjjjj"); //описание фильма
  const [client, setClient] = useState(null);
  /** Начальные значения */
  const initialValues = {
    phone: "",
    password: "",
  };

  const { type, subtype } = useParams();

  /** Стейт полей и правила */
  const { values, handleChange, touched, handleBlur, setTouched } = useFormik({
    initialValues,
    validateOnMount: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  //date
  const date = new Date().toISOString().split("T");
  // create Image | загрузка картинки нужен imageId
  const customRequest = async ({ file }) => {
    const blobUrl = URL.createObjectURL(file);

    try {
      let response = await client.mutate({
        mutation: CREATE_IMAGE,
        variables: {
          createImageInput: {
            date: date[0],
            key: `${file?.name}${file?.uid}`,
            name: file.name,
            url: blobUrl,
          },
        },
      });
      console.log("create imageId", response);
      if (response) {
        setImageId(response.data.createImage.id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //todo createMedia
  const createMedia = async () => {
    try {
      let response = await client.mutate({
        mutation: CREATE_MEDIA,
        variables: {
          createMediaInput: {
            date: date[0],
            indexM3u8Url: movieUrl, //ссылка url на фильм
            name: "name", // что хочешь передай
          },
        },
      });
      if (response) {
        setMediaId(response.data.createMedia.id);
      }
      console.log("create mediaId", response);
    } catch (e) {
      console.log(e);
    }
  };

  //отправка на сервер должен запускаться после createImage и createMedia
  const saveHandle = async (event) => {
    event.preventDefault();
    //функция createImage
    //--
    //createMedia
    // await createMedia();

    //после всего должно запуститься это
    if (type === "films") {
      try {
        let response = await client.mutate({
          mutation: CREATE_MOVIE,
          variables: {
            createMovieInput: {
              mediaId: 4, //url фильма -- mediaId
              imageId, //id картинки -- imageId
              name,
              date: dateAge,
              content,
              genre: "боевик",
              age: "",
              language: "якутия",
              country: "Якутия",
            },
          },
        });
        console.log("create movie", response);
      } catch (e) {
        console.log(e);
      }
    } else if (type === "series") {
      try {
        let response = await client.mutate({
          mutation: CREATE_SERIES,
          variables: {
            createSeriesInput: {
              imageId, //id картинки -- imageId
              name,
              date: dateAge,
              content,
              genre: "боевик",
              age: "ssss",
              language: "якутия",
              country: "Якутия",
              duration: 2222, // надо создать поле
            },
          },
        });
        console.log("create series", response);
      } catch (e) {
        console.log(e);
      }
    }
  };

  //SERIES
  //забираем сериалы отсюда можно получить id для селектов И надр вставить в селекты
  const { data, loading, error } = useQuery(GET_SERIALS);
  console.log(data);
  //создает сезоны
  const createSeason = async (event) => {
    event.preventDefault();
    try {
      let response = await client.mutate({
        mutation: CREATE_SEASONS,
        variables: {
          createSeriesSeasonInput: {
            name, //из инпута
            number: 2, //из инпута
            seriesId: 2, //получаем из data
          },
        },
      });
      console.log("сезоны", response);
    } catch (e) {
      console.log(e);
    }
  };

  const createEpisode = async (event) => {
    event.preventDefault();
    try {
      let response = await client.mutate({
        mutation: CREATE_EPISODS,
        variables: {
          createSeriesEpisodeInput: {
            duration: 333, //нужно поле
            mediaId: 2, //так же работает как с фильмами нужно что бы создавалась medaiId с ссылкой
            name: "серия 1", //имя серии
            seriesSeasonId: 2, //id сезона можно взять из data
            number: 1, //номер серии нужен инпут на фронте не так
          },
        },
      });
      console.log("сезоны", response);
    } catch (e) {
      console.log(e);
    }
  };

  //get client обновляем токен | можно передать токен в getUpdate если что
  useEffect(() => {
    (async () => {
      let getClient = await getUpdateClient();
      setClient(getClient);
    })();
  }, []);

  console.log(subtype, type);
  const renderForm = () => {
    if (subtype === "seasons") {
      return (
        <form className={classes.form}>
          <Input placeholder="Название"></Input>
          <Input placeholder="Номер"></Input>
          <div className={classes.select}>
            {" "}
            <Select placeholder="Сериал"></Select>
          </div>
          <button onClick={(e) => createSeason(e)}>Сохранить</button>
        </form>
      );
    }
    if (subtype === "episodes") {
      return (
        <form className={classes.form}>
          <Input placeholder="Название"></Input>
          <Input placeholder="Url"></Input>
          <Dragger name="file" multiple={false} customRequest={customRequest}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Изображение</p>
            <p className="ant-upload-hint">
              Перетащите файлы сюда или нажмите для выбора
            </p>
          </Dragger>
          <DatePicker onChange={onChange} placeholder={"Дата"} />
          <TextArea placeholder="Описание"></TextArea>
          <button
            onClick={(e) =>
              type === "series" ? createEpisode(e) : saveHandle(e)
            }
          >
            Сохранить
          </button>
        </form>
      );
    }
    return (
      <form className={classes.form}>
        <Input placeholder="Название"></Input>
        <Dragger customRequest={customRequest}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Изображение</p>
          <p className="ant-upload-hint">
            Перетащите файлы сюда или нажмите для выбора
          </p>
        </Dragger>
        <DatePicker onChange={onChange} placeholder={"Дата"} />
        <TextArea placeholder="Описание"></TextArea>
        <button onClick={(e) => saveHandle(e)}>Сохранить</button>
      </form>
    );
  };

  return <div className={classes.films}>{renderForm()}</div>;
}

export default AddScreenAdmin;

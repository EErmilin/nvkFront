import classes from "./AddScreenAdmin.module.scss";
import React, { useEffect, useMemo, useState } from "react";
import { Button, DatePicker, Input, Select, Space, Table, Tag } from "antd";
import { useFormik } from "formik";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { Form, useNavigate, useParams } from "react-router-dom";
import { CheckCircleOutlined } from '@ant-design/icons';
import { getUpdateClient } from "../../../requests/updateHeaders.ts";
import "./AddScreenAdmin.css";
import {
  CREATE_IMAGE,
  CREATE_MOVIE,
  CREATE_MEDIA,
  CREATE_SERIES,
  CREATE_SEASONS,
  CREATE_EPISODS,
  CREATE_ANIMATION_EPISODS,
  CREATE_ANIMATION_SEASONS,
  CREATE_ANIMATION,
} from "../../../gql/mutation/adminMutation/admin";
import moment from "moment";
import { notification } from 'antd';
import { useQuery } from "@apollo/client";
import { GET_ANIMATIONS, GET_ANIMATIONS_EPISODES, GET_ANIMATIONS_SEASONS, GET_FILMS, GET_SERIALS, GET_SERIES_EPISODES, GET_SERIES_SEASONS } from "../../../gql/query/adminQuery/admin";

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

function AddScreenAdmin({ }) {
  const [api, contextHolder] = notification.useNotification();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [client, setClient] = useState(null);
  const navigate = useNavigate()
  const { type, subtype } = useParams();

  const qwery = () => { //отрефачить, хотя тут блять всё надо отрефачить
    if (type === "series") {
      if (subtype === "episodes") {
        return GET_SERIES_SEASONS
      }
      if (subtype === "seasons") {
        return GET_SERIALS
      }
    }
    if (type === "animations") {
      if (subtype === "episodes") {
        return GET_ANIMATIONS_SEASONS
      }
      if (subtype === "seasons") {
        return GET_ANIMATIONS
      }
    }
    return GET_ANIMATIONS // переписать, лишний запрос
  }

  const { data, loading, error } = useQuery(qwery());
  /** Начальные значения */


  const initialValues = {
    movieUrl: "https://www.youtube.com/watch?v=3ByW1FZAEbw", //ссылка с админки на фильм
    name: "",// название фильма
    dateAge: "02",// тип number это год фильма не полная дата
    content: "",//описание фильмаs
    mediaId: null,
    imageId: null,
    seriesId: null,
    number: null,
    seriesSeasonId: null,
    duration: null,
    animationId: null,
  };



  /** Очищаем ошибки и изменяем состояние */
  function ClearErrorAndChange(field, value) {
    handleChange({ target: { name: field, value: value } })
  }

  /** Стейт полей и правила */
  const { values, handleChange, touched, handleBlur, setTouched } = useFormik({
    initialValues,
    validateOnMount: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  //date

  const openNotificationWithIcon = (type) => {
    if (type === 'error') {
      return api[type]({
        message: 'Ошибка, проверьте правильность введённых данных',
      });
    }
    api[type]({
      message: 'Данные профиля обновлены',
    });
  };



  const date = new Date().toISOString().split("T");
  // create Image | загрузка картинки нужен imageId
  const customRequest = async (props) => {
    const { onSuccess, onError, file, onProgress } = props;
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
        onSuccess("OK")
        ClearErrorAndChange("imageId", response.data.createImage.id);
        return file
      }
    } catch (e) {
      console.log(e);
      const error = new Error("Some error");
      onError({ e });
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
            indexM3u8Url: values.movieUrl, //ссылка url на фильм
            name: "name", // что хочешь передай
          },
        },
      });
      if (response) {
        ClearErrorAndChange("mediaId", response.data.createMedia.id);
        return response.data.createMedia.id
      }
      console.log("create mediaId", response);
    } catch (e) {
      console.log(e);
    }
  };


  //отправка на сервер должен запускаться после createImage и createMedia
  const saveHandle = async (event) => {
    setLoadingBtn(true)
    event.preventDefault();
    const mediaId = await createMedia();

    //после всего должно запуститься это
    if (type === "films") {
      try {
        let response = await client.mutate({
          mutation: CREATE_MOVIE,
          variables: {
            createMovieInput: {
              mediaId, //url фильма -- mediaId
              imageId: values.imageId, //id картинки -- imageId
              name: values.name,
              date: values.dateAge,
              content: values.content,
              genre: "боевик",
              age: "",
              language: "якутия",
              country: "Якутия",
              duration: values.duration
            },
          },
        });
        console.log("create movie", response);
        if (response) {

          setLoadingBtn(false)
          navigate("/admin/films/all")
        }
      } catch (e) {
        openNotificationWithIcon('error')
        setLoadingBtn(false)
        console.log(e);
      }
    } else if (type === "series") {
      try {
        let response = await client.mutate({
          mutation: CREATE_SERIES,
          variables: {
            createSeriesInput: {
              imageId: values.imageId, //id картинки -- imageId
              name: values.name,
              date: values.dateAge,
              content: values.content,
              genre: "боевик",
              age: "ssss",
              language: "якутия",
              country: "Якутия",
              duration: values.duration, // надо создать поле
            },
          },
        });
        if (response) {
          setLoadingBtn(false)
          navigate("/admin/series/all")
        }
        console.log("create series", response);
      } catch (e) {
        console.log(e);
      }
    } else if (type === "animations") {
      try {
        let response = await client.mutate({
          mutation: CREATE_ANIMATION,
          variables: {
            createAnimationInput: {
              coverId: values.imageId, //id картинки -- imageId
              name: values.name,
              date: values.dateAge,
              content: values.content,
              genre: "боевик",
              age: "ssss",
              language: "якутия",
              country: "Якутия",
              duration: values.duration, // надо создать поле
            },
          },
        });
        if (response) {
          setLoadingBtn(false)
          navigate("/admin/animations/all")
        }
        console.log("create series", response);
      } catch (e) {
        console.log(e);
      }
    }
  };

  //SERIES
  //забираем сериалы отсюда можно получить id для селектов И надр вставить в селекты

  //создает сезоны
  const createSeason = async (event) => {
    event.preventDefault();
    try {
      let response = await client.mutate({
        mutation: CREATE_SEASONS,
        variables: {
          createSeriesSeasonInput: {
            name: values.name, //из инпута
            number: values.number, //из инпута
            seriesId: values.seriesId, //получаем из data
          },
        },
      });
      if (response) {
        setLoadingBtn(false)
        navigate("/admin/series/seasons")
      }
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
            duration: values.duration, //нужно поле
            mediaId: 2, //так же работает как с фильмами нужно что бы создавалась medaiId с ссылкой
            name: values.name, //имя серии
            seriesSeasonId: values.seriesSeasonId, //id сезона можно взять из data
            number: values.number, //номер серии нужен инпут на фронте не так
          },
        },
      });

      console.log("сезоны", response);
      if (response) {
        setLoadingBtn(false)
        navigate("/admin/series/episodes")
      }
    } catch (e) {
      setLoadingBtn(false)
      console.log(e);
    }
  };

  //создает сезоны мультиков
  const createSeasonAnimation = async (event) => {
    event.preventDefault();
    try {
      let response = await client.mutate({
        mutation: CREATE_ANIMATION_SEASONS,
        variables: {
          createAnimationSeasonInput: {
            name: values.name, //из инпута
            number: values.number, //из инпута
            animationId: values.animationId, //получаем из data
          },
        },
      });
      if (response) {
        setLoadingBtn(false)
        navigate("/admin/animations/seasons")
      }
      console.log("сезоны Мультика", response);
    } catch (e) {
      setLoadingBtn(false)
      console.log(e);
    }
  };

  const createEpisodeAnimation = async (event) => {
    event.preventDefault();
    try {
      let response = await client.mutate({
        mutation: CREATE_ANIMATION_EPISODS,
        variables: {
          createAnimationEpisodeInput: {
            duration: values.duration, //нужно поле
            mediaId: 2, //так же работает как с фильмами нужно что бы создавалась medaiId с ссылкой
            name: values.name, //имя серии
            seasonId: values.seriesSeasonId, //id сезона можно взять из data
            number: values.number, //номер серии нужен инпут на фронте не так
          },
        },
      });

      console.log("Мультик", response);
      if (response) {
        setLoadingBtn(false)
        navigate("/admin/animations/episodes")
      }
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

  const renderForm = () => {
    if (subtype === "seasons") {
      return (
        <form className={classes.form}>
          <Input
            placeholder="Название"
            onChange={(e) => {
              return ClearErrorAndChange("name", e.target.value)
            }}></Input>
          <Input placeholder="Номер"
            onChange={(e) => {
              return ClearErrorAndChange("number", Number(e.target.value))
            }}></Input>
          <div className={classes.select}>
            {" "}
            <Select placeholder={data?.animations ? "Мультфильм" : "Сериал"}
              options={type == 'animations' ? data?.animations?.map((animation) => { return { label: animation.name, value: animation.id } }) : data?.serials?.map((serial) => { return { label: serial.name, value: serial.id } })}
              onChange={(e) => {
                return ClearErrorAndChange("animationId", e)
              }}></Select>
          </div>
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            loading={loadingBtn}
            style={{ width: "200px" }}
            onClick={(e) => type === "animations" ? createSeasonAnimation(e) : createSeason(e)}>Отправить</Button>
        </form>
      );
    }
    if (subtype === "episodes") {
      return (
        <form className={classes.form}>
          <Input placeholder="Название"
            onChange={(e) => {
              return ClearErrorAndChange("name", e.target.value)
            }}
          ></Input>
          <Input placeholder="Url"></Input>
          <Input placeholder="Номер"
            onChange={(e) => {
              return ClearErrorAndChange("number", Number(e.target.value))
            }}
          ></Input>
          <Dragger name="file" multiple={false} customRequest={customRequest}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Изображение</p>
            <p className="ant-upload-hint">
              Перетащите файлы сюда или нажмите для выбора
            </p>
          </Dragger>
          <DatePicker onChange={onChange} picker="year" placeholder={"Дата"} />
          <Input placeholder="Длительность"
            onChange={(e) => {
              return ClearErrorAndChange("duration", Number(e.target.value))
            }}
          ></Input>
          <TextArea placeholder="Описание"></TextArea>
          <Select placeholder="Сезон"
            options={type == 'animations' ? data?.animationSeasons?.map((season) => { return { label: season.name, value: season.id } }) : data?.seriesSeasons.map((season) => { return { label: season.name, value: season.id } })}
            onChange={(e) => {
              return ClearErrorAndChange("seriesSeasonId", e)
            }}></Select>
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            loading={loadingBtn}
            style={{ width: "200px" }}
            onClick={(e) =>
              type === "series" ? createEpisode(e) : type === "animations" ? createEpisodeAnimation(e) : saveHandle(e)
            }>Отправить</Button>
        </form>
      );
    }
    return (
      <form className={classes.form}>
        <Input
          placeholder="Название"
          onChange={(e) => {
            return ClearErrorAndChange("name", e.target.value)
          }}></Input>
        <Dragger {...props}
          multiple={false}
          customRequest={customRequest}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Изображение</p>
          <p className="ant-upload-hint">
            Перетащите файлы сюда или нажмите для выбора
          </p>
        </Dragger>
        <Input
          placeholder="url"
          onChange={(e) => {
            return ClearErrorAndChange("movieUrl", e.target.value)
          }}></Input>
        <DatePicker
          picker="year"
          onChange={(e) => {
            return ClearErrorAndChange("dateAge", Number(moment(e).format("YYYY")))
          }}
          placeholder={"Дата"} />
        <Input placeholder="Длительность"
          onChange={(e) => {
            return ClearErrorAndChange("duration", Number(e.target.value))
          }}
        ></Input>
        <TextArea
          onChange={(e) => {
            return ClearErrorAndChange("content", e.target.value)
          }}
          placeholder="Описание"></TextArea>
        <Button
          type="primary"
          icon={<CheckCircleOutlined />}
          loading={loadingBtn}
          style={{ width: "200px" }}
          onClick={saveHandle}>Отправить</Button>

      </form>
    );
  };

  return <div className={classes.films}>{renderForm()}</div>;
}

export default AddScreenAdmin;

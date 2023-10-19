import React, { useEffect, useState } from "react"
import classes from "./ChangeAvatarModal.module.scss";
import Avatar from "react-avatar-edit"
import { useDispatch } from "react-redux";
import ModalWithBackground from "../ModalWithBackground/ModalWithBackground";

const ChangeAvatarModal = ({
    avatarImg,
    onClose,
    btnClose,
    setAvatar,
}) => {
    const dispatcher = useDispatch()
    /** Превью в base64 и ссылка на загруженную картинку */
    const [avatar, toggleAvatar] = useState({
        preview: null,
        src: null,
        name: '',
        crop: true,
    });

    useEffect(()=>{
        return () => {
            setAvatar(avatar)
        }
    })

    useEffect(()=>{
        setAvatar(avatar)
    },[avatar])




    /** Обрезаем аватар и в preview помещаем base64 полученного объекта */
    const onCrop = (preview) => {
        const obj = {
            ...avatar,
            preview,
        };

        toggleAvatar(obj);
    };

    /** Очищаем поле превьюшки */
    const onCloseCrop = () => {
        const obj = {
            ...avatar,
        };

        toggleAvatar(obj);
    };

    /** Сохраняем изменения */
    const saveAvatar = () => {
        setAvatar(avatar)
        btnClose();
    };

    return (
        <ModalWithBackground
            closeModal={onClose}
            btnCancelClick={saveAvatar}
            disabled={!avatar.crop}
            typeModal="withoutBack"
            background="blue"
            width={450}
        >
            <div className={classes.change_avatar_modal}>
                <Avatar
                    src={avatar.preview}
                    width={400}
                    height={300}
                    onCrop={onCrop}
                    onClose={onCloseCrop}
                    src={avatar.src}
                    minCropRadius={5}
                    shadingColor="black"
                    label={`Нажмите для \n загрузки файла`}
                    labelStyle={{
                        color: '#113656',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 20,
                        cursor: "pointer",
                    }}
                    borderStyle={{
                        backgroundColor: '#c4c4c4',
                        maxWidth: '100%',
                       
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onFileLoad={(file) =>
                        toggleAvatar({ ...avatar, name: file.name, crop: true })
                    }
                />
            </div>
        </ModalWithBackground>
    );
};

export default ChangeAvatarModal

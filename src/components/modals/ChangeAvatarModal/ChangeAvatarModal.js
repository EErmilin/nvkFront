import React, {useEffect, useState} from "react"
import classes from "./ChangeAvatarModal.module.scss";
import dataURItoBlob from "../../../helpers/dataUriToBlob";
import Avatar from "react-avatar-edit"
import {useDispatch} from "react-redux";
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
        src: avatarImg,
        name: '',
        crop: true,
    });


    useEffect(()=>{
        setAvatar(avatar)
    }, [avatar])


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
            preview: null,
            src: null,
            crop: false,
        };

        toggleAvatar(obj);
    };

    /** Сохраняем изменения */
    const saveAvatar = async () => {
        const blob = dataURItoBlob(avatar.preview);
        const files = new FormData();
        files.append('avatar', blob, avatar.name);
        btnClose();
    };

    return (
        <ModalWithBackground
            closeModal={onClose}
            btnCancelClick={btnClose}
            btnNextClick={saveAvatar}
            disabled={!avatar.crop}
            typeModal="withoutBack"
            background="blue"
            width={450}
        >
            <div className={classes.change_avatar_modal}>
                <Avatar
                    src={avatarImg}
                    width={400}
                    height={300}
                    onCrop={onCrop}
                    onClose={onCloseCrop}
                    src={avatar.src}
                    minCropRadius={5}
                    shadingColor="black"
                    label={'Нажмите или перетащите файл'}
                    labelStyle={{
                        color: '#113656',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 20,
                        cursor:"pointer"
                    }}
                    borderStyle={{
                        backgroundColor: '#c4c4c4',
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

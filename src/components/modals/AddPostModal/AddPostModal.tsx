
import ModalWithBackground from '../ModalWithBackground/ModalWithBackground';
import classes from './AddPostModal.module.scss';
import React, { useEffect, useState } from 'react';
import Input from '../../UI/areas/Input/Input';
import CustomTextArea from '../../UI/areas/CustomTextArea/CustomTextArea';
import { useFormik } from 'formik';
import ButtonDefault from '../../UI/btns/Button/Button';
import { getUpdateClient } from '../../../requests/updateHeaders';
import { CREATE_POST } from '../../../gql/mutation/post/CreatePost';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Spin, Upload } from 'antd';
import dataURItoBlob from '../../../helpers/dataUriToBlob';
import { uploadImage } from '../../../requests/UploadImage';
import { getAuthor } from '../../../redux/thunks/author/GetAuthor';
import { useParams } from 'react-router-dom';

const AddPostModal = ({ closeModal, btnCancelClick, authorData }: any) => {

    /** Начальные значения */
    const initialValues = {
        title: "",
        published: true,
        authorId: authorData.author.id,
        content: '',
    }

    /** Стейт полей и правила */
    const { values, handleChange, touched } = useFormik({
        initialValues,
        validateOnMount: true,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    /** Очищаем ошибки и изменяем состояние */
    function ClearErrorAndChange(field, value) {
        handleChange({ target: { name: field, value: value } })
    }

    const userId = useAppSelector(state => state.user.data?.id);
    const [fileList, setFileList] = useState([]);
    const [dataUri, setDataUri] = useState(null)
    const [fileName, setFileName] = useState('')
    const [imgId, setImgId] = useState()
    const [showupload, setShowupload] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatcher = useAppDispatch()
    const { id } = useParams()
    const handleUpload = async (file) => {
        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const dataUri = reader.result;
                setDataUri(dataUri)
                setFileName(file.name)
            };
        } catch (error) {

        }
    };

    const handleFileChange = ({ fileList }) => {
        setFileList(fileList);
        if (fileList.length > 0) {
            handleUpload(fileList[0].originFileObj);
        }
    };

    useEffect(() => {
        if (!dataUri) return
        (async () => {
            setShowupload(false)
            const blob = dataURItoBlob(dataUri);
            let response = await uploadImage({
                type: blob.type,
                uri: blob,
                fileName: fileName

            });
            if (response.data) {
                setShowupload(true)
                setDataUri(null)
                setImgId(response.data.id)
            }
        })();
    }, [dataUri])

    const onSumbit = async () => {
        try {
            setLoading(true)
            let client = await getUpdateClient();
            let response = await client.mutate({
                mutation: CREATE_POST,
                variables: {
                    data: {
                        ...values,
                        imageIds: [imgId]
                    },
                }
            });
            if (response) {
                dispatcher(getAuthor({ id: Number(id), userId: userId })).then(e => btnCancelClick())
                setLoading(false)
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <ModalWithBackground
            closeModal={closeModal}
            btnCancelClick={btnCancelClick}
            width={1024}
            className={classes.modal}>
            <div className={classes.modal}>
                <Upload
                    onChange={handleFileChange}
                    listType="picture"
                    maxCount={1}
                    showUploadList={showupload}
                >
                    <Button icon={<UploadOutlined />}>Загрузить файл</Button>
                    {dataUri && !showupload && <Spin style={{ marginLeft: 15 }} />}
                </Upload>
                <Input placeholder={'Заголовок'} onChange={(event) => ClearErrorAndChange("title", event.target.value)}></Input>
                <CustomTextArea
                    classNameInputWrap={classes.modal_area}
                    placeholder={'Описание'}
                    onChange={(event) => ClearErrorAndChange("content", event.target.value)}>

                </CustomTextArea>
               {loading? <Spin/>: <ButtonDefault title={'Создать пост'} onClick={onSumbit} disabled={!showupload || !values.title || !values.content} />}
            </div>
        </ModalWithBackground>
    );
};

export default AddPostModal;


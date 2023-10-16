import React, { useCallback, useEffect } from 'react'
import { useRef } from 'react';
import { Routes, useLocation, useSearchParams } from 'react-router-dom';
import './App.css';
import AuthModal from './components/modals/AuthModal/AuthModal';
import ConfirmSmsCodeModal from './components/modals/ConfirmSmsCodeModal/ConfirmSmsCodeModal';
import RegisterModal from './components/modals/RegisterModal/RegisterModal';
import UserRegisterModal from './components/modals/UserRegisterModal/UserRegisterModal';
import { VALIDATE_TOKEN } from './gql/mutation/auth/ValidateToken';
import useToggleVisibility from './hooks/useToggleVisibility';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { setModalVisible } from './redux/slices/routerSlice';
import { logout } from './redux/thunks/auth/Logout';
import { getProfile } from './redux/thunks/user/GetProfile';
import { getUpdateClient } from './requests/updateHeaders';
import { getListRoute } from './routes/getListRoute';
import { routes } from './routes/routes';


function App() {

  const isAuth = useAppSelector(state => state.auth.logged);
  const modalVisible = useAppSelector(state => state.router.modalVisible);
  const userId = useAppSelector(state => state.user.data?.id);
  const state = useAppSelector(state => state);
  const dispatcher = useAppDispatch()
  const url = useLocation()
  const token = useAppSelector(state => state.auth.token);
  const [searchParams, setSearchParams] = useSearchParams();

  const update = useCallback(async () => {
    (async function () {
      try {
        if (token && userId) {
          const client = await getUpdateClient();
          let response = await client.mutate({
            mutation: VALIDATE_TOKEN,
            variables: {
              token: token,
              userId: userId,
            },
          });
          if (response.data.validateToken === false) {
            dispatcher(logout());
          } else {
            const response = await dispatcher(getProfile());
            console.log('response', response);
          }
        }
      } catch (e) {
        console.log('e index', e);
      }
    })();
  }, [dispatcher, token]);

  useEffect(() => {
    update();
  }, [dispatcher, update]);

  useEffect(() => {
    if (modalVisible) {
      setIsAuthModal(true)
      dispatcher(setModalVisible(false))
    }
  }, [modalVisible]);


  /** Модалка авторизации */
  const [isAuthModal, setIsAuthModal, closeIsAuthModal] = useToggleVisibility(isAuth ? false : true)

  /** Модалка регистрации */
  const [isRegisterModal, setIsRegisterModal, closeIsRegisterModal] = useToggleVisibility(false)

  /** Модалка ввода кода */
  const [isCodeModal, setIsCodeModal, closeIsCodeModal] = useToggleVisibility(false)

  /** Модалка ввода данных полльзователя */
  const [isUserRegisterModal, setIsUserRegisterModall, closeIsUserRegisterModal] = useToggleVisibility(false)

  const listRoutes = getListRoute(routes)

  const templateAuthModal = isAuthModal && (
    <AuthModal
      closeModal={closeIsAuthModal}
      btnCancelClick={setIsAuthModal}
      setIsRegisterModal={setIsRegisterModal} />
  )

  const templateRegisterModal = isRegisterModal && (
    <RegisterModal
      closeModal={closeIsRegisterModal}
      btnCancelClick={setIsRegisterModal}
      setIsAuthModal={setIsAuthModal}
      setIsCodeModal={setIsCodeModal} />
  )

  const templateCodeModal = isCodeModal && (
    <ConfirmSmsCodeModal
      closeModal={closeIsCodeModal}
      btnCancelClick={setIsCodeModal}
      setIsUserRegisterModal={setIsUserRegisterModall}
      setIsAuthModal={setIsAuthModal}
      setIsRegisterModal={setIsRegisterModal} />
  )

  const templateUserRegisterModal = isUserRegisterModal && (
    <UserRegisterModal
      closeModal={closeIsUserRegisterModal}
      btnCancelClick={setIsUserRegisterModall}
      setIsCodeModal={setIsCodeModal} />
  )
  useEffect(() => {
    let isScroll = searchParams.get("scroll")
    if(isScroll)return
    document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }, [url.pathname])


  return (
    <div className="App">
      
      <Routes>
        {listRoutes}
      </Routes>
      {templateCodeModal}
      {templateAuthModal}
      {templateRegisterModal}
      {templateUserRegisterModal}
    </div>
  )
}

export default App;




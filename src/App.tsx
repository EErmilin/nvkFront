import { useQuery } from '@apollo/client';
import React, {useCallback, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AuthModal from './components/modals/AuthModal/AuthModal';
import ConfirmSmsCodeModal from './components/modals/ConfirmSmsCodeModal/ConfirmSmsCodeModal';
import RegisterModal from './components/modals/RegisterModal/RegisterModal';
import UserRegisterModal from './components/modals/UserRegisterModal/UserRegisterModal';
import WrapperComponent from './components/Wrappers/WrapperComponent/WrapperComponent';
import { VALIDATE_TOKEN } from './gql/mutation/auth/ValidateToken';
import useToggleVisibility from './hooks/useToggleVisibility';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { logout } from './redux/thunks/auth/Logout';
import { getProfile } from './redux/thunks/user/GetProfile';
import { getUpdateClient } from './requests/updateHeaders';
import { getListRoute } from './routes/getListRoute';
import { routes } from './routes/routes';

function App() {

  const isAuth = useAppSelector(state => state.auth.logged);
  const userId = useAppSelector(state => state.user.data?.id);
  const state = useAppSelector(state => state);
  const dispatcher = useAppDispatch()
  const token = useAppSelector(state => state.auth.token);

  console.log('state')
  console.log(state)
  
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
      setIsAuthModal={setIsAuthModal} />
  )

  const templateUserRegisterModal = isUserRegisterModal && (
    <UserRegisterModal
      closeModal={closeIsUserRegisterModal}
      btnCancelClick={setIsUserRegisterModall}
      setIsAuthModal={setIsAuthModal} />
  )



  return (
    <div className="App">
      <Header />
      <WrapperComponent>
        <Routes>
          {listRoutes}
        </Routes>
      </WrapperComponent>
      <Footer />
      {templateCodeModal}
      {templateAuthModal}
      {templateRegisterModal}
      {templateUserRegisterModal}
    </div>
  )
}

export default App;




import { Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AuthModal from './components/modals/AuthModal/AuthModal';
import ConfirmSmsCodeModal from './components/modals/ConfirmSmsCodeModal/ConfirmSmsCodeModal';
import RegisterModal from './components/modals/RegisterModal/RegisterModal';
import WrapperComponent from './components/Wrappers/WrapperComponent/WrapperComponent';
import useToggleVisibility from './hooks/useToggleVisibility';
import { useAppSelector } from './redux/hooks';
import { getListRoute } from './routes/getListRoute';
import { routes } from './routes/routes';

function App() {

  const isAuth = useAppSelector(state => state.auth.logged);
  const state = useAppSelector(state => state);
  console.log('state')
  console.log(state)

  /** Модалка авторизации */
  const [isAuthModal, setIsAuthModal, closeIsAuthModal] = useToggleVisibility(isAuth ? false : true)

  /** Модалка регистрации */
  const [isRegisterModal, setIsRegisterModal, closeIsRegisterModal] = useToggleVisibility(false)

  /** Модалка ввода кода */
  const [isCodeModal, setIsCodeModal, closeIsCodeModal] = useToggleVisibility(false)

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
    </div>
  )
}

export default App;




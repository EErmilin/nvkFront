import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AuthModal from './components/modals/AuthModal/AuthModal';
import RegisterModal from './components/modals/RegisterModal/RegisterModal';
import WrapperComponent from './components/Wrappers/WrapperComponent/WrapperComponent';
import useToggleVisibility from './hooks/useToggleVisibility';
import Main from './pages/Main/Main';
import { getListRoute } from './routes/getListRoute';
import { routes } from './routes/routes';

function App() {

  /** Модалка авторизации */
  const [isAuthModal, setIsAuthModal, closeIsAuthModal] = useToggleVisibility(true)

  /** Модалка регистрации */
  const [isRegisterModal, setIsRegisterModal, closeIsRegisterModal] = useToggleVisibility(false)

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
      setIsAuthModal={setIsAuthModal} />
  )

  return (
    <div className="App">
      {templateAuthModal}
      {templateRegisterModal}
      <Header />
      <WrapperComponent>
        <Routes>
          {listRoutes}
        </Routes>
      </WrapperComponent>
      <Footer />
    </div>
  )
}

export default App;




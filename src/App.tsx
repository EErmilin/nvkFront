import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import AuthModal from './components/modals/AuthModal/AuthModal';
import useToggleVisibility from './hooks/useToggleVisibility';
import Main from './pages/Main/Main';
import { getListRoute } from './routes/getListRoute';
import { routes } from './routes/routes';

function App() {

  /** Модалка Авторизации */
  const [isAuthModal, setIsAuthModal, closeIsAuthModal] = useToggleVisibility(true)

  const listRoutes = getListRoute(routes)

  /** Модалка отправки кода */
  const templateModalConfirmCode = isAuthModal && (
    <AuthModal
      closeModal={closeIsAuthModal}
      btnCancelClick={setIsAuthModal}/>
  )

  return (
    <div className="App">
      {templateModalConfirmCode}
      <Header />
      <Routes>
        {listRoutes}
      </Routes>
    </div>
  )
}

export default App;




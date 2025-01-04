import React from 'react';
//import Logo from '../../resources/images/logo-minjus.jpg'
import UiButton from '../../components/uibutton/UiButton';
import { getToken } from '../../methods/storage';
import '../../resources/css/UiTitleBar.css';
import { AuthService } from '../../services/api-auth/auth-service';
import { TitleBarProps } from './InterUiTitleBar';

const UiTitleBar: React.FC<TitleBarProps> = ({ data }) => {
  const auth = getToken()

  const handleLogout = async () => {
   const response =  await new AuthService().logout();
   if(response.data) {
    window.location.href = '/'
   }
  }

  return (
    <>
    { auth ? (
      <header className="header">
          <div className="container">
            <div className="logo">
              
            </div>
            <h1>Demo SIAT App</h1>
            <div className="menu">
              { data && (
                <div className="user-info">
                  <p className="user-username">{data.username}</p>
                  <p className="user-fullname">{data.firstname} {data.lastname}</p>
                </div>
              )}
              <UiButton
                  type={'button'}
                  text={''}
                  icon={'Power'}
                  callback={ handleLogout } 
                />
            </div>
          </div>
      </header>
    ) : ("")}
    </>
  );
};

export default UiTitleBar;

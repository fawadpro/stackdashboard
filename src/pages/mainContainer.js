import React from 'react';

// Style Components
import {MainContainerStyle} from '../components/appStyles/appStyles'

export const MainContainer = ({ children }) => {
  return(
    <MainContainerStyle>
<div className="main-container">{children}</div>;
</MainContainerStyle>
  )
};

export default MainContainer;

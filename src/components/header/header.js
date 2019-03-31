import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import IntlMessages from '../../util/intlMessages'

// Style Components
import {HeaderContainer,TopHeaderText, SubHeader , SubHeaderText} from '../appStyles/appStyles';

class Header extends Component {
  render() {
    const pathName=window.location.pathname.substr(1,);

    if(window.location.pathname==='/'){
      return (
        <HeaderContainer>
          <TopHeaderText><IntlMessages id="dashboard.title" /></TopHeaderText>
          <SubHeader>
            <SubHeaderText>
              <Icon name="calendar outline" />
              <IntlMessages id="dashboard.title" /> &emsp; / &emsp;
              <Icon name="calendar outline" />
              <IntlMessages id="dashboard.title" />
            </SubHeaderText>
          </SubHeader>
          </HeaderContainer>
      );
    }
    else {
    return (
      <HeaderContainer>
        <TopHeaderText >{pathName}</TopHeaderText>
        <SubHeader>
          <SubHeaderText>
            <Icon name="calendar outline" />
            {pathName} &emsp; / &emsp;
            <Icon name="calendar outline" />
            {pathName}
          </SubHeaderText>
        </SubHeader>
        </HeaderContainer>
    );
  }
  }
}

export default Header;

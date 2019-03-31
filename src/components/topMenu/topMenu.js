import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

// Styles Components
import {TopMenuStyle} from '../appStyles/appStyles'

class TopMenu extends Component {
render(){
    return (
      <div>
      <Menu pointing secondary style={TopMenuStyle.MenuWrapper}>
        <Menu.Menu postion="left" style={TopMenuStyle.MenuSpaceBetween}>
          <Menu.Item>
            <Link to="dashboard" style={TopMenuStyle.MenuLogo}>Stack and Track</Link>
          </Menu.Item>
        </Menu.Menu>
        </Menu>
        </div>

    );
  }
}


export default TopMenu;

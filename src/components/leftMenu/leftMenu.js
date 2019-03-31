import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import Header from '../header/header';


// Style Components
import {LeftMenuStyle} from '../appStyles/appStyles'


class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: 'dashboard',
    };
  }

  render() {
    const pathName=window.location.pathname.substr(1,);
    const menus = [
      {
        name: 'dashboard',
        icon: 'dashboard',
      },
      {
        name: 'organizations',
        icon: 'sitemap',
      },
      {
        name: 'contacts',
        icon: 'phone square',
      },

      {
        name: 'products',
        icon: 'shopping cart',
      },
      {
        name: 'sales',
        icon: 'credit card',
      },
      {
        name: 'purchases',
        icon: 'shopping bag',
      },
      {
        name: 'shipments',
        icon: 'shipping',
      },
      {
        name: 'everything',
        icon: 'ald',
      },
      {
        name: 'reports',
        icon: 'chart line',
      },
      {
        name: 'logout',
        icon: 'arrow right',
      },

    ];

console.log(pathName)
    return (
      <div>
        <Header />
        <LeftMenuStyle>
        <div className="left-menus">
          {menus.map(item => {
              return (
                <Link to={"/"+item.name} name={item.name} key={item.name}
                  className={pathName===item.name? 'menu active' : 'menu' }
                  onClick={() => this.setState({ activeMenu: item.name })}
                  >
                  <Icon name={item.icon} size="large"/>
                  <span>{item.name}</span>
                </Link>
              )
          })}
        </div>
        </LeftMenuStyle>
      </div>
    );
  }
}

export default LeftMenu;

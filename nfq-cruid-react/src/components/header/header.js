import React from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

import styles from './header.module.scss';

class Header extends React.Component {

  render() {
    return (
      <AppBar position="fixed" color="default" >
        <Toolbar className={styles.toolbar}>
          {this.props.children}
        </Toolbar>
      </AppBar>
    )
  }
};

export default Header;
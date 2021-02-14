import React from 'react';

import styles from './footer.module.scss';

class Footer extends React.Component {

  render() {
    return (
      <div className={styles.container}>
          {this.props.children}
      </div>
    )
  }
};

export default Footer;
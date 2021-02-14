import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import Header from "./components/header";
import Footer from "./components/footer";
import Card from "./components/card";
import TweetList from "./components/tweet-list";
import TweetForm from "./components/tweet-form";

import styles from "./app.module.scss";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#E91E63"
    }
  }
});

class App extends React.Component {
  state = {
    isFormOpen: false
  };
  openForm = () => {
    this.setState({ isFormOpen: true });
  };

  closeForm = () => {
    this.setState({ isFormOpen: false });
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className={styles.app}>
          <Header>
            <Typography variant="h5" className={styles.appTitle}>
              WE CAN CODE Dream Destinations
            </Typography>
          </Header>
          <div className={styles.content}>
            <TweetList />
            <TweetForm
              isOpen={this.state.isFormOpen}
              onClose={this.closeForm}
            />
          </div>
          <Footer>
            <Button
              color="primary"
              variant="extendedFab"
              aria-label="Create"
              onClick={this.openForm}
            >
              Create new destination
            </Button>
          </Footer>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

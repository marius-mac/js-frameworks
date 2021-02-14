import React from "react";
import Modal from "@material-ui/core/Modal";
import styles from "./tweet-form.module.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { addTweet } from "../../actions";

class TweetForm extends React.Component {
  state = {
    title: "",
    description: "",
    imageUrl: ""
  };

  handleSave = () => {
    const { title, description, imageUrl } = this.state;
    if (!title || !description || !imageUrl) {
      return;
    }
    this.saveTweet(title, description, imageUrl);
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  saveTweet = (title, description, imageUrl) => {
    const tweet = {
      title,
      description,
      imageUrl
    };
    addTweet(tweet).then(() => this.setState(this.props.onClose));
  };

  render() {
    const { isOpen, onClose } = this.props;

    return (
      <Modal open={isOpen} onClose={onClose}>
        <div className={styles.modal}>
          <div className={styles.form}>
            <TextField
              label="Title"
              variant="outlined"
              className={styles.input}
              value={this.state.title}
              onChange={this.handleChange("title")}
              required
            />
            <TextField
              className={styles.input}
              label="Description"
              multiline
              variant="outlined"
              required
              onChange={this.handleChange("description")}
              value={this.state.description}
            />
            <TextField
              className={styles.input}
              label="Image URL"
              variant="outlined"
              required
              onChange={this.handleChange("imageUrl")}
              value={this.state.imageUrl}
            />
          </div>
          <div className={styles.actions}>
            <Button
              className={styles.button}
              variant="outlined"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className={styles.button}
              variant="outlined"
              color="primary"
              onClick={this.handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default TweetForm;

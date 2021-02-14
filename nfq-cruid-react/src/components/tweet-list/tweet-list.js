import React from "react";
import Card from "../card";
import style from "./tweet-list.module.scss";
import { tweetsRef } from "../../config/firebase";
import {
  removeTweet,
  isTweetOwner,
  toggleTweetLike,
  isTweetLiked
} from "../../actions";

class TweetList extends React.Component {
  state = {
    tweets: null
  };

  componentDidMount() {
    tweetsRef.on("value", snapshot => {
      const tweets = snapshot.val();
      this.setState({ tweets });
    });
  }

  renderTweets = () => {
    const { tweets } = this.state;
    return tweets
      ? Object.keys(tweets).map(id => (
          <Card
            key={id}
            imageSrc={tweets[id].imageUrl}
            title={tweets[id].title}
            description={tweets[id].description}
            onDelete={() => removeTweet(id)}
            isMine={isTweetOwner(tweets[id])}
            toggleLike={() => toggleTweetLike(id)}
            likesCount={tweets[id].likesCount}
            isLiked={isTweetLiked(tweets[id])}
          />
        ))
      : null;
  };

  render() {
    return <div className={style.cardGrid}>{this.renderTweets()} </div>;
  }
}

export default TweetList;

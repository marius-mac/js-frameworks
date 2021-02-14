import { tweetsRef, getTweetRef } from '../config/firebase';

export const addTweet = newTweet => {
  const tweet = {
    ...newTweet,
    owner: localStorage.getItem('userId'),
    likes: {},
    likesCount: 0
  };

  return new Promise((resolve, reject) => {
    tweetsRef.push().set(tweet, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};

export const removeTweet = (tweetId) => {
    tweetsRef.child(tweetId).remove();
};

export const toggleTweetLike = (tweetId) => {
  const ref = getTweetRef(tweetId);
  const userId = localStorage.getItem('userId');
  ref.transaction((tweet) => {
    if (!tweet.likes) {
      tweet.likes = {};
    }

    if (tweet.likes[userId]) {
      delete tweet.likes[userId];
    } else {
      tweet.likes[userId] = true;
    }
    tweet.likesCount = Object.keys(tweet.likes).length;
    return tweet;
  });
};

export const isTweetLiked = tweet => tweet.likes && !!tweet.likes[localStorage.getItem('userId')];
export const isTweetOwner = tweet => tweet.owner === localStorage.getItem('userId');

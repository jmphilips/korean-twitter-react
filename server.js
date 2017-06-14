require('dotenv').config()

const express = require('express');
const Twitter = require('twitter');
const app = express();

const PORT = process.env.PORT || 3000

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


app.get('/', (req, res) => {
  client.get('search/tweets', {q: 'ㅋ', count: 5, lang: 'ko'}, (error, tweets, response) => {
    console.log(error)
    console.log(tweets)
    res.send(Array.from(processTweets(tweets)).join(''))
  })
})

app.listen(PORT, () => {
  console.log('Listening on port 3000')
});

const processTweets = response => {
  return singleSyllables(filterEnCharacters(filterTweetText(response)))
};

const filterTweetText = tweetArray => {
  return tweetArray.statuses.map(tweet => tweet.text).join('').toLowerCase()
};

const filterEnCharacters = str => {
  return str.replace(/[a-z0-9.<.>/?;:'@_…"]/g, "")
};

const singleSyllables = str => {
  arr = str.split('')
  set = new Set(arr)
  console.log("set      ", set)
  return set
}


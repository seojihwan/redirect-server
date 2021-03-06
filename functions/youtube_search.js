const fetch = require('node-fetch');

const YOUTUBE_SEARCH = 'https://www.googleapis.com/youtube/v3/search';

const getQueryString = params => {
  let queryString = '?';
  for (const [key, value] of Object.entries(params)) {
    queryString += `&${key}=${value}`;
  }

  return encodeURI(queryString);
};

const headers = {
  'Access-Control-Allow-Origin': process.env.ACAO,
};

exports.handler = async event => {
  const { queryStringParameters } = event;
  try {
    const response = await fetch(
      YOUTUBE_SEARCH +
        getQueryString({
          ...queryStringParameters,
          key: process.env.API_KEY,
        })
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(await response.json()),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode,
      headers,
      body: JSON.stringify(err),
    };
  }
};

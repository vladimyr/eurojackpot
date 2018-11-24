'use strict';

const { config } = require('./package.json');
const cheerio = require('cheerio');
const httpGet = require('util').promisify(require('request').get);

const getNumber = $el => parseInt($el.text(), 10);

function getNumbers() {
  return httpGet(config.resultsUrl)
    .then(resp => {
      const $ = cheerio.load(resp.body);
      const $results = $('#results').first().find('li');
      return $results.map((_, el) => getNumber($(el))).get();
    }, () => []);
}

module.exports = { getNumbers };
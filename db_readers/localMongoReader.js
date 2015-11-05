var assert = require('assert');
var Promise = require('promise');

exports.loadDBQuotes = function() {
  return new Promise(readQuotes);
};

/**
 * Iterates through the mongo quotes table and adds all of them to an array
 * Resolves the promise with the array when finished
 */
function readQuotes(resolve, reject) {
  var mongoClient = require('mongodb').MongoClient;
  var mongoUrl = "mongodb://localhost:27017/NodeQOTDDB";
  mongoClient.connect(mongoUrl, function (err, db) {
    assert.equal(err, null, "Error Connecting to the Database");
    var quotesCollection = db.collection('quotes');
    quotesCollection.find().toArray(function (err, quotes) {
      assert.equal(err, null, "Error reading Quotes");
      var quoteArray = [];
      quotes.forEach(function (quote) {
          quoteArray.push(quote["quote"] + " -- " + quote["author"]);
      });
      db.close();
      resolve(quoteArray);
    });
  });
}

const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageUrl, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    return db.collection('products')
    .insertOne(this)
    .then((data) => {
      console.log(data);
    })
    .catch(() => {
      throw 'save error';
    })
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products')
    .find()
    .toArray()
    .then((result)=> {
      return result;
    });
  }

  static findById(prodId) {
    const db = getDb();
    return db
    .collection('products')
    .find({ _id: new mongodb.ObjectID(prodId)})
    .next()
    .then((result) => {
      console.log(result);
      return result
    })
    .catch((error) => console.log(error))
  }
}

module.exports = Product;

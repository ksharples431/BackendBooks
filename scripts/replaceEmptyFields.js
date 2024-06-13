const { MongoClient } = require('mongodb');

const uri =
  'mongodb+srv://ksharples431:UaLhs1z9ARSp2ocF@mybooksapi.ltsgrvl.mongodb.net/MyBooksAPI?retryWrites=true&w=majority'; // Replace with your MongoDB connection string
const dbName = 'MyBooksAPI'; // Replace with your database name
const collectionName = 'books'; // Replace with your collection name

const defaultData = {
  title: 'Title',
  author: 'Author',
  imagePath:
    'https://m.media-amazon.com/images/I/71SI9m9LdYL._AC_UY218_.jpg',
  genre: 'Genre',
  description:
    "To Kill a Mockingbird is both a young girl's coming-of-age story and a darker drama about the roots and consequences of racism and prejudice, probing how good and evil can coexist within a single community or individual.",
  seriesName: 'Series Name',
  seriesNumber: '0',
  format: 'Audiobook',
  owned: true,
  progress: 'Not started',
  favorite: true,
  whereToGet: 'Hoopla',
  wishlist: false,
};

async function updateEmptyFields() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const updatePromises = [];

    for (const [key, value] of Object.entries(defaultData)) {
      const updatePromise = collection.updateMany(
        { [key]: { $in: [null, '', undefined] } },
        { $set: { [key]: value } }
      );
      updatePromises.push(updatePromise);
    }

    await Promise.all(updatePromises);
    console.log('Empty fields updated successfully.');
  } catch (error) {
    console.error('Error updating empty fields:', error);
  } finally {
    await client.close();
  }
}

updateEmptyFields();

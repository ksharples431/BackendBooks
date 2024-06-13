const { MongoClient } = require('mongodb');

async function renameFieldInCollection(
  uri,
  dbName,
  collectionName,
  oldFieldName,
  newFieldName
) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Access the database and collection
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Update all documents to rename the field
    const result = await collection.updateMany(
      { [oldFieldName]: { $exists: true } },
      { $rename: { [oldFieldName]: newFieldName } }
    );

    console.log(`${result.modifiedCount} documents were updated.`);
  } catch (error) {
    console.error('Error renaming field:', error);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Replace the following with your MongoDB connection string, database name, collection name, old field name, and new field name
const uri =
  'mongodb+srv://ksharples431:UaLhs1z9ARSp2ocF@mybooksapi.ltsgrvl.mongodb.net/MyBooksAPI?retryWrites=true&w=majority';
const dbName = 'MyBooksAPI';
const collectionName = 'books';
const oldFieldName = 'read';
const newFieldName = 'progress';

renameFieldInCollection(
  uri,
  dbName,
  collectionName,
  oldFieldName,
  newFieldName
);

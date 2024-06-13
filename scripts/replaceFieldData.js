const { MongoClient } = require('mongodb');

async function updateFieldsInCollection(
  uri,
  dbName,
  collectionName,
  updates
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

    // Update documents with the specified updates
    const result = await collection.updateMany(
      {}, // Update all documents (can add a filter if needed)
      { $set: updates }
    );

    console.log(`${result.modifiedCount} documents were updated.`);
  } catch (error) {
    console.error('Error updating fields:', error);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Replace the following with your MongoDB connection string and database name
const uri =
  'mongodb+srv://ksharples431:UaLhs1z9ARSp2ocF@mybooksapi.ltsgrvl.mongodb.net/MyBooksAPI?retryWrites=true&w=majority';
const dbName = 'MyBooksAPI';
const collectionName = 'books';

// Define the updates object with the desired changes
const updates = {
  progress: 'In Progress',
  whereToGet: 'Audible',
  format: 'Audiobook',
};

updateFieldsInCollection(uri, dbName, collectionName, updates);

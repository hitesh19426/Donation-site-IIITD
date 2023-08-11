const MongoClient = require('mongodb').MongoClient;

const migrateData = async () => {
  const sourceUrl = "Some Link"
  const destUrl = "mongodb+srv://givingSite:mEizyMcTaki8gbMq@donationsite.poiohfn.mongodb.net/?retryWrites=true&w=majority"; //mEizyMcTaki8gbMq;

  const sourceClient = new MongoClient(sourceUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  const destClient = new MongoClient(destUrl, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await sourceClient.connect();
    await destClient.connect();

    const adminDb = destClient.db('admin');
    const adminDatabaseList = await adminDb.admin().listDatabases();
    console.log('Databases:' + JSON.stringify(adminDatabaseList));

    console.log('Databases and Collections:');
    for (const db of adminDatabaseList.databases) {

      console.log(`Database: ${db.name}`);
      const currentDb = destClient.db(db.name);
      const collections = await currentDb.listCollections().toArray();

      for (const collection of collections) {
        console.log(`  Collection: ${collection.name}`);
      }
    }

    const sourceDb = sourceClient.db('test');
    const destDb = destClient.db('donationsite');

    // const collections = ["Category", "donation_data"]
    const collections = await sourceDb.listCollections().toArray();
    console.log(`Found ${collections.length} collections`);
    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      const sourceCollection = sourceDb.collection(collectionName);
      const destCollection = destDb.collection(collectionName);

      const documents = await sourceCollection.find({}).toArray();
      console.log(`Found ${documents.length} documents in ${collectionName}`);

      if (documents.length > 0) {
        await destCollection.insertMany(documents);
        console.log(`Migrated ${documents.length} documents from ${collectionName}`);
      } else {
        console.log(`No documents to migrate in ${collectionName}`);
      }
    }
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    sourceClient.close();
    destClient.close();
  }
}

migrateData();

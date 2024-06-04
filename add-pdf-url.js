const { MongoClient } = require('mongodb');
const db = require('./db');

const uri = process.env.MONGODB;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
  await db();
  console.log('Connected to database!');

  const dbName = 'Cluster0';
  const collectionName = 'PDF';
  const pdfUrl = 'https://akdavis83.github.io/Alan-Davis/downloads';

  const dbObject = client.db(dbName);
  const collectionObject = dbObject.collection(collectionName);

  const result = await collectionObject.insertOne({ pdfUrl });
  console.log(`Added PDF URL to database: ${result.insertedId}`);
}

main().catch(console.error);
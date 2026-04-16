//@ts-check

const mongoose = require('mongoose');
const ExerciseLibrary = require('../models/ExerciseLibrary');

const SOURCE_URI = process.env.SOURCE_MONGODB_URI;
const TARGET_URI = process.env.TARGET_MONGODB_URI;
const BATCH_SIZE = Math.max(Number(process.env.COPY_BATCH_SIZE) || 200, 1);
const CLEAR_TARGET = String(process.env.COPY_CLEAR_TARGET || 'false').toLowerCase() === 'true';

const run = async () => {
  if (!SOURCE_URI || !TARGET_URI) {
    throw new Error('Missing SOURCE_MONGODB_URI or TARGET_MONGODB_URI in environment');
  }

  const sourceConn = await mongoose.createConnection(SOURCE_URI).asPromise();
  const targetConn = await mongoose.createConnection(TARGET_URI).asPromise();

  try {
    const sourceModel = sourceConn.model('ExerciseLibrary', ExerciseLibrary.schema);
    const targetModel = targetConn.model('ExerciseLibrary', ExerciseLibrary.schema);

    if (CLEAR_TARGET) {
      await targetModel.deleteMany({});
      console.log('Cleared target ExerciseLibrary collection');
    }

    const cursor = sourceModel.find({}).lean().cursor();
    let batch = [];
    let readCount = 0;
    let writeCount = 0;

    for await (const doc of cursor) {
      const cleanDoc = { ...doc };
      delete cleanDoc.__v;
      batch.push(cleanDoc);
      readCount += 1;

      if (batch.length >= BATCH_SIZE) {
        const result = await targetModel.bulkWrite(
          batch.map((item) => ({
            replaceOne: {
              filter: { _id: item._id },
              replacement: item,
              upsert: true,
            },
          })),
          { ordered: false },
        );

        writeCount += result.upsertedCount + result.modifiedCount + result.matchedCount;
        console.log(`Processed ${readCount} records`);
        batch = [];
      }
    }

    if (batch.length > 0) {
      const result = await targetModel.bulkWrite(
        batch.map((item) => ({
          replaceOne: {
            filter: { _id: item._id },
            replacement: item,
            upsert: true,
          },
        })),
        { ordered: false },
      );

      writeCount += result.upsertedCount + result.modifiedCount + result.matchedCount;
    }

    const sourceTotal = await sourceModel.countDocuments({});
    const targetTotal = await targetModel.countDocuments({});

    console.log('Copy complete');
    console.log(`Source total: ${sourceTotal}`);
    console.log(`Target total: ${targetTotal}`);
    console.log(`Read: ${readCount}`);
    console.log(`Writes touched: ${writeCount}`);
  } finally {
    await sourceConn.close();
    await targetConn.close();
  }
};

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });

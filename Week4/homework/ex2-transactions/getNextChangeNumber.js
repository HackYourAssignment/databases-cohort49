function createCounter(db, id) {
  return db.collection('counters').insertOne({
    _id: id,
    sequence_value: 0,
  });
}

async function getNextCount(db, id) {
  const sequenceDocument = await db
    .collection('counters')
    .findOneAndUpdate(
      { _id: id },
      { $inc: { sequence_value: 1 } },
      { returnDocument: 'after' },
    );

  return sequenceDocument.sequence_value;
}

export { createCounter, getNextCount };

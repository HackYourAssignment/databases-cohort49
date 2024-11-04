export default async function getNextChangeNumber(db) {
  const sequenceDocument = await db
    .collection('counters')
    .findOneAndUpdate(
      { _id: 'change_number' },
      { $inc: { sequence_value: 1 } },
      { returnDocument: 'after' },
    );

  return sequenceDocument.sequence_value;
}

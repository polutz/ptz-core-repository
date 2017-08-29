import { MongoClient } from 'mongodb';
import R from 'ramda';
const getDb = async (url) => await MongoClient.connect(url);
const getDbCollection = R.curry((db, collectionName) => db.collection(collectionName));
export const createRepository = R.curry(async (url, collectionName) => {
    const db = await getDb(url);
    const collection = getDbCollection(db, collectionName);
    return {
        db,
        collectionName,
        getDbCollection,
        save: save(collection),
        getById: getById(collection),
        getByIds: getByIds(collection),
        find: find(collection),
    };
});
const save = R.curry(async (collection, entity) => {
    const result = await collection.replaceOne({ _id: entity.id }, entity, { upsert: true });
    return result.ops[0];
});
const getById = R.curry((collection, id) => collection.findOne({ _id: id }));
const getByIds = R.curry((collection, ids) => collection.find({ _id: { $in: ids } }).toArray());
// TODO add FindOptions type to options and remove any when DefinitelyTypes
// includes find(collection, options:FindOptions)
const find = R.curry((collection, query, options) => collection.find(query, options).toArray());
export { save, find, getDb, getDbCollection, getById, getByIds };
//# sourceMappingURL=BaseRepository.js.map

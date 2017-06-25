import R from 'ramda';
const getCollection = R.curry((db, collectionName) => db.collection(collectionName));
const save = R.curry(async (collection, entity) => {
    const result = await collection
        .replaceOne({ _id: entity.id }, entity, { upsert: true });
    entity = result.ops[0];
    return Promise.resolve(entity);
});
const getById = R.curry((collection, id) => {
    const query = {
        _id: id
    };
    return collection
        .findOne(query);
});
const getByIds = R.curry((collection, ids) => {
    const query = {
        _id: {
            $in: ids
        }
    };
    return collection
        .find(query)
        .toArray();
});
const find = R.curry((collection, query, options) => collection.find(query, {}, options).toArray());
export { save, find, getCollection, getById, getByIds };
//# sourceMappingURL=BaseRepository.js.map
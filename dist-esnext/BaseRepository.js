import R from 'ramda';
const getDbCollection = R.curry((db, collectionName) => {
    return db.collection(collectionName);
});
const save = R.curry(async (fnGetDbCollection, entity) => {
    const result = await fnGetDbCollection
        .replaceOne({ _id: entity.id }, entity, { upsert: true });
    entity = result.ops[0];
    return Promise.resolve(entity);
});
const getById = R.curry((fnGetDbCollection, id) => {
    const query = {
        _id: id
    };
    return fnGetDbCollection
        .findOne(query);
});
const getByIds = R.curry((fnGetDbCollection, ids) => {
    const query = {
        _id: {
            $in: ids
        }
    };
    return fnGetDbCollection
        .find(query)
        .toArray();
});
const find = R.curry((fnGetDbCollection, query, options) => {
    const result = fnGetDbCollection
        .find(query, {}, options)
        .toArray();
    return result;
});
export { save, find, getDbCollection, getById, getByIds };
//# sourceMappingURL=BaseRepository.js.map
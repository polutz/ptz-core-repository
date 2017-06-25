const getDbCollection = (db, collectionName) => {
    return db.collection(collectionName);
};
const save = async (entity, db, collectionName) => {
    const result = await getDbCollection(db, collectionName)
        .replaceOne({ _id: entity.id }, entity, { upsert: true });
    entity = result.ops[0];
    return Promise.resolve(entity);
};
const getById = (id, db, collectionName) => {
    const query = {
        _id: id
    };
    return getDbCollection(db, collectionName)
        .findOne(query);
};
const getByIds = (ids, db, collectionName) => {
    const query = {
        _id: {
            $in: ids
        }
    };
    return getDbCollection(db, collectionName)
        .find(query)
        .toArray();
};
const find = (query, options, db, collectionName) => {
    const result = getDbCollection(db, collectionName)
        .find(query, {}, options)
        .toArray();
    return result;
};
export { save, find, getDbCollection, getById, getByIds };
//# sourceMappingURL=BaseRepository.js.map
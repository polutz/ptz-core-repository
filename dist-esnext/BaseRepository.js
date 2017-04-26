export class BaseRepository {
    constructor(db, collectionName) {
        this.db = db;
        this.collectionName = collectionName;
    }
    getDbCollection() {
        return this.db.collection(this.collectionName);
    }
    async save(entity) {
        const result = await this.getDbCollection()
            .replaceOne({ _id: entity.id }, entity, { upsert: true });
        entity = result.ops[0];
        return Promise.resolve(entity);
    }
    getById(id) {
        const query = {
            _id: id
        };
        return this.getDbCollection()
            .findOne(query);
    }
    getByIds(ids) {
        const query = {
            _id: {
                $in: ids
            }
        };
        return this.getDbCollection()
            .find(query)
            .toArray();
    }
    find(query, options) {
        const result = this.getDbCollection()
            .find(query, {}, options)
            .toArray();
        return result;
    }
}
//# sourceMappingURL=BaseRepository.js.map
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class BaseRepository {
    constructor(db, collectionName) {
        this.db = db;
        this.collectionName = collectionName;
    }
    getDbCollection() {
        return this.db.collection(this.collectionName);
    }
    save(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getDbCollection()
                .replaceOne({ _id: entity.id }, entity, { upsert: true });
            entity = result.ops[0];
            return Promise.resolve(entity);
        });
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
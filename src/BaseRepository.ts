import { IBaseRepository, IEntityMinBase } from 'ptz-core-domain';

export default class BaseRepository<T> implements IBaseRepository<T> {
    collectionName: string;
    db;

    constructor(db, collectionName: string) {
        this.db = db;
        this.collectionName = collectionName;
    }

    getDbCollection() {
        return this.db.collection(this.collectionName);
    }

    async save(entity: IEntityMinBase): Promise<IEntityMinBase> {
        const result = await this.getDbCollection()
            .replaceOne({ _id: entity.id }, entity, { upsert: true });
        entity = result.ops[0];
        return Promise.resolve(entity);
    }

    getById(id: string): Promise<IEntityMinBase> {
        const query = {
            _id: id
        };

        return this.getDbCollection()
            .findOne(query);
    }

    getByIds(ids: string[]): Promise<IEntityMinBase[]> {
        const query = {
            _id: {
                $in: ids
            }
        };

        return this.getDbCollection()
            .find(query)
            .toArray();
    }

    find(query: any, options: { limit: number }): Promise<IEntityMinBase[]> {
        const result = this.getDbCollection()
            .find(query, {}, options)
            .toArray();

        return result;
    }
}

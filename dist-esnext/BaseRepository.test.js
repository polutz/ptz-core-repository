import { equal, ok } from 'ptz-assert';
import * as BaseRepository from './index';
const MONGO_URL = 'mongodb://localhost:27017/ptz-core-repo';
var db;
var collection;
var save;
describe('BaseRepository', () => {
    beforeEach(async () => {
        db = await BaseRepository.getDb(MONGO_URL);
        collection = BaseRepository.getDbCollection(db, 'test-collection');
        save = BaseRepository.save(collection);
    });
    describe('save', () => {
        it('insert', async () => {
            const entity = {
                id: 'testid'
            };
            await save(entity);
            const entityDb = await BaseRepository.getById(collection, entity.id);
            ok(entityDb);
            equal(entityDb.id, entity.id);
        });
        it('update', async () => {
            const entity = {
                id: 'testid'
            };
            entity['name'] = 'teste';
            await save(entity);
            const newName = 'teste2';
            entity['name'] = newName;
            await save(entity);
            const entityDb = await BaseRepository.getById(collection, entity.id);
            ok(entityDb);
            equal(entityDb.id, entity.id);
            equal(entityDb['name'], newName);
        });
    });
    describe('find', () => {
        it('by Email', async () => {
            const entity = {
                id: 'testid'
            };
            entity['email'] = 'angeloocana@gmail.com';
            await save(entity);
            const query = {
                email: entity['email']
            };
            const entityDb = await BaseRepository.find(collection, query, { limit: 1 });
            ok(entityDb[0]);
            equal(entityDb[0]['email'], entity['email']);
        });
        it('limit by 3', async () => {
            for (let i = 0; i <= 6; i++) {
                const entity = {
                    id: 'test' + i
                };
                entity['testLimit'] = true;
                entity['i'] = i;
                await save(entity);
            }
            const query = {
                testLimit: true
            };
            const entitiesDb = await BaseRepository.find(collection, query, { limit: 3 });
            equal(entitiesDb.length, 3);
        });
    });
    describe('getByIds', () => {
        it('get 3 entities by ids', async () => {
            const entities = [];
            for (let i = 0; i <= 6; i++) {
                const entity = {
                    id: 'test' + i
                };
                entity['i'] = i;
                entities.push(entity);
                await save(entity);
            }
            const entitiesDb = await BaseRepository.getByIds(collection, [
                entities[0].id, entities[1].id, entities[2].id
            ]);
            equal(entitiesDb.length, 3);
        });
    });
});
//# sourceMappingURL=BaseRepository.test.js.map
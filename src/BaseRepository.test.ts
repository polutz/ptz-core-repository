import { Collection, Db, MongoClient } from 'mongodb';
import { equal, ok } from 'ptz-assert';
import { IEntityMinBase } from 'ptz-core-domain';
import * as  BaseRepository from './index';

const MONGO_URL = 'mongodb://localhost:27017/ptz-core-repo';
var db: Db;
var collection: Collection<IEntityMinBase>;
var save;
/* tslint:disable:no-string-literal */
describe('BaseRepository', () => {
    beforeEach(async () => {
        db = await MongoClient.connect(MONGO_URL);
        collection = BaseRepository.getCollection(db, 'testConnection');
        save = BaseRepository.save(collection);
    });

    describe('save', () => {
        it('insert', async () => {
            const entity: IEntityMinBase = {
                id: 'testid'
            };

            await save(entity);

            const entityDb = await BaseRepository.getById(collection, entity.id);
            ok(entityDb);
            equal(entityDb.id, entity.id);
        });

        it('update', async () => {
            const entity: IEntityMinBase = {
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
            const entity: IEntityMinBase = {
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
                const entity: IEntityMinBase = {
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
            const entities: IEntityMinBase[] = [];

            for (let i = 0; i <= 6; i++) {
                const entity: IEntityMinBase = {
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

/* tslint:enable:no-string-literal */

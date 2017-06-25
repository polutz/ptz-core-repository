import { MongoClient } from 'mongodb';
import { equal, ok } from 'ptz-assert';
import { IBaseRepository, IEntityMinBase } from 'ptz-core-domain';
import * as  BaseRepository from './index';

const MONGO_URL = 'mongodb://localhost:27017/relay';
var db: IBaseRepository<any>;

/* tslint:disable:no-string-literal */
describe('BaseRepository', () => {
    beforeEach(async () => {
        db = await MongoClient.connect(MONGO_URL);
    });

    describe('save', () => {
        it('insert', async () => {
            const entity: IEntityMinBase = {
                errors: [],
                id: 'testid'
            };

            await BaseRepository.save(entity, db, 'testConnection');

            const entityDb = await BaseRepository.getById(entity.id, db, 'testConnection');
            ok(entityDb);
            equal(entityDb.id, entity.id);
        });

        it('update', async () => {
            const entity: IEntityMinBase = {
                errors: [],
                id: 'testid'
            };

            entity['name'] = 'teste';

            await BaseRepository.save(entity, db, 'testConnection');

            const newName = 'teste2';
            entity['name'] = newName;

            await BaseRepository.save(entity, db, 'testConnection');

            const entityDb = await BaseRepository.getById(entity.id, db, 'testConnection');

            ok(entityDb);
            equal(entityDb.id, entity.id);
            equal(entityDb['name'], newName);
        });
    });

    describe('find', () => {
        it('by Email', async () => {
            const entity: IEntityMinBase = {
                errors: [],
                id: 'testid'
            };

            entity['email'] = 'angeloocana@gmail.com';

            await BaseRepository.save(entity, db, 'testConnection');

            const query = {
                email: entity['email']
            };

            const entityDb = await BaseRepository.find(query, { limit: 1 }, db, 'testConnection');

            ok(entityDb[0]);
            equal(entityDb[0]['email'], entity['email']);
        });

        it('limit by 3', async () => {
            for (let i = 0; i <= 6; i++) {
                const entity: IEntityMinBase = {
                    errors: [],
                    id : 'test' + i
                };

                entity['testLimit'] = true;
                entity['i'] = i;
                await BaseRepository.save(entity, db, 'testConnection');
            }
            const query = {
                testLimit: true
            };

            const entitiesDb = await BaseRepository.find(query, { limit: 3 }, db, 'testConnection');

            equal(entitiesDb.length, 3);
        });
    });

    describe('getByIds', () => {
        it('get 3 entities by ids', async () => {
            const entities: IEntityMinBase[] = [];

            for (let i = 0; i <= 6; i++) {
                const entity: IEntityMinBase = {
                    errors: [],
                    id : 'test' + i
                };

                entity['i'] = i;
                entities.push(entity);
                await BaseRepository.save(entity, db, 'testConnection');
            }

            const entitiesDb = await BaseRepository.getByIds([
                entities[0].id, entities[1].id, entities[2].id
            ], db, 'testConnection');

            equal(entitiesDb.length, 3);
        });
    });
});

/* tslint:enable:no-string-literal */

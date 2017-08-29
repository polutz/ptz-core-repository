import { equal, ok } from 'ptz-assert';
import { createRepository } from './index';
const MONGO_URL = 'mongodb://localhost:27017/ptz-core-repo';
var baseRepository;
/* tslint:disable:no-string-literal */
describe('BaseRepository', () => {
    beforeEach(async () => {
        baseRepository = await createRepository(MONGO_URL, 'test-collection');
    });
    describe('save', () => {
        it('insert', async () => {
            const entity = {
                id: 'testid',
                name: 'testName'
            };
            await baseRepository.save(entity);
            const entityDb = await baseRepository.getById(entity.id);
            ok(entityDb);
            equal(entityDb.id, entity.id);
        });
        it('update', async () => {
            const entity = {
                id: 'testid',
                name: 'testName'
            };
            entity['name'] = 'teste';
            await baseRepository.save(entity);
            const newName = 'teste2';
            entity['name'] = newName;
            await baseRepository.save(entity);
            const entityDb = await baseRepository.getById(entity.id);
            ok(entityDb);
            equal(entityDb.id, entity.id);
            equal(entityDb['name'], newName);
        });
    });
    describe('find', () => {
        it('by Email', async () => {
            const entity = {
                id: 'testid',
                name: 'testName'
            };
            entity['email'] = 'angeloocana@gmail.com';
            await baseRepository.save(entity);
            const query = {
                email: entity['email']
            };
            const entityDb = await baseRepository.find(query, { limit: 1 });
            ok(entityDb[0]);
            equal(entityDb[0]['email'], entity['email']);
        });
        it('limit by 3', async () => {
            for (let i = 0; i <= 6; i++) {
                const entity = {
                    name: 'testName',
                    id: 'test' + i
                };
                entity['testLimit'] = true;
                entity['i'] = i;
                await baseRepository.save(entity);
            }
            const query = {
                testLimit: true
            };
            const entitiesDb = await baseRepository.find(query, { limit: 3 });
            equal(entitiesDb.length, 3);
        });
    });
    describe('getByIds', () => {
        it('get 3 entities by ids', async () => {
            const entities = [];
            for (let i = 0; i <= 6; i++) {
                const entity = {
                    name: 'testName',
                    id: 'test' + i
                };
                entity['i'] = i;
                entities.push(entity);
                await baseRepository.save(entity);
            }
            const entitiesDb = await baseRepository.getByIds([
                entities[0].id, entities[1].id, entities[2].id
            ]);
            equal(entitiesDb.length, 3);
        });
    });
});
/* tslint:enable:no-string-literal */
//# sourceMappingURL=BaseRepository.test.js.map
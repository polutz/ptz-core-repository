'use strict';

var _ptzAssert = require('ptz-assert');

var _index = require('./index');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const MONGO_URL = 'mongodb://localhost:27017/ptz-core-repo';
var baseRepository;
/* tslint:disable:no-string-literal */
describe('BaseRepository', () => {
    beforeEach(_asyncToGenerator(function* () {
        baseRepository = yield (0, _index.createRepository)(MONGO_URL, 'test-collection');
    }));
    describe('save', () => {
        it('insert', _asyncToGenerator(function* () {
            const entity = {
                id: 'testid',
                name: 'testName'
            };
            yield baseRepository.save(entity);
            const entityDb = yield baseRepository.getById(entity.id);
            (0, _ptzAssert.ok)(entityDb);
            (0, _ptzAssert.equal)(entityDb.id, entity.id);
        }));
        it('update', _asyncToGenerator(function* () {
            const entity = {
                id: 'testid',
                name: 'testName'
            };
            entity['name'] = 'teste';
            yield baseRepository.save(entity);
            const newName = 'teste2';
            entity['name'] = newName;
            yield baseRepository.save(entity);
            const entityDb = yield baseRepository.getById(entity.id);
            (0, _ptzAssert.ok)(entityDb);
            (0, _ptzAssert.equal)(entityDb.id, entity.id);
            (0, _ptzAssert.equal)(entityDb['name'], newName);
        }));
    });
    describe('find', () => {
        it('by Email', _asyncToGenerator(function* () {
            const entity = {
                id: 'testid',
                name: 'testName'
            };
            entity['email'] = 'angeloocana@gmail.com';
            yield baseRepository.save(entity);
            const query = {
                email: entity['email']
            };
            const entityDb = yield baseRepository.find(query, { limit: 1 });
            (0, _ptzAssert.ok)(entityDb[0]);
            (0, _ptzAssert.equal)(entityDb[0]['email'], entity['email']);
        }));
        it('limit by 3', _asyncToGenerator(function* () {
            for (let i = 0; i <= 6; i++) {
                const entity = {
                    name: 'testName',
                    id: 'test' + i
                };
                entity['testLimit'] = true;
                entity['i'] = i;
                yield baseRepository.save(entity);
            }
            const query = {
                testLimit: true
            };
            const entitiesDb = yield baseRepository.find(query, { limit: 3 });
            (0, _ptzAssert.equal)(entitiesDb.length, 3);
        }));
    });
    describe('getByIds', () => {
        it('get 3 entities by ids', _asyncToGenerator(function* () {
            const entities = [];
            for (let i = 0; i <= 6; i++) {
                const entity = {
                    name: 'testName',
                    id: 'test' + i
                };
                entity['i'] = i;
                entities.push(entity);
                yield baseRepository.save(entity);
            }
            const entitiesDb = yield baseRepository.getByIds([entities[0].id, entities[1].id, entities[2].id]);
            (0, _ptzAssert.equal)(entitiesDb.length, 3);
        }));
    });
});
/* tslint:enable:no-string-literal */
//# sourceMappingURL=BaseRepository.test.js.map
//# sourceMappingURL=BaseRepository.test.js.map
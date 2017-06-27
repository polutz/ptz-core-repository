import { ok } from 'ptz-assert';
import * as index from './index';

describe('ptz-core-repository', () => {
    describe('exports', () => {
        it('save', () => ok(index.save));
        it('find', () => ok(index.find));
        it('getDb', () => ok(index.getDb));
        it('getCollection', () => ok(index.getDbCollection));
        it('getById', () => ok(index.getById));
        it('getByIds', () => ok(index.getByIds));
    });
});

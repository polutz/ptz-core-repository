'use strict';

var _ptzAssert = require('ptz-assert');

var _index = require('./index');

var index = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('ptz-core-repository', () => {
    describe('exports', () => {
        it('save', () => (0, _ptzAssert.ok)(index.save));
        it('find', () => (0, _ptzAssert.ok)(index.find));
        it('getDb', () => (0, _ptzAssert.ok)(index.getDb));
        it('getCollection', () => (0, _ptzAssert.ok)(index.getDbCollection));
        it('getById', () => (0, _ptzAssert.ok)(index.getById));
        it('getByIds', () => (0, _ptzAssert.ok)(index.getByIds));
    });
});
//# sourceMappingURL=index.test.js.map
//# sourceMappingURL=index.test.js.map
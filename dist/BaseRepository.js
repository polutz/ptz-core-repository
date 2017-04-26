"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var BaseRepository = exports.BaseRepository = function () {
    function BaseRepository(db, collectionName) {
        _classCallCheck(this, BaseRepository);

        this.db = db;
        this.collectionName = collectionName;
    }

    _createClass(BaseRepository, [{
        key: "getDbCollection",
        value: function getDbCollection() {
            return this.db.collection(this.collectionName);
        }
    }, {
        key: "save",
        value: function save(entity) {
            return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
                var result;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.getDbCollection().replaceOne({ _id: entity.id }, entity, { upsert: true });

                            case 2:
                                result = _context.sent;

                                entity = result.ops[0];
                                return _context.abrupt("return", Promise.resolve(entity));

                            case 5:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "getById",
        value: function getById(id) {
            var query = {
                _id: id
            };
            return this.getDbCollection().findOne(query);
        }
    }, {
        key: "getByIds",
        value: function getByIds(ids) {
            var query = {
                _id: {
                    $in: ids
                }
            };
            return this.getDbCollection().find(query).toArray();
        }
    }, {
        key: "find",
        value: function find(query, options) {
            var result = this.getDbCollection().find(query, {}, options).toArray();
            return result;
        }
    }]);

    return BaseRepository;
}();
//# sourceMappingURL=BaseRepository.js.map
//# sourceMappingURL=BaseRepository.js.map
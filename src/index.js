'use strict';
const __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.reactions = exports.messages = void 0;
const fetchMessages_1 = __importDefault(require('./functions/fetchMessages'));
const fetchReactions_1 = __importDefault(require('./functions/fetchReactions'));
exports.messages = fetchMessages_1.default;
exports.reactions = fetchReactions_1.default;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdleDeadlineMock = exports.IdleCallbackScheduler = exports.RequestAnimationFrameScheduler = exports.SetTimeoutScheduler = exports.BaseScheduler = void 0;
const base_1 = __importDefault(require("./base"));
exports.BaseScheduler = base_1.default;
const set_timeout_1 = __importStar(require("./set-timeout"));
exports.SetTimeoutScheduler = set_timeout_1.default;
Object.defineProperty(exports, "IdleDeadlineMock", { enumerable: true, get: function () { return set_timeout_1.IdleDeadlineMock; } });
const request_animation_frame_1 = __importDefault(require("./request-animation-frame"));
exports.RequestAnimationFrameScheduler = request_animation_frame_1.default;
const idle_callback_1 = __importDefault(require("./idle-callback"));
exports.IdleCallbackScheduler = idle_callback_1.default;

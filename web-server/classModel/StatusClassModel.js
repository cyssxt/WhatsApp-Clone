"use strict";
exports.__esModule = true;
exports.UserModel = exports.StatusItemModel = exports.StatusClassModel = void 0;
var StatusClassModel = /** @class */ (function () {
    function StatusClassModel(data) {
        this.userId = data.userId;
        this.userName = data.userName;
        this.lastStatusTime = data.lastStatusTime;
        this.status = [new StatusItemModel(data.status[0])];
    }
    return StatusClassModel;
}());
exports.StatusClassModel = StatusClassModel;
var StatusItemModel = /** @class */ (function () {
    function StatusItemModel(data) {
        this.image = data.image;
        this.message = data.message;
        this.seenUsers = [data.seenUsers[0]];
        this.time = data.time;
    }
    return StatusItemModel;
}());
exports.StatusItemModel = StatusItemModel;
var UserModel = /** @class */ (function () {
    function UserModel(seenUsers) {
        this.userId = seenUsers.userId;
    }
    return UserModel;
}());
exports.UserModel = UserModel;

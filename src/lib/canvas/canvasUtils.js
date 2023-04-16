"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasUtils = void 0;
var CanvasUtils = /** @class */ (function () {
    function CanvasUtils() {
    }
    CanvasUtils.prototype.createEmptyCanvas = function () {
        var emptyCanvas = document.createElement('canvas');
        return { emptyCanvas: emptyCanvas, ctx: emptyCanvas.getContext('2d') };
    };
    CanvasUtils.prototype.grayscaleRGBAArray = function (data) {
        for (var i = 0; i < data.length; i += 4) {
            var grayScaledColor = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = grayScaledColor;
            data[i + 1] = grayScaledColor;
            data[i + 2] = grayScaledColor;
        }
    };
    CanvasUtils.prototype.invertRGBAArray = function (data) {
        for (var i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
        }
    };
    CanvasUtils.prototype.fetchImage = function (url) {
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = function () {
                resolve(img);
            };
            img.onerror = function () {
                reject("Can't download the image from ".concat(url));
            };
            img.src = url;
        });
    };
    CanvasUtils.prototype.grayscaleFromUrl = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _a = _this.createEmptyCanvas(), emptyCanvas = _a.emptyCanvas, ctx = _a.ctx;
            _this.fetchImage(url).then(function (img) {
                ctx.drawImage(img, 0, 0);
                var newImageData = ctx.getImageData(0, 0, emptyCanvas.width, emptyCanvas.height);
                _this.grayscaleRGBAArray(newImageData.data);
                resolve(newImageData);
            }).catch(reject);
        });
    };
    CanvasUtils.prototype.grayscaleFromCanvas = function (canvas) {
        var defaultCtx = canvas.getContext('2d');
        var _a = this.createEmptyCanvas(), emptyCanvas = _a.emptyCanvas, ctx = _a.ctx;
        emptyCanvas.height = canvas.height;
        emptyCanvas.width = canvas.width;
        ctx.putImageData(defaultCtx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
        var imageData = ctx.getImageData(0, 0, emptyCanvas.width, emptyCanvas.height);
        this.grayscaleRGBAArray(imageData.data);
        return imageData;
    };
    CanvasUtils.prototype.grayscaleFromImageData = function (imageData) {
        var _a = this.createEmptyCanvas(), emptyCanvas = _a.emptyCanvas, ctx = _a.ctx;
        ctx.putImageData(imageData, 0, 0);
        var newImageData = ctx.getImageData(0, 0, emptyCanvas.width, emptyCanvas.height);
        this.grayscaleRGBAArray(newImageData.data);
        return newImageData;
    };
    CanvasUtils.prototype.invertFromUrl = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _a = _this.createEmptyCanvas(), emptyCanvas = _a.emptyCanvas, ctx = _a.ctx;
            _this.fetchImage(url).then(function (img) {
                ctx.drawImage(img, 0, 0);
                var newImageData = ctx.getImageData(0, 0, emptyCanvas.width, emptyCanvas.height);
                _this.invertRGBAArray(newImageData.data);
                resolve(newImageData);
            }).catch(reject);
        });
    };
    CanvasUtils.prototype.invertFromCanvas = function (canvas) {
        var defaultCtx = canvas.getContext('2d');
        var _a = this.createEmptyCanvas(), emptyCanvas = _a.emptyCanvas, ctx = _a.ctx;
        emptyCanvas.height = canvas.height;
        emptyCanvas.width = canvas.width;
        ctx.putImageData(defaultCtx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
        var imageData = ctx.getImageData(0, 0, emptyCanvas.width, emptyCanvas.height);
        this.invertRGBAArray(imageData.data);
        return imageData;
    };
    CanvasUtils.prototype.invertFromImageData = function (imageData) {
        var _a = this.createEmptyCanvas(), emptyCanvas = _a.emptyCanvas, ctx = _a.ctx;
        ctx.putImageData(imageData, 0, 0);
        var newImageData = ctx.getImageData(0, 0, emptyCanvas.width, emptyCanvas.height);
        this.invertRGBAArray(newImageData.data);
        return newImageData;
    };
    return CanvasUtils;
}());
exports.CanvasUtils = CanvasUtils;

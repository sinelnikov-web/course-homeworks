export class CanvasUtils {
    createEmptyCanvas() {
        const emptyCanvas = document.createElement("canvas");
        return {emptyCanvas, ctx: emptyCanvas.getContext("2d")};
    }
    grayscaleRGBAArray(data) {
        for (let i = 0; i < data.length; i += 4) {
            let grayScaledColor = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = grayScaledColor;
            data[i + 1] = grayScaledColor;
            data[i + 2] = grayScaledColor;
        }
    }
    invertRGBAArray(data) {
        for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
        }
    }
    fetchImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                resolve(img);
            };
            img.onerror = () => {
                reject(`Can't download the image from ${url}`);
            };
            img.src = url;
        });
    }
    grayscaleFromUrl(url) {
        return new Promise((resolve, reject) => {
            const {emptyCanvas, ctx} = this.createEmptyCanvas();
            this.fetchImage(url).then((img) => {
                emptyCanvas.width = img.width;
                emptyCanvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                let newImageData = ctx.getImageData(0, 0, img.width, img.height);
                this.grayscaleRGBAArray(newImageData.data);
                resolve({data: newImageData, width: img.width, height: img.height});
            }).catch(reject);
        });
    }

    grayscaleFromCanvas(canvas) {
        const defaultCtx = canvas.getContext("2d");
        const {emptyCanvas, ctx} = this.createEmptyCanvas();
        emptyCanvas.height = canvas.height;
        emptyCanvas.width = canvas.width;
        ctx.putImageData(defaultCtx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
        const imageData = ctx.getImageData(0, 0, emptyCanvas.width, emptyCanvas.height);
        this.grayscaleRGBAArray(imageData.data);
        return imageData;
    }

    grayscaleFromImageData(imageData) {
        const {emptyCanvas, ctx} = this.createEmptyCanvas();
        ctx.putImageData(imageData, 0, 0);
        const newImageData = ctx.getImageData(0, 0, emptyCanvas.width, emptyCanvas.height);
        this.grayscaleRGBAArray(newImageData.data);
        return newImageData;
    }

    invertFromUrl(url) {
        return new Promise((resolve, reject) => {
            const {emptyCanvas, ctx} = this.createEmptyCanvas();
            this.fetchImage(url).then((img) => {
                emptyCanvas.width = img.width;
                emptyCanvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                let newImageData = ctx.getImageData(0, 0, img.width, img.height);
                this.invertRGBAArray(newImageData.data);
                resolve({data: newImageData, width: img.width,  height: img.height});
            }).catch(reject);
        });
    }

    invertFromCanvas(canvas) {
        const defaultCtx = canvas.getContext("2d");
        const {emptyCanvas, ctx} = this.createEmptyCanvas();
        emptyCanvas.height = canvas.height;
        emptyCanvas.width = canvas.width;
        ctx.putImageData(defaultCtx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
        const imageData = ctx.getImageData(0, 0, emptyCanvas.width, emptyCanvas.height);
        this.invertRGBAArray(imageData.data);
        return imageData;
    }

    invertFromImageData(imageData) {
        const {emptyCanvas, ctx} = this.createEmptyCanvas();
        ctx.putImageData(imageData, 0, 0);
        const newImageData = ctx.getImageData(0, 0, emptyCanvas.width, emptyCanvas.height);
        this.invertRGBAArray(newImageData.data);
        return newImageData;
    }
}
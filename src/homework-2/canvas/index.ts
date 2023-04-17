import {CanvasUtils} from "../../lib/canvas";
const canvasUtils = new CanvasUtils();

const canvasNormal = document.querySelector<HTMLCanvasElement>("#normal");
const canvasGrayscale = document.querySelector<HTMLCanvasElement>("#grayscale");
const canvasInverted = document.querySelector<HTMLCanvasElement>("#inverted");
const imageUrl = "https://avatars.dzeninfra.ru/get-zen_doc/34175/pub_5cea2361585c2f00b5c9cb0b_5cea310a752e5b00b25b9c01/scale_1200";
const image = new Image();
image.onload = () => {

    const canvasNormalCtx = canvasNormal.getContext("2d");
    canvasNormal.width = image.width;
    canvasNormal.height = image.height;
    canvasNormalCtx.drawImage(image, 0, 0);
};
image.src = imageUrl;

canvasUtils.grayscaleFromUrl(imageUrl).then(({data, width, height}) => {
    const canvasGrayscaleCtx = canvasGrayscale.getContext("2d");
    canvasGrayscale.width = width;
    canvasGrayscale.height = height;
    canvasGrayscaleCtx.putImageData(data, 0, 0);

});

canvasUtils.invertFromUrl(imageUrl).then(({data, width, height}) => {
    const canvasInvertedCtx = canvasInverted.getContext("2d");
    canvasInverted.width = width;
    canvasInverted.height = height;
    canvasInvertedCtx.putImageData(data, 0, 0);
});



export interface ICanvasUtils {
    grayscaleFromUrl(url: string): Promise<{data: ImageData; width: number, height: number}>;
    grayscaleFromCanvas(canvas: HTMLCanvasElement): ImageData;
    grayscaleFromImageData(imageData: ImageData): ImageData;

    invertFromUrl(url: string): Promise<{data: ImageData; width: number, height: number}>;
    invertFromCanvas(canvas: HTMLCanvasElement): ImageData;
    invertFromImageData(imageData: ImageData): ImageData;
}
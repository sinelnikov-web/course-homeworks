## Написать фильтры для изображения в Canvas

```js
// Необходимо написать функции, которые бы принимали ссылку на изображение или canvas и применяла бы к нему один из эффектов.
// Например, инверсия цветов или оттенки серого. Для реализации эффектов, необходимо использовать методы Canvas getImageData/putImageData
// и работа с цветами пикселей. Возвращать такая функция может ссылку на Canvas или ImageData.

const grayscaled = grayscale('/myImage.jpeg');
const inversed = inverse(grayscaled);
```


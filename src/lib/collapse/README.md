## Сжатие глубокого объекта

Необходимо написать функцию, которая бы сжимала некоторый глубокий объект в плоский вид.
Задача должна быть решена минимум двумя способами: через рекурсию и через стек. Можно, также, решить через очередь.

   ```js
   const obj = {
     a: {
       b: [1, 2],
       '': {c: 2}
     }
   };
   
   /* {'a.b.0': 1, 'a.b.1': 2, 'a..c': 2} */
   console.log(collapse(obj));
   ```

## Реализовать стек на основе типизированного массива заданной длины

   ```js
   const stack = Stack(Int32Array, 10);
   
   stack.push(10);
   stack.push(11);
   stack.push(12);
   
   console.log(stack.head);  // 12
   
   console.log(stack.pop()); // 12
   
   console.log(stack.head);  // 11
   
   console.log(stack.pop()); // 11
   console.log(stack.pop()); // 10
   console.log(stack.pop()); // Exception
   ```

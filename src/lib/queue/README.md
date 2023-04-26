## Реализовать очередь на основе связанного списка

   ```js
   const queue = Queue();
   
   queue.push(10);
   queue.push(11);
   queue.push(12);
   
   console.log(queue.head);  // 10
   
   console.log(queue.pop()); // 10
   
   console.log(queue.head);  // 11
   
   console.log(queue.pop()); // 11
   console.log(queue.pop()); // 12
   console.log(queue.pop()); // Exception
   ```

## Реализовать двустороннюю очередь

   ```js
   const dequeue = Queue();
   
   dequeue.push(10);
   dequeue.unshift(11);
   dequeue.push(12);
   
   console.log(dequeue.pop());   // 12
   console.log(dequeue.shift()); // 11
   console.log(dequeue.pop());   // 10
   console.log(dequeue.pop());   // Exception
   ```

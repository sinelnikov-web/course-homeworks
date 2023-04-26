# ДЗ к лекции База#3

## Посмотреть лекции на канале AlekOS

* [Вся правда о массивах](https://www.youtube.com/watch?v=47_LhSf-ago)

* [Про сложность алгоритмов](https://www.youtube.com/watch?v=cXCuXNwzdfY)

## Реализовать двусторонний двусвязный список

   ```js
   const list = LinkedList();
   
   list.add(1);
   list.add(2);
   list.add(3);
   
   console.log(list.first.value);           // 1
   console.log(list.last.value);            // 3
   console.log(list.first.next.value);      // 2
   console.log(list.first.next.prev.value); // 1
   ```

## Сделать связанный список итерируемым *

   ```js
   const list = LinkedList();
   
   list.add(1);
   list.add(2);
   list.add(3);
   
   for (const value of list) {
     console.log(value);
   }
   ```
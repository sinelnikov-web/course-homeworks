## Валидация скобочных групп

Необходимо написать функцию, которая бы принимала строку и возвращала true, если у каждого из символов `{`, `[` и `(` есть своя закрывающая пара и они стоят в правильной последовательности.

   ```js
   console.log(isValid('(hello{world} and [me])'));  // true
   console.log(isValid('(hello{world)} and [me])')); // false
   console.log(isValid(')'));                        // false
   ```

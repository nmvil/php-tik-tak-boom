## Тик-так-бум
#### Обязательные задания:
Внимание! В итоговом решении в этом файле должны быть записаны только
те возможности, которые реализованы.

1. ✅ Создать список вопросов на определенную тематику (на любую из предложенных, 
не менее 30 вопросов, 
количество необходимых верных должно быть 19):
   - спорт;
   - javascript;
   - детские сказки;
   - география;
   - животный мир
2. ✅ Реализовать время для подготовки игрока.
Когда только начинается ход игрока, ему дается три секунды на 
подготовку - демонстрируется обратный отсчёт "3..2..1". 
Эти три секунды не входят в общее время игры.
3. ✅Добавить возможность изменения количества игроков перед игрой.
4. ✅Оформить игру. Сейчас она не особо эффектна.
5. ✅Создать страницу с описанием игры - со всеми возможностями.
6. ✅Добавить кнопку "Старт игры", после которой происходит старт игры.
Если игра идёт, кнопки "Старт игры" Быть не должно
7. ✅Добавить кнопку "Конец игры", которая завершает игру проигрышем.
Если игра не запущена, кнопки "Конец игры" Быть не должно

#### Дополнительное задание "Динамическое время"
8. ✅Добавить возможность изменения количества времени на игру перед 
игрой.
9. ✅ Добавить фичу - за верный ответ дается 5 секунд.
10. ✅ За неверный ответ отнимается 5 секунд

#### Дополнительное задание "Игра на победителя"
11. Добавить фичу - если какой-то игрок даёт 3 неверных ответа - он 
выбывает. Если все игроки выбыли до победы, игра проиграна всеми.
12. После успешного завершения игры победителем объявляется игрок, 
у которого меньше всего ошибок.
Если у нескольких игроков наименьшее количество ошибок - играют в
пенальти:
    - каждому на ответ дается 5 секунд;
    - ответил 1 раз неверно - вылетаешь;
    - если кончились вопросы - выигрывает тот, кто ответил на последний вопрос

#### Дополнительное задание "Неожиданные задания"
13. С помощью циклов и Math.random() реализовать возможность появления разного 
количества ответов (от 2 до 5) на вопросы.
Например, на вопрос "2 + 2 = " есть ответы: 2, 3, 4, 5, 22, 12.
Выводится могут ответы "2,3,4" или "4, 22, 12" - это случайно. 
Важно, чтоб был хоть один верный ответ в предложенных.
Хранить ответы в этом случае следует массивом answers
14. "Вопрос на миллион" - один случайный вопрос может сделать победителем. 
Пользователь должен знать, что это "вопрос на миллион"
15. "Восьмёрка" - один случайный вопрос может завершить игру для всех.
Пользователь должен знать, что это "восьмерка"

#### Дополнительное задание "Собственное время"
16. У каждого из игроков - свой таймер 
(как в шахматах - если один играет, таймер второго не идёт).
17. ✅ Ограничить количество игроков четырьмя.

#### Дополнительное задание "Сторонние задания"
18. Добавить проверку корректности JSON с вопросами во время init:
    - синтаксически корректный json
    - верный ответ только один
    - вопрос присутствует
    - вопросы и ответы не пустые
    - вопросов не менее 30
19. Если JSON с вопросами некорректен, выбрасывается исключение
20. Исключение должно перехватываться и обрабатываться как оповещение 
для  пользователя, что игру невозможно начать.

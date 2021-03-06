tikTakBoom = {
    init(
        tasks,
        timerField,
        gameStatusField,
        textFieldQuestion,
        textFieldAnswer1,
        textFieldAnswer2,
        startStopBtn,
        boomTimer
    ) {
        this.boomTimer = [30, 0, 0, 0];
        this.countOfPlayers = 2;
        this.players = [[0, 0], [0, 0], [0, 0], [0, 0]];
        this.isPlaying = [0, 0, 0, 0];
        // обрабатываем ошибки в вопросах
        try {
            // если JSON некорректен, будет SyntaxError
            this.tasks = JSON.parse(tasks);
            // проверяем, что вопросов не меньше 30 
            if (this.tasks.length < 29) {
                throw new Error('Few questions');
            }
            // проверяем правильность вопросов
            for (let i = 0; i < this.tasks.length; ++i) {
                // правильный ответ только один
                if (this.tasks[i].answer1.result == this.tasks[i].answer2.result) {
                    throw new Error(`Several correct answers in ${i + 1} question`);
                }
                // проверям, не пустой ли вопрос и ответ
                if (this.tasks[i].question == '' || this.tasks[i].answer1.value == '' || this.tasks[i].answer2.value == '') {
                    throw new Error(`Empty ${i + 1} question or answer`);
                }
            } 
        } catch(anyException) {
            console.error(anyException);
            alert('Игру невозможно начать!');
        }

        this.timerField = timerField;
        this.gameStatusField = gameStatusField;
        this.textFieldQuestion = textFieldQuestion;
        this.textFieldAnswer1 = textFieldAnswer1;
        this.textFieldAnswer2 = textFieldAnswer2;
        this.startStopBtn = startStopBtn;
        this.i = 0;
        this.needRightAnswers = 3;
    },

    run() {
        this.state = 1;

        this.start = 3;

        this.rightAnswers = 0;

        setTimeout(() => {this.turnOn()}, 3000);

        for (let i = 0; i < 4; ++i) {
            this.boomTimer[i] = document.querySelector('#timer').value;
        }

        this.timer(this.boomTimer[this.i]);

        this.countOfPlayers = document.getElementById("players").options.selectedIndex;

        for (let i = 0; i <= this.countOfPlayers; ++i) {
            this.isPlaying[i] = 1;
        }
    },

    turnOn() {
        this.gameStatusField.innerText += ` Вопрос игроку №${this.i + 1}`;

        const taskNumber = randomIntNumber(this.tasks.length - 1);

        this.printQuestion(this.tasks[taskNumber]);

        this.tasks.splice(taskNumber, 1);

        this.state = (this.state === this.countOfPlayers) ? 1 : this.state + 1;
    },

    turnOff(value) {
        if (this.currentTask[value].result) {
            this.gameStatusField.innerText = 'Верно!';
            this.boomTimer[this.i] += 5;
            if ((this.superQuestion == 8) || (this.superQuestion == 1)) {
                //console.log('зашли в turnOff ', this.superQuestion);
                this.finish('won');
            }
            this.rightAnswers += 1;
            this.players[this.i][0] += 1;
            switch (this.i) {
                case 0: document.getElementById('player1').innerText = this.players[this.i][0]; break;
                case 1: document.getElementById('player2').innerText = this.players[this.i][0]; break;
                case 2: document.getElementById('player3').innerText = this.players[this.i][0]; break;
                case 3: document.getElementById('player4').innerText = this.players[this.i][0]; break;
                }
        } else {
            this.gameStatusField.innerText = 'Неверно!';
            this.boomTimer[this.i] -= 5;
            this.players[this.i][1] += 1;
            // при трёх ошибках, завершаем игру
            if (this.players[this.i][1] == 3) {
                this.isPlaying[this.i] = 0;
                this.players[this.i][1] = '❌';
                if (this.isPlaying.includes(1) == false) {
                    this.finish();
                }
            }
            this.superQuestion = 0;
            switch (this.i) {
                case 0: document.getElementById('player1Error').innerText = this.players[this.i][1]; break;
                case 1: document.getElementById('player2Error').innerText = this.players[this.i][1]; break;
                case 2: document.getElementById('player3Error').innerText = this.players[this.i][1]; break;
                case 3: document.getElementById('player4Error').innerText = this.players[this.i][1]; break;
            }
        }

        if ((this.rightAnswers < this.needRightAnswers) && (this.boomTimer[this.i] > 0) && (this.isPlaying.includes(1))) {
            
            ++this.i;

            // isPlaying[i] == 0, если у игрока 3 ошибки
            while (this.isPlaying[this.i] == 0) {
                ++this.i;
            }

            if (this.i >= (this.countOfPlayers + 1)) {
                this.i = 0;
            }
            if (this.tasks.length === 0) {
                this.finish('lose');
            } else {
                console.log('st');
                this.turnOn();
            }
        } else {
            this.finish('won');
        }

        this.textFieldAnswer1.removeEventListener('click', answer1);
        this.textFieldAnswer2.removeEventListener('click', answer2);
    },

    printQuestion(task) {

        if ((task.question8) || (this.countOfPlayers > '1')) {
            task.question += '  !!!ВНИМАНИЕ!!! ВОПРОС 8ка - ПОБЕДИТ ДРУЖБА!';
            this.superQuestion = 8;
            console.log(this.superQuestion);
        }

        if (task.questionMillion) {
            task.question += '  !!!ВНИМАНИЕ!!! ВОПРОС НА МИЛЛИОН!';
            this.superQuestion = 1;
            console.log(this.superQuestion);
        }

        this.textFieldQuestion.innerText = task.question;
        this.textFieldAnswer1.innerText = task.answer1.value;
        this.textFieldAnswer2.innerText = task.answer2.value;

        this.textFieldAnswer1.addEventListener('click', answer1 = () => this.turnOff('answer1'));
        this.textFieldAnswer2.addEventListener('click', answer2 = () => this.turnOff('answer2'));

        this.currentTask = task;
    },

    penalty(id) {
        let game = 1;
        let i = 0;
        while (game && this.boomTimer[this.i] > 0 && id.length > 1) {
            timer(5);
            this.gameStatusField.innerText = `Пенальти! Вопрос игроку №${this.i + 1}`;
            const taskNumber = randomIntNumber(this.tasks.length - 1);

            this.textFieldQuestion.innerText = this.tasks[taskNumber].question;
            this.textFieldAnswer1.innerText = this.tasks[taskNumber].answer1.value;
            this.textFieldAnswer2.innerText = this.tasks[taskNumber].answer2.value;

            this.textFieldAnswer1.addEventListener('click', answer1 = () => {
                if (this.tasks[taskNumber].answer1.result == false) {
                    id.splice(i, 1);
                    this.gameStatusField.innerText = `Игрок ${i+1} проиграл`
                }
            });
            this.textFieldAnswer2.addEventListener('click', answer2 = () => {
                if (this.tasks[taskNumber].answer2.result == false) {
                    id.splice(i, 1);
                    this.gameStatusField.innerText = `Игрок ${i+1} проиграл`
                }
            });

            this.tasks.splice(taskNumber, 1);
        }
        this.gameStatusField.innerText = `Игрок ${id[0]} победил`;

    },

    finish(result = 'lose') {
        this.state = 0;
        if (result === 'lose') {
            this.gameStatusField.innerText = `Вы проиграли!`;
        }
        if (result === 'won') {
            this.gameStatusField.innerText = `Вы выиграли!`;
        }

        // ищем минимальное количество ошибок
        let min = 4;
        let id = [];
        let repeat = 0;
        for (let i = 0; i <= this.countOfPlayers; ++i) {
            if (this.players[i][1] <= min) {
                if (this.players[i][1] == min) {
                    repeat = 1;
                } else {
                    repeat = 0;
                    min = this.players[i][1];
                }
                id.push(i);
            }
        }

        if (repeat) {
            penalty(id);
        }

        this.textFieldQuestion.innerText = `Для начала игры нажмите кнопку внизу`;
        this.textFieldAnswer1.innerText = ``;
        this.textFieldAnswer2.innerText = ``;

        if (this.countOfPlayers > '1') {
            this.gameStatusField.innerText += `Победил игрок №${id + 1}`;
        }

        console.log(this);
    },

    timer(time = 0) {
        // if (time != 0) {
        //     this.boomTimer = time;
        // }
        if (this.start > 0) {
            this.timerField.innerText = `${this.start}...`;
            --this.start;
            setTimeout(
                () => {
                    this.timer()
                },
                1000,
            );
        } else {
            if (this.state) {
                this.boomTimer[this.i] -= 1;
                let sec = this.boomTimer[this.i] % 60;
                let min = (this.boomTimer[this.i] - sec) / 60;
                sec = (sec >= 10) ? sec : '0' + sec;
                min = (min >= 10) ? min : '0' + min;
                this.timerField.innerText = `${min}:${sec}`;

                if (this.boomTimer[this.i] > 0) {
                    this.intervalId = setTimeout(
                        () => {
                            this.timer(this.boomTimer[this.i])
                        },
                        1000,
                    )
                } else {
                    this.finish('lose');
                }
            }
        }
    },
}

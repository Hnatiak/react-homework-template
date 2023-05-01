import React, { useState, useEffect, useRef } from "react";
import css from './Game.module.css'

function Game() {
  const [isStarted, setIsStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [randomWord, setRandomWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [timer, setTimer] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    let intervalId;
    if (isStarted && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown(countdown => countdown - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isStarted, countdown]);

  useEffect(() => {
    if (countdown === 0) {
      setRandomWord(generateRandomWord());
      setTimer(0);
    }
  }, [countdown]);

  useEffect(() => {
    let intervalId;
    if (isStarted && countdown === 0) {
      intervalId = setInterval(() => {
        setTimer(timer => timer + 0.01);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isStarted, countdown]);

  useEffect(() => {
    if (randomWord) {
      inputRef.current.focus();
    }
  }, [randomWord]);

  const handleButtonClick = () => {
    setIsStarted(true);
    setCountdown(3);
    setRandomWord("");
    setInputValue("");
    setTimer(null);
  };

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    if (inputValue.toLowerCase() === randomWord.toLowerCase()) {
      setIsStarted(false);
      setCountdown(0);
      alert(`Ти переміг! YТи написав слово за: ${timer.toFixed(2)} секунди(у).`);
    } else {
      alert("Щось не так, виправ помилки");
    }
  };

  const generateRandomWord = () => {
    const words = ["кошеня", "собака", "кінь", "корова", 
    "бджола", 'кішка', 'день', 'ніч', 'сонце', 
    'привіт', 'як справи?', 'що робиш?', 'тобто?', 
    'гаразд', 'нужбо', 'вперед', 'ще раз', 'давай', 
    'чому', 'коли', 'де', 'зустріч', 'досвід', 'важкість', 'булии в ресторані', 'чомусь', 'я вважав', 'я хотів', 'я не длумав що це коли небудь станеться', 
    'а ти чого такий?', 'ти закохана?', 'що ти робиш?', 'як у тебе справи?', 'чому ти сумуєш?', 'якщо я скажу так, то що?', 'хіба ж не варто зачекати?', 
    'давай сьогодні займемося математикою', 'мені здається ти почав писати швидше', 'одужуй', 'зачекай', 'якщо ти хочеш ми можемо поїхати в магазин', 'подумай двічі перед тим як казати',
    '0_0', 'Т_Т', '@_@', '$_$', ':)', ':(', ':/', ':|', '#_#', '!_!', '*_*', '(0_0)', 'Бувай', 'Дякую'];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex].toLowerCase();
  };

  return (
    <div>
      <div>
        {!isStarted && (
        <div className={css.button_container}>
        <br />
        <p>ПРАВИЛА:</p>
        <br />
        <p>1. Коли час вийде можеш зразу почати писати і не виділяти input</p>
        <br />
        <p>2. Ця гра зроблена для того щоб перевірити твою швидкість писання</p>
        <br />
        <p>3. Напиши це слово чи речення яке буде написано знизу</p>
        <button onClick={handleButtonClick} className={css.button}>START</button>
        </div>
        )}
        {isStarted && (
          <div>
            {countdown > 0 && (
              <div className={css.standart}>
                {countdown}
              </div>
            )}
            {countdown === 0 && (
              <div style={{color: 'white', display: 'flex', justifyContent: 'center', marginTop: '125px'}}>
                START
              </div>
            )}
            {randomWord && (
              <div style={{ fontSize: '75px', color: 'white', display: 'flex', justifyContent: 'center'}}>
                {randomWord}
              </div>
            )}
            <div style={{ color: 'white', display: 'flex', justifyContent: 'center'}}>
              {timer !== null && timer.toFixed(2)}
            </div>
            <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <input type="text" value={inputValue} onChange={handleInputChange} ref={inputRef} disabled={!randomWord || timer === null} className={css.input}/>
              <button type="submit" disabled={!randomWord || timer === null || inputValue.trim().length === 0} className={css.buttonSbm}>Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;
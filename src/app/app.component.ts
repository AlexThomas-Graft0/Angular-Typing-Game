import { Component, OnInit } from "@angular/core";
import { stringify } from "querystring";
import { start } from "repl";
import { startTimeRange } from "@angular/core/src/profile/wtf_impl";
import { access } from "fs";
import { userInfo } from "os";
import {
  nouns,
  verbs,
  adjectives,
  adverbs,
  preposition,
  conjunctions,
  names,
  phrases
} from "../assets/words";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  ngOnInit() {
    this.generateSentence();
  }
  title = "Typing Game";

  sentence = [];
  index = 0;
  letterIndex = 0;
  inputIndex = 0;
  userInput = "";
  errorMessage = "";
  timeTaken = 0;
  correct = 0;
  errors = 0;
  possibleMistakes = 0;
  WPM = 0;
  accuracy = 0;
  timer;

  generateSentence = () => {
    let string = "The quick Brown fox jumps over the Lazy dog";
    string =
      "The " +
      adjectives[Math.floor(Math.random() * adjectives.length)] +
      " " +
      nouns[Math.floor(Math.random() * nouns.length)] +
      " " +
      verbs[Math.floor(Math.random() * verbs.length)] +
      " " +
      adverbs[Math.floor(Math.random() * adverbs.length)] +
      " " +
      conjunctions[Math.floor(Math.random() * conjunctions.length)] +
      " " +
      nouns[Math.floor(Math.random() * nouns.length)] +
      " " +
      adverbs[Math.floor(Math.random() * adverbs.length)] +
      " " +
      verbs[Math.floor(Math.random() * verbs.length)] +
      " " +
      preposition[Math.floor(Math.random() * preposition.length)] +
      " a " +
      nouns[Math.floor(Math.random() * nouns.length)] +
      " " +
      verbs[Math.floor(Math.random() * verbs.length)] +
      " a " +
      adjectives[Math.floor(Math.random() * adjectives.length)] +
      " " +
      nouns[Math.floor(Math.random() * nouns.length)];
    this.possibleMistakes = string.replace(/ /g, "").length;
    this.sentence = string.split(" ");
  };
  checkLetter = (letter: string, input: string) => {
    if (this.index === 0 && this.letterIndex === 0 && this.timer == null) {
      this.startTimer();
      this.correct = 0;
    }
    if (this.letterIndex === this.inputIndex) {
      if (letter[this.letterIndex] === input) {
        this.letterIndex++;
        this.inputIndex++;
        this.correct++;
        this.errorMessage = "";
        return;
      } else {
        if (input !== "" && input !== " ") {
          this.errorMessage = `You mistyped the letter ${
            letter[this.letterIndex]
          }`;
          this.errors++;
        } else {
          //space
        }
      }
    }
  };

  startTimer = () => {
    console.log("starting timer");
    this.accuracy = 0;
    this.correct = 0;
    this.errors = 0;
    this.timeTaken = 0;
    this.letterIndex = 0;
    this.inputIndex = 0;
    this.WPM = 0;
    this.timer = setInterval(() => {
      this.timeTaken++;
    }, 1000);
  };

  endTimer = () => {
    clearInterval(this.timer);
    this.timer = null;
    this.getWPM();
    this.getAccuracy();
  };

  getWPM = () => {
    this.WPM = parseInt(
      ((this.sentence.length / this.timeTaken) * 60).toFixed()
    );
  };

  getAccuracy = () => {
    this.accuracy = parseInt(
      (
        ((this.possibleMistakes - this.errors) / this.possibleMistakes) *
        100
      ).toFixed(2)
    );
  };

  checkWord = (event: KeyboardEvent, word: string, index: number) => {
    if (event.keyCode !== 16) {
      this.userInput = word;
      let temp = this.sentence[index].split("");
      this.checkLetter(temp, event.key);
      if (event.which === 32) {
        if (word.replace(/\s/g, "") === this.sentence[index]) {
          this.letterIndex = 0;
          this.inputIndex = 0;
          this.index++;
          this.userInput = "";
          this.errorMessage = "";
          if (index === this.sentence.length - 1) {
            this.index = 0;
            this.endTimer();
          }
        } else {
          //nomatch
        }
      }
    }
  };
}

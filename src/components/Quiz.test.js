import { calculateResult } from "./Quiz";

const questions = [
  {
    id: 0,
    question: `What is the Italian word for pie?`,
    options: [`Pane`, `Pizza`, `Torta`, `Fritella`],
    answer: `Pizza`
  },
  {
    id: 1,
    question: `Which planet is the closest to Earth?`,
    options: [`Venus`, `Moon`, `Saturn`, `Mars`],
    answer: `Venus`
  },
  {
    id: 2,
    question: `Name the Chinese writer, born in 551 BCE, known for preaching high moral standards.`,
    options: [`Buddha`, `Confucius`, `Mr. Miyagi`, `Mao Zedong`],
    answer: `Confucius`
  }
];

const answers = [
  {
    answer: "Pizza",
    counter: 5
  },
  {
    answer: undefined,
    counter: 15
  },
  {
    answer: "Buddha",
    counter: 1
  }
];

it("calculate result", () => {
  const { score, unanswered, incorrect } = calculateResult(questions, answers);

  expect(score).toBe(1);
  expect(unanswered).toBe(1);
  expect(incorrect).toBe(1);
});

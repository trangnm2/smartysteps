// KHONG SUA KHI DOI GAME
import { Question } from "@/be/types";

export const sampleQuestions: Question[] = [
  {
    id: 1,
    question:
      "Read the passage and choose the best answer: Recycling is an important way to protect the environment. In my town, people recycle about 40% of their household waste every year. Glass bottles, plastic bags, and old newspapers are collected and sent to recycling centers. Recycling helps save energy and reduce pollution. Personally, I think everyone should recycle more, because even small actions can make a big difference to our planet.The author thinks recycling is unnecessary.",
    type: "text",
    answers: [
      "Phương trình $2^{x^2}.3^{x +2} -\\frac{1}{2^{x}} = 0$ có hai nghiệm $x_{1}, x_{2}$. Tính T = $x_{1}x_{2}$ + $x_{1}$ + $x_{2}$",
      "Phương trình $2^{x^2}.3^{x +2} -\\frac{1}{2^{x}} = 0$ có hai nghiệm $x_{1}, x_{2}$. Tính T = $x_{1}x_{2}$ + $x_{1}$ + $x_{2}$",
      "Phương trình $2^{x^2}.3^{x +2} -\\frac{1}{2^{x}} = 0$ có hai nghiệm $x_{1}, x_{2}$. Tính T = $x_{1}x_{2}$ + $x_{1}$ + $x_{2}$",
      "Phương trình $2^{x^2}.3^{x +2} -\\frac{1}{2^{x}} = 0$ có hai nghiệm $x_{1}, x_{2}$. Tính T = $x_{1}x_{2}$ + $x_{1}$ + $x_{2}$",
    ],
    correctIndex: 0,
  },
  {
    id: 2,
    question: "Tính giá trị của biểu thức: $\\sqrt{16} + \\frac{8}{4}$",
    type: "latex",
    answers: ["$4$", "$6$", "$8$", "$10$"],
    correctIndex: 1,
  },
  {
    id: 3,
    question: "Phương trình bậc hai $x^2 - 5x + 6 = 0$ có nghiệm là:",
    type: "latex",
    answers: ["$x = 1$ và $x = 6$", "$x = 2$ và $x = 3$", "$x = -2$ và $x = -3$", "$x = 0$ và $x = 5$"],
    correctIndex: 1,
  },
  {
    id: 4,
    question: "A: Can you jump?\\nB: __________",
    type: "text",
    answers: ["Yes, I do.", "Yes, I am.", "Yes, I can.", "Yes, I like."],
    correctIndex: 2,
  },
  {
    id: 5,
    question: "Đạo hàm của hàm số $f(x) = x^3 + 2x^2 - x + 1$ là:",
    type: "latex",
    answers: [
      "$f'(x) = 3x^2 + 4x - 1$",
      "$f'(x) = 3x^2 + 2x - 1$",
      "$f'(x) = x^2 + 4x - 1$",
      "$f'(x) = 3x^3 + 4x^2 - 1$",
    ],
    correctIndex: 0,
  },
];

export const questions = sampleQuestions;

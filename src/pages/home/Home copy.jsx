import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
  }
`;

// Styled components
const FormContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 0 1rem;
  box-sizing: border-box;
`;

const QuestionContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px; /* Doubled width */
  max-width: 100%;
`;

const Input = styled.input`
  padding: 1rem;
  margin-top: 1rem;
  width: 100%;
  border-radius: 20px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 1rem 2rem;
  background-color: #ff007f;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  transition: opacity 0.3s ease;
`;

const ProgressBarContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
`;

const ProgressBar = styled.div`
  width: 100px;
  height: 10px;
  background: #ddd;
  border-radius: 20px;
  overflow: hidden;
  margin-right: 10px;
`;

const Progress = styled.div`
  height: 100%;
  background: #ff007f;
  width: ${({ width }) => width}%;
  transition: width 0.3s ease;
  border-radius: 20px;
`;

const Percentage = styled.span`
  margin-right: 10px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin: 0 5px;
`;

const MultipleChoiceButton = styled.button`
  margin-top: 1rem;
  padding: 1rem 2rem;
  background-color: ${({ selected }) => (selected ? "#ff007f" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
  border: 1px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

// Question Component
const Question = ({ question, value, onChange, onSubmit, options }) => {
  const handleOptionClick = (option) => {
    onChange(option);
    onSubmit();
  };

  return (
    <QuestionContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2>{question}</h2>
      {options ? (
        options.map((option) => (
          <MultipleChoiceButton
            key={option}
            selected={value === option}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </MultipleChoiceButton>
        ))
      ) : (
        <div>
          <Input value={value} onChange={(e) => onChange(e.target.value)} />
          {value && (
            <Button onClick={onSubmit}>OK</Button>
          )}
        </div>
      )}
    </QuestionContainer>
  );
};

// Main Form Component
const FluentForm = () => {
  const questions = [
    { id: "financing", type: "multipleChoice", question: "What do you need financing for?", options: ["Refinance", "New Purchase"] },
    { id: "loanPurpose", type: "multipleChoice", question: "What is the purpose of the loan?", options: ["Residential", "Land", "Construction", "Commercial"] },
    { id: "lookingFor", type: "multipleChoice", question: "What are you looking for?", options: ["1st Mortgage", "2nd Mortgage", "3rd Mortgage"] },
    { id: "hearAboutUs", type: "multipleChoice", question: "How did you hear about us?", options: ["Radio", "Google Search", "Social Media", "Podcast", "Online Magazine", "TV", "Paper Ad", "Referral", "Mail Postcard", "Other"] },
    { id: "traditionalLenders", type: "multipleChoice", question: "Have you applied with traditional lenders?", options: ["Yes", "No"] },
    { id: "timeframe", type: "multipleChoice", question: "What's your estimated timeframe?", options: ["Within 30 days", "Within 3 Months", "Within 8 Months", "Within 12 Months", "Unsure"] },
    
    
    { id: "valueOfProperty", type: "input", question: "Value of Property (Approximate)" },
    { id: "totalMortgage", type: "input", question: "Total Mortgages (Approximate)" },

    { id: "purchasePrice", type: "input", question: "Purchase price" },
    { id: "downPayment", type: "input", question: "Down payment" },
    
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setAnswers({})
      setCurrentQuestion(0)
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleChange = (value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questions[currentQuestion].id]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted with answers:", answers);
    // Submit the form or perform other actions here
  };

  const progressWidth = (Object.keys(answers).length / questions.length) * 100;

  return (
    <FormContainer>
      <AnimatePresence mode="wait">
        {currentQuestion < questions.length && (
          <Question
            key={currentQuestion}
            question={questions[currentQuestion].question}
            value={answers[questions[currentQuestion].id] || ""}
            onChange={handleChange}
            onSubmit={handleNextQuestion}
            options={questions[currentQuestion].options}
          />
        )}
      </AnimatePresence>

      <ProgressBarContainer>
        <Percentage>{progressWidth.toFixed(0)}%</Percentage>
        <ProgressBar>
          <Progress width={progressWidth} />
        </ProgressBar>
        <ArrowButton onClick={handlePreviousQuestion}>⬆</ArrowButton>
        <ArrowButton onClick={handleNextQuestion} disabled={!answers[questions[currentQuestion].id]}>⬇</ArrowButton>
      </ProgressBarContainer>

    </FormContainer>
  );
};

const App = () => (
  <>
    <GlobalStyle />
    <FluentForm />
  </>
);

export default App;

import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import "./home.css"

// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Montserrat;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // height: 100vh;
    // background-color: #f0f0f0;
  }
`;

// Styled components
const FormContainer = styled.div`
  background: #e9eaec;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  // box-sizing: border-box;
  // position: relative;
  // border: 2px solid gray;
  // width: 100vw;
  // height: 100vh;
  // padding: 3rem;
  // border-radius: 25px;
`;

const QuestionContainer = styled(motion.div)`  
  // display: flex;
  // flex-wrap: wrap;
  // gap: 10px;
  // margin: 10px;
  // justify-content: center;
  // align-items: center;
  // align-items: center;
  // flex-direction: column; 
  // width: 600px; 
  margin-top: 20px;
  max-width: 600px;
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
  background-color: #ff7e12;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  transition: opacity 0.3s ease;
`;

const ProgressBarContainer = styled.div`
  // position: absolute;
  bottom: 0px;
  // right: 1rem;
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
  background: #ff7e12;
  width: ${({ width }) => width}%;
  transition: width 0.3s ease;
  border-radius: 20px;
`;

const Percentage = styled.span`
  margin-right: 10px;
  font-weight: 500;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  margin: 0 5px;
  padding: 5px;
`;



const MultipleChoiceButton = styled.button`
 margin-top: .3rem;
  padding: 1rem 2rem;
  background-color: ${({ selected }) => (selected ? "#ff7e12" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
  border: 1px solid ${({ selected }) => (selected ? "#ff7e12" : "#A0A0A0")};  
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${({ selected }) => (selected ? "#FFF5EE" : "#FFF5EE")}; /* Light gray background on hover */
  }

  &:active {
    background-color: #ff7e12; /* Slightly darker gray on click */
  }

  /* Responsive padding */
  @media (max-width: 1200px) {
    padding: 0.8rem 1.6rem;
  }
  
  @media (max-width: 992px) {
    padding: 0.6rem 1.2rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
  }

`;


// Question Component
const Question = ({ question, value, onChange, onSubmit, options }) => {
  const handleOptionClick = (option) => {
    onChange(option);
    onSubmit();
  };

  return (<>
    <QuestionContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="md:mb-4 mb-2 text-lg font-semibold"> {question} </div>

      <div className="flex flex-wrap gap-2 font-medium">
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
          <div className="w-full">
            <Input value={value} placeholder={`Enter ` + question} onChange={(e) => onChange(e.target.value)} />
            {value && (
              <Button onClick={onSubmit}>OK</Button>
            )}
          </div>
        )}
      </div>

    </QuestionContainer>
  </>);
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
  // const [showingConditionalQuestions, setShowingConditionalQuestions] = useState(false);

  // Determine which questions to display
  const questionsToDisplay = () => {
    const baseQuestions = questions.slice(0, 6);
    const conditionalQuestions = [];

    if (answers.financing === "Refinance") {
      conditionalQuestions.push(questions.find(q => q.id === "valueOfProperty"));
      conditionalQuestions.push(questions.find(q => q.id === "totalMortgage"));
    } else if (answers.financing === "New Purchase") {
      conditionalQuestions.push(questions.find(q => q.id === "purchasePrice"));
      conditionalQuestions.push(questions.find(q => q.id === "downPayment"));
    }

    return baseQuestions.concat(conditionalQuestions);
  };

  const handleNextQuestion = () => {
    const questionsToShow = questionsToDisplay();
    if (currentQuestion < questionsToShow.length - 1) {
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
    const currentQuestionId = questionsToDisplay()[currentQuestion].id;

    // Preserve values for previously hidden questions
    setAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers };
      const displayedQuestionIds = questionsToDisplay().map(q => q.id);

      // Remove values for questions that are no longer displayed
      Object.keys(updatedAnswers).forEach((key) => {
        if (!displayedQuestionIds.includes(key)) {
          delete updatedAnswers[key];
        }
      });

      return {
        ...updatedAnswers,
        [currentQuestionId]: value,
      };
    });


  };

  const handleSubmit = () => {
    console.log("Form submitted with answers:", answers);
    alert("Form successfully submitted"); 
  };

  const progressWidth = (Object.keys(answers).length / questionsToDisplay().length) * 100;



  return (<>

    <FormContainer>

      <div>
        <div className="text-center md:text-5xl text-4xl font-bold md:mt-10 m-8">Apply now</div>

        <div className="md:m-10 m-2 rounded-lg border-2 bg-white md:p-14 p-4 py-5 max-w-[50rem]">
          <h2 className="md:mb-12 mb-4 md:text-2xl text-xl font-semibold">Free Confidential Mortgage Review</h2>

          <h3 className="md:mb-12 mb-4 md:text-lg text-md">Go through our quick process to get on the road to approval</h3>

          <AnimatePresence mode="wait">
            {currentQuestion < questionsToDisplay().length && (
              <Question
                key={questionsToDisplay()[currentQuestion].id}
                question={questionsToDisplay()[currentQuestion].question}
                value={answers[questionsToDisplay()[currentQuestion].id] || ""}
                onChange={handleChange}
                onSubmit={handleNextQuestion}
                options={questionsToDisplay()[currentQuestion].options}
              />
            )}
          </AnimatePresence>

        </div>
      </div>

      <ProgressBarContainer>
        <Percentage>{progressWidth.toFixed(0)}%</Percentage>
        <ProgressBar>
          <Progress width={progressWidth} />
        </ProgressBar>
        <ArrowButton onClick={handlePreviousQuestion}> <i className='bx bx-chevron-left'></i> </ArrowButton>
        <ArrowButton onClick={handleNextQuestion} disabled={!answers[questionsToDisplay()[currentQuestion].id]} > <i className='bx bx-chevron-right'></i> </ArrowButton>
      </ProgressBarContainer>

    </FormContainer>

  </>);
};

const App = () => (
  <>
    <GlobalStyle />

    <FluentForm />
  </>
);

export default App;

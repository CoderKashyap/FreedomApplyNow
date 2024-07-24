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

  // @media (max-width: 768px) {
  // justify-content: space-between;
  // }
  
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

const InputDollar = styled.input`
  padding: 1rem;
  padding-left: 1.6rem;
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
  margin-bottom: 1rem;
  display: flex; 
  align-items: center;

  // position: absolute;
  // right: 1rem;
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

const Textarea = styled.textarea`
  padding: 1rem;
  margin-top: 1rem;
  width: 100%;
  border-radius: 20px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`;

const Select = styled.select`
  padding: 1rem;
  margin-top: 1rem;
  width: 100%;
  border-radius: 20px;
  border: 1px solid #ddd;
  box-sizing: border-box;
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

const ErrorMessage = styled.div`
  color: red;
  margin-top: 0.5rem;
  margin-left: 1rem;
  font-size: 15px;
`;


// Question Component
const Question = ({ id, question, value, onChange, onSubmit, options, isMultiple, isSelectOption, isTextArea }) => {
  const handleOptionClick = (option) => {
    onChange(option);
    onSubmit();
  };

  const [errors, setErrors] = useState({});


  // Validation functions
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  };

  const validateEmailPhone = (field, inputValue) => {
    // onChange({ ...value, [field]: inputValue });
    if (field === "email" && !validateEmail(inputValue)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Invalid email format" }));
    } else if (field === "phone" && !validatePhone(inputValue)) {
      setErrors((prevErrors) => ({ ...prevErrors, phone: "Invalid phone number format" }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }
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
        ) : isMultiple && id == "addressProvince" ? (
          <div className="w-full">
            <Input
              value={value.address || ""}
              placeholder="Enter your address(Autofetch)"
              onChange={(e) => onChange({ ...value, address: e.target.value })}
            />
            <Select
              value={value.province || ""}
              onChange={(e) => onChange({ ...value, province: e.target.value })}
            >
              <option value="">Select your province</option>
              <option value="province1">Province 1</option>
              <option value="province2">Province 2</option>
              <option value="province3">Province 3</option>
            </Select>
            {value.address && value.province && (
              <Button onClick={onSubmit}>OK</Button>
            )}
          </div>
        ) : isSelectOption && id == "hearAboutUs" ? (
          <div className="w-full">
            <Select
              value={value}
              onChange={(e) => onChange(e.target.value)}
            >
              <option value="">How did you hear about us?</option>
              <option value="Google Search">Google Search</option>
              <option value="Social Media">Social Media</option>
              <option value="TV">TV</option>
            </Select>
            {value && (
              <Button onClick={onSubmit}>OK</Button>
            )}
          </div>
        ) : isMultiple && id == "nameEmailPhone" ? (<div>
          <Input
            type="text"
            value={value.name || ""}
            placeholder="Enter your name"
            onChange={(e) => onChange({ ...value, name: e.target.value })} />

          <Input
            type="email"
            value={value.email || ""}
            placeholder="Enter your email"
            onChange={(e) => { onChange({ ...value, email: e.target.value }); validateEmailPhone("email", e.target.value) }}
          />
          {errors.email && value.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          <Input
            type="phone"
            value={value.phone || ""}
            placeholder="Enter your phone number"
            maxLength={10}
            onChange={(e) => { onChange({ ...value, phone: e.target.value.replace(/[^0-9]/g, "") }); validateEmailPhone("phone", e.target.value) }}
          />
          {errors.phone && value.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
          {value.name && value.email && value.phone && (
            <Button onClick={onSubmit}>OK</Button>
          )}
        </div>) : isTextArea && id == "shareOtherDetail" ? (

          <div className="w-full">
            <Textarea
              value={value}
              placeholder={`Enter ${question}`}
              onChange={(e) => onChange(e.target.value)}
            />
            {value && (
              <Button onClick={onSubmit}>OK</Button>
            )}
          </div>

        ) : (
          <div className="w-full relative inline-block">

            {value && <span className="md:text-xl text-lg absolute left-[15px] top-[31px]">$</span>}

            <InputDollar
              value={value}
              placeholder={`Enter ${question}`}
              onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ""))}
            />
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

    { id: "addressProvince", type: "multipleInputs", question: "Please provide your address and province." },
    { id: "nameEmailPhone", type: "multipleInputs", question: "Please provide your name, email, and phone number." },

    { id: "loanPurpose", type: "multipleChoice", question: "What is the purpose of the loan?", options: ["Residential", "Land", "Construction", "Commercial"] },
    { id: "lookingFor", type: "multipleChoice", question: "What are you looking for?", options: ["1st Mortgage", "2nd Mortgage", "3rd Mortgage"] },

    { id: "hearAboutUs", type: "selectOptionInput", question: "How did you hear about us?", selection: ["Radio", "Google Search", "Social Media", "Podcast", "Online Magazine", "TV", "Paper Ad", "Referral", "Mail Postcard", "Other"] },

    { id: "traditionalLenders", type: "multipleChoice", question: "Have you applied with traditional lenders?", options: ["Yes", "No"] },
    { id: "timeframe", type: "multipleChoice", question: "What's your estimated timeframe?", options: ["Within 30 days", "Within 3 Months", "Within 8 Months", "Within 12 Months", "Unsure"] },
    { id: "shareOtherDetail", type: "textAreaInput", question: "Please add any other details you want to share." },
    { id: "valueOfProperty", type: "input", question: "Value of Property (Approximate)" },
    { id: "totalMortgage", type: "input", question: "Total Mortgages (Approximate)" },
    { id: "purchasePrice", type: "input", question: "Purchase price" },
    { id: "downPayment", type: "input", question: "Down payment" },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  // Determine which questions to display
  const questionsToDisplay = () => {
    const baseQuestions = questions.slice(0, 9);
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
                id={questionsToDisplay()[currentQuestion].id}
                question={questionsToDisplay()[currentQuestion].question}
                value={answers[questionsToDisplay()[currentQuestion].id] || ""}
                onChange={handleChange}
                onSubmit={handleNextQuestion}
                isMultiple={questions[currentQuestion].type === "multipleInputs"}
                isSelectOption={questions[currentQuestion].type === "selectOptionInput"}
                isTextArea={questions[currentQuestion].type === "textAreaInput"}
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





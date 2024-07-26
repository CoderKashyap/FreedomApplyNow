import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import SubHeader from "../../components/layout/SubHeader";
import "./home.css"
import NewPurchase from "/newPurchase.svg";
import Refinance from "/refinance.svg";
import rightArrowSvg from "/polygonRight.svg";
import leftArrowSvg from "/polygonLeft.svg";

// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Sora;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // height: 100vh;
    // background-color: #f0f0f0;
  }
`;

// Styled components
const FormContainer = styled.div`
  height: calc(100vh - 6rem);
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
  // justify-content: flex-start;
  // }
`;

const QuestionContainer = styled(motion.div)`  
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  // flex-direction: column; 
  // margin: 10px;
  // margin-top: 20px;
  // width: 650px;
  //   @media (max-width: 768px) {
  //   width: auto;
  // }

  @media (max-width: 768px) {  
  gap: 0px;
  }

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
  padding-left: 1.7rem;
  margin-top: 1rem;
  width: 100%;
  border-radius: 20px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  
  @media (max-width: 768px) {  
    gap: 0px;
    // width: 100vw;
  }

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
  margin: 1rem;
  display: flex; 
  align-items: center;
  color: white;
  // position: absolute;
  // right: 1rem;

  @media (max-width: 768px) {  
  margin: 2rem;
  }
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
  background: ${({ selected }) => (selected ? "linear-gradient(to right, #FC9700, #FFF739)" : "white")};
  color: #000;
  border: 1px solid ${({ selected }) => (selected ? "#A0A0A0" : "#A0A0A0")};  
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
      background: linear-gradient(to right, #FC9700, #FFF739);
    }

    &:active {
      background: linear-gradient(to right, #FC9700, #FFF739);
    }

  /* Responsive padding */
  @media (max-width: 1200px) {
    padding: 0.8rem 1.6rem;
  }
  
  @media (max-width: 992px) {
    padding: 0.6rem 1.2rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem 1rem;
  } 
`;

const MultipleChoiceDesignButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-direction: column;
  // margin-top: 1rem;
  padding: 2rem;
  height: 220px;
  width: 260px;
  background-color: #F7F7F7;
  color: ${({ selected }) => (selected ? "#000" : "#000")};
  border: 3px solid ${({ selected }) => (selected ? "#2196F3" : "#F7F7F7")};  
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;


  /* Responsive padding */
  @media (max-width: 1200px) {
    padding: 0.8rem 1.6rem;
  }
  
  @media (max-width: 992px) {
    padding: 0.6rem 1.2rem;
  }
  
  @media (max-width: 768px) {
  height: 120px;
  width: 160px;
  padding: 5px 5px;
  gap: 20px;

  } 



  span {
    font-size: 1rem;
    font-weight: bold;
    padding: 0.8rem 2rem;
    border-radius: 50px;
    transition: background-color 0.3s ease, color 0.3s ease;
    background: ${({ selected }) => (selected ? "linear-gradient(to right, #FC9700, #FFF739)" : "white")}; 

    &:hover {
      background: linear-gradient(to right, #FC9700, #FFF739);
    }

    &:active {
      background: linear-gradient(to right, #FC9700, #FFF739);
    }

    
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  }


`;



const ErrorMessage = styled.div`
  color: red;
  margin-top: 0.5rem;
  margin-left: 1rem;
  font-size: 15px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  margin-top: .6rem;
`;

const CheckboxLabel = styled.label`
  margin-left: 1rem;
  color: white;
  font-size: 18px;
`;

// Question Component
const Question = ({ id, question, value, onChange, onSubmit, options, isMultiple, isSelectOption, isTextArea, handlePreviousQuestion, selection }) => {
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

  const formatNumber = (num) => {
    if (num) {
      // Remove existing commas
      num = num.replace(/,/g, "");
      const formattedNum = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return formattedNum;
    }
  };

  return (<>
    <QuestionContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >

      {options && id == "financing" ? <SubHeader /> : ""}

      <div className="md:mb-4 mb-4 md:text-3xl text-2xl font-bold text-[#fd7e14] p-2 rounded-lg questionStyle text-center"> {question} </div>

      <div className={`flex ${options && id == "financing" ? "md:gap-10 gap-4 my-10 md:my-0" : "w-full gap-6 flex-wrap px-5 md:px-0 md:mb-8 my-0"}  font-medium`}>
        {options && id !== "financing" ? (
          options.map((option) => (
            <MultipleChoiceButton
              key={option}
              selected={value === option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </MultipleChoiceButton>
          ))
        ) : options && id == "financing" ? (
          <>

            <MultipleChoiceDesignButton
              selected={value === "Refinance"}
              onClick={() => handleOptionClick("Refinance")}
            >
              <div className="rounded-full bg-white md:py-6 py-4 md:px-7 px-5"> <img src={Refinance} height={61} width={61} className="md:auto w-16" alt="icon" /> </div>

              <span className=""> Refinance</span>
            </MultipleChoiceDesignButton>
            <MultipleChoiceDesignButton
              selected={value === "New Purchase"}
              onClick={() => handleOptionClick("New Purchase")}
            >
              <div className="rounded-full bg-white md:py-6 py-4 md:px-7 px-5"> <img src={NewPurchase} height={61} width={61} className="md:auto w-14" alt="icon" /> </div>

              <span className=""> New Purchase </span>
            </MultipleChoiceDesignButton>

          </>

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
              <option value="">Select</option>
              {selection && selection.map((sel) => (
                <option value={sel}>{sel}</option>
              ) )}
              {/* <option value="Social Media">Social Media</option>
              <option value="TV">TV</option> */}
            </Select>
            {value && (
              <Button onClick={onSubmit}>OK</Button>
            )}
          </div>
        ) : isMultiple && id == "nameEmailPhone" ? (
          <div className="w-full">
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
          </div>
        ) : isTextArea && id == "shareOtherDetail" ? (

          <div className="w-full">
            <Textarea
              value={value.additionalDetails || ""}
              placeholder="Enter details"
              onChange={(e) => onChange({ ...value, additionalDetails: e.target.value })}
            />
            <div className="mt-4 text-white">Consent*</div>
            <CheckboxContainer>
              <div>
                <input className="h-5 w-5 mt-[2px]"
                  type="checkbox"
                  checked={value.consent || false}
                  onChange={(e) => onChange({ ...value, consent: e.target.checked })}
                />
              </div>
              <CheckboxLabel>I agree to the storage and processing of my personal data according to this website's privacy policy.</CheckboxLabel>
            </CheckboxContainer>
            {value.additionalDetails && value.consent && (<>
              <Button onClick={handlePreviousQuestion}>Previous</Button> <span className="mr-5"></span>
              <Button onClick={onSubmit}>Submit</Button></>
            )}
          </div>


        ) : (
          <div className="w-full relative">
            {value && <span className="md:text-xl text-black text-lg absolute left-[15px] top-[30px] md:top-[29px]">$</span>}

            <InputDollar
              value={value}
              placeholder={`Enter ${question}`}
              onChange={(e) => onChange(formatNumber(e.target.value.replace(/[^0-9]/g, "")))}
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
    { id: "valueOfProperty", type: "input", question: "Value of Property (Approximate)" },
    { id: "totalMortgage", type: "input", question: "Total Mortgages (Approximate)" },
    { id: "purchasePrice", type: "input", question: "Purchase price" },
    { id: "downPayment", type: "input", question: "Down payment" },
    { id: "shareOtherDetail", type: "textAreaInput", question: "Please add any other details you want to share." },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  // Determine which questions to display
  const questionsToDisplay = () => {
    const baseQuestions = questions.slice(0, 8);
    const conditionalQuestions = [];

    if (answers.financing === "Refinance") {
      conditionalQuestions.push(questions.find(q => q.id === "valueOfProperty"));
      conditionalQuestions.push(questions.find(q => q.id === "totalMortgage"));
    } else if (answers.financing === "New Purchase") {
      conditionalQuestions.push(questions.find(q => q.id === "purchasePrice"));
      conditionalQuestions.push(questions.find(q => q.id === "downPayment"));
    }
    conditionalQuestions.push(questions.find(q => q.id === "shareOtherDetail"));

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

      <div className="font-sans">

        {/* <div className="md:m-10 m-2 rounded-lg border-2 bg-white md:p-14 p-4 py-5 max-w-[50rem]"> */}
        <div className="md:m-1 m-2 rounded-lg p-2 max-w-[45rem]">

          <AnimatePresence mode="wait">
            {currentQuestion < questionsToDisplay().length && (
              <Question
                key={questionsToDisplay()[currentQuestion].id}
                id={questionsToDisplay()[currentQuestion].id}
                question={questionsToDisplay()[currentQuestion].question}
                value={answers[questionsToDisplay()[currentQuestion].id] || ""}
                onChange={handleChange}
                onSubmit={handleNextQuestion}
                handlePreviousQuestion={handlePreviousQuestion}
                isMultiple={questions[currentQuestion].type === "multipleInputs"}
                isSelectOption={questions[currentQuestion].type === "selectOptionInput"}
                isTextArea={questionsToDisplay()[currentQuestion].type === "textAreaInput"}
                options={questionsToDisplay()[currentQuestion].options}
                selection={questionsToDisplay()[currentQuestion].selection}
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
        <ArrowButton onClick={handlePreviousQuestion}> <img src={leftArrowSvg} alt="leftArrowSvg" /> </ArrowButton>
        <ArrowButton onClick={handleNextQuestion} disabled={!answers[questionsToDisplay()[currentQuestion].id]} > <img src={rightArrowSvg} alt="rightArrowSvg" /> </ArrowButton>
      </ProgressBarContainer>

    </FormContainer>

  </>);
};

const Home = () => (
  <>
    <GlobalStyle />

    <section className="bg-black">
      <FluentForm />
    </section>


  </>
);

export default Home;





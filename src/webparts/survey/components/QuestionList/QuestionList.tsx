import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  Rating,
} from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { SPFI } from "@pnp/sp";
import * as React from "react";
import { useEffect } from "react";
import { getSP } from "../../../../pnpConfig";
// import { IUserDataSurvey } from "../SurveyForm/ISurveyForm";
import { IQuestionList } from "./IQuestionList";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar as SelectDate } from "react-date-range";

const labels: { [index: string]: string } = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const QuestionList = (props: IQuestionList) => {
  const { dataCurrentUser, context, listName } = props;

  let _sp: SPFI = getSP(context);

  const [questionNumber, setQuestionNumber] = React.useState<number>(1);

  const listLanguages = ["C#", "Java", "PHP", "Python", "R"];

  const [answer1, setAnswer1] = React.useState<string | null>("");
  const [languages, setLanguages] = React.useState<string[]>([]);
  const [answer3, setAnswer3] = React.useState<Date | null>();
  const [answer4, setAnswer4] = React.useState<number | null>(0);
  const [hover, setHover] = React.useState(-1);

  const error = languages.filter((v) => v).length < 2;

  const handleSubmitForm = () => {
    // call api to update to sharepoint list
    const updateSurvey = async (itemId: number, listName: string) => {
      try {
        await _sp.web.lists
          .getByTitle(listName)
          .items.getById(itemId)
          .update({
            Question1: answer1 ? answer1 : "",
            Question2: languages ? languages : [],
            Question3: answer3 ? answer3 : null,
            Question4: answer4 ? answer4 : 0,
            HasAnsweredSurvey: true,
          });
        setQuestionNumber(5);
      } catch (error) {
        console.log(error);
      }
    };
    updateSurvey(dataCurrentUser.Id, listName);
  };

  useEffect(() => {
    if (answer1 === "B" && questionNumber === 1) {
      setQuestionNumber(3);
    }
    if (answer1 === "A" && questionNumber === 1) {
      setQuestionNumber(2);
    }
  }, [answer1]);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <h1>List Questions</h1>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography>{questionNumber}</Typography>
          <Typography>/4</Typography>
        </Box>
      </Box>

      <Box>
        {questionNumber === 1 && (
          <>
            <Typography>
              <strong>Question 1:</strong>
              Please select an option bellow:
            </Typography>

            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                // defaultValue="A"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="A"
                  control={
                    <Radio
                      onClick={() => {
                        setAnswer1("A");
                      }}
                    />
                  }
                  label="Answer A, Go to Question 2"
                />
                <FormControlLabel
                  value="B"
                  control={
                    <Radio
                      onClick={() => {
                        setAnswer1("B");
                      }}
                    />
                  }
                  label="Answer B, Go to Question 3"
                />
              </RadioGroup>
            </FormControl>
          </>
        )}
        {questionNumber === 2 && (
          <>
            <Typography>
              <strong>Question 2:</strong>
              What are your favorite programming languages? Please select 2
              options bellow:
            </Typography>
            <FormControl error={error}>
              <FormGroup>
                {listLanguages.map((language) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(event) => {
                          const newChecked = [...languages];
                          if (event.target.checked) {
                            newChecked.push(event.target.name);
                          } else {
                            // newChecked.push(event.target.name);
                            newChecked.splice(
                              newChecked.indexOf(event.target.name),
                              1
                            );
                          }
                          setLanguages(newChecked);
                        }}
                        name={language}
                      />
                    }
                    label={language}
                  />
                ))}
              </FormGroup>
            </FormControl>
            <Box sx={{ mt: 2 }}>
              <Typography color="error">
                {languages.length > 0 && languages.length < 2
                  ? "Please select at least 2 languages"
                  : ""}
              </Typography>
            </Box>
          </>
        )}
        {questionNumber === 3 && (
          <>
            <Typography>
              <strong>Question 3:</strong>
              When is your birthday?
              <br />
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SelectDate
                  onChange={(date) => {
                    setAnswer3(date);
                  }}
                  direction="horizontal"
                  fixedHeight
                  date={answer3}
                />
              </Box>
              {answer3 && (
                <Typography>
                  You are <strong>{answer3?.getFullYear() - 1970}</strong> years
                  and <strong>{answer3?.getMonth()}</strong> months old.
                </Typography>
              )}
            </Typography>
          </>
        )}
        {questionNumber === 4 && (
          <>
            <Typography>
              <strong>Question 4:</strong>
              Please rate the survey from 1 to 5
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  my: 2,
                }}
              >
                <Rating
                  name="hover-feedback"
                  value={answer4}
                  precision={1}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    setAnswer4(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                {answer4 !== null && (
                  <Box sx={{ ml: 2 }}>
                    {labels[hover !== -1 ? hover : answer4]}
                  </Box>
                )}
              </Box>
              <hr />
            </Typography>
          </>
        )}
        {questionNumber === 5 && (
          <Typography>Thank you for your time!</Typography>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        {questionNumber >= 2 && questionNumber < 4 && (
          <Button
            variant="contained"
            onClick={() => {
              if (questionNumber === 3 && answer1 === "B") {
                setQuestionNumber(1);
              } else if (questionNumber === 3 && answer1 === "A") {
                setQuestionNumber(2);
              } else {
                setQuestionNumber(questionNumber - 1);
              }
            }}
          >
            Back
          </Button>
        )}
        {questionNumber > 1 && questionNumber < 4 ? (
          <Button
            variant="contained"
            onClick={() => {
              setQuestionNumber(questionNumber + 1);
            }}
          >
            Next
          </Button>
        ) : (
          questionNumber === 4 && (
            <Button variant="contained" onClick={handleSubmitForm}>
              Submit
            </Button>
          )
        )}
      </Box>
      <hr />
    </div>
  );
};

export default QuestionList;

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
} from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import * as React from "react";

const QuestionList = () => {
  const [questionNumber, setQuestionNumber] = React.useState<number>(1);
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
                defaultValue="A"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="A"
                  control={<Radio />}
                  label="Answer A, Go to Question 2"
                />
                <FormControlLabel
                  value="B"
                  control={<Radio />}
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
              Please select an option bellow:
            </Typography>
          </>
        )}
        {questionNumber === 3 && (
          <>
            <Typography>
              <strong>Question 3:</strong>
              Please select an option bellow:
            </Typography>
          </>
        )}
        {questionNumber === 4 && (
          <>
            <Typography>
              <strong>Question 4:</strong>
              Please select an option bellow:
            </Typography>
          </>
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
        <Button
          disabled={questionNumber === 1}
          onClick={() => {
            setQuestionNumber(questionNumber - 1);
          }}
        >
          Back
        </Button>
        {questionNumber >= 1 && questionNumber < 4 ? (
          <Button
            onClick={() => {
              setQuestionNumber(questionNumber + 1);
            }}
          >
            Next
          </Button>
        ) : (
          <Button>Submit</Button>
        )}
      </Box>
    </div>
  );
};

export default QuestionList;

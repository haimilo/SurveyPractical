import { Box, Button, Chip } from "@mui/material";
import { SPFI } from "@pnp/sp";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { getSP } from "../../../../pnpConfig";
import QuestionList from "../QuestionList/QuestionList";
import { ISurveyForm, IUserDataSurvey } from "./ISurveyForm";

const SurveyForm = (props: ISurveyForm) => {
  const LIST_NAME: string = "Survey Results";
  let _sp: SPFI = getSP(props.context);
  const currentUserEmail = props.userEmail;

  const [_dataSurveyForm, _setDataSurveyForm] = useState<IUserDataSurvey[]>([]);
  const [getStartSurvey, setGetStartSurvey] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [_surveyResult, setSurveyResult] = useState<IUserDataSurvey>();

  const dateString = useMemo(() => {
    if (!_surveyResult) return "";
    return _surveyResult.Question3.toString();
  }, [_surveyResult]);

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-GB");

  const [users, setUsers] = useState<IUserDataSurvey>();
  const getDataList = async () => {
    try {
      const list = await _sp.web.lists();
      const items = await _sp.web.lists.getByTitle(LIST_NAME).items();
      console.log(items, list);
      _setDataSurveyForm(
        items.map((item: IUserDataSurvey) => {
          if (item.Email === currentUserEmail) {
            setUsers({
              Id: item.Id,
              Title: item.Title,
              FullName: item.FullName,
              Email: item.Email,
              HasAnsweredSurvey: item.HasAnsweredSurvey,
              Question1: item.Question1,
              Question2: item.Question2,
              Question3: item.Question3,
              Question4: item.Question4,
            });
          }
          return {
            Id: item.Id,
            Title: item.Title,
            FullName: item.FullName,
            Email: item.Email,
            HasAnsweredSurvey: item.HasAnsweredSurvey,
            Question1: item.Question1,
            Question2: item.Question2,
            Question3: item.Question3,
            Question4: item.Question4,
          };
        })
      );
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getDataList();
  }, []);

  const isUserAnswered = useMemo(() => {
    if (!_dataSurveyForm || _dataSurveyForm.length === 0) {
      return false;
    } else {
      return _dataSurveyForm.filter((item: IUserDataSurvey) => {
        return item.Email === currentUserEmail;
      })[0].HasAnsweredSurvey;
    }
  }, [_dataSurveyForm]);

  const getSurveyResult = async () => {
    try {
      const item = await _sp.web.lists
        .getByTitle(LIST_NAME)
        .items.getById(users.Id)();
      setSurveyResult({
        Id: item.Id,
        Title: item.Title,
        FullName: item.FullName,
        Email: item.Email,
        HasAnsweredSurvey: item.HasAnsweredSurvey,
        Question1: item.Question1,
        Question2: item.Question2,
        Question3: item.Question3,
        Question4: item.Question4,
      });
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    if (showResult) {
      getSurveyResult();
    }
  }, [showResult]);

  const handleShowTheResult = () => {
    setShowResult(true);
  };

  return (
    <div>
      <h1>Survey Form</h1>
      {isUserAnswered ? (
        <div>
          <p>You have already answered the survey</p>
          <Button variant="contained" onClick={handleShowTheResult}>
            View My Response
          </Button>
          <hr />
          {showResult && (
            <Box>
              <h1>Survey Result:</h1>
              <p>
                Question 1--- This is Question 1. if you select Answer A, your
                next question will be Question 2. If you select Answer B, your
                next question will be Question 3.
                <br />
                <strong>{_surveyResult?.Question1}</strong>
              </p>
              <p>
                Question 2 --- What are your favorite programming languages?
                Please select 2.
                <br />
                <strong>
                  {_surveyResult?.Question2.map(
                    (item: string, index: number) => {
                      return (
                        <Chip
                          sx={{
                            mx: 0.5,
                            backgroundColor:
                              index % 2 === 0 ? "#185bd57a" : "#18d5527a",
                          }}
                          key={item}
                          label={item}
                          variant={index % 2 === 0 ? "outlined" : "filled"}
                        />
                      );
                    }
                  )}
                </strong>
              </p>
              <p>
                Question 3 --- When is your birthday?
                <br />
                <strong>{formattedDate}</strong>
              </p>
              <p>
                Question 4 --- Please rate this survey.
                <br />
                <strong>{_surveyResult?.Question4}</strong>
              </p>
              <Button variant="contained" onClick={() => setShowResult(false)}>
                Hide Result
              </Button>
            </Box>
          )}
        </div>
      ) : (
        <div>
          {getStartSurvey ? (
            <QuestionList
              dataCurrentUser={users}
              context={props.context}
              listName={LIST_NAME}
            />
          ) : (
            <Button variant="contained" onClick={() => setGetStartSurvey(true)}>
              Start Survey
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SurveyForm;

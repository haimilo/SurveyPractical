import { Button } from "@mui/material";
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

  return (
    <div>
      <h1>Survey Form</h1>
      {isUserAnswered ? (
        <div>
          <p>You have already answered the survey</p>
          <Button variant="contained">View My Response</Button>
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

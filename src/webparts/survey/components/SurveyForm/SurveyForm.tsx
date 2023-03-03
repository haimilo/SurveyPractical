import { SPFI } from "@pnp/sp";
import * as React from "react";
import { useEffect, useState } from "react";
import { getSP } from "../../../../pnpConfig";
import { ISurveyForm, IUserDataSurvey } from "./ISurveyForm";

const SurveyForm = (props: ISurveyForm) => {
  const LIST_NAME: string = "Survey Results";
  let _sp: SPFI = getSP(props.context);

  const [_dataSurveyForm, _setDataSurveyForm] = useState<IUserDataSurvey[]>([]);
  console.log(_dataSurveyForm);
  const getDataList = async () => {
    try {
      const list = await _sp.web.lists();
      const items = await _sp.web.lists.getByTitle(LIST_NAME).items();
      console.log(items, list);
      _setDataSurveyForm(
        items.map((item: IUserDataSurvey) => {
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

  return (
    <div>
      <h1>Survey Form</h1>
    </div>
  );
};

export default SurveyForm;

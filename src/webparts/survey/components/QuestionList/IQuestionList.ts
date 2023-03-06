import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IUserDataSurvey } from "../SurveyForm/ISurveyForm";

export interface IQuestionList {
  dataCurrentUser: IUserDataSurvey;
  context: WebPartContext;
  listName: string;
}

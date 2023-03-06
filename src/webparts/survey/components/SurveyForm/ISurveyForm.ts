import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISurveyForm {
  context: WebPartContext;
  userEmail: string;
}

export interface IUserDataSurvey {
  Id: number;
  Title: string;
  FullName: string;
  Email: string;
  HasAnsweredSurvey: boolean;
  Question1: string | null;
  Question2: string[] | null;
  Question3: Date | null;
  Question4: number | null;
}

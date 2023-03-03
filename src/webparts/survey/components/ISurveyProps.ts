import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface ISurveyProps {
  userDisplayName: string;
  userEmail: string;
  context: WebPartContext;
}

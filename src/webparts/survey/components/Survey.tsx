import * as React from "react";
import CurrentTime from "./CurrentTime/CurrentTime";
// import styles from "./Survey.module.scss";
import { ISurveyProps } from "./ISurveyProps";
import SurveyForm from "./SurveyForm/SurveyForm";
import UserProfile from "./UserProfile/UserProfile";

const Survey = (props: ISurveyProps) => {
  const { userDisplayName, userEmail, context } = props;
  return (
    <section>
      <UserProfile userDisplayName={userDisplayName} userEmail={userEmail} />
      <CurrentTime />
      <SurveyForm context={context} userEmail={userEmail} />
    </section>
  );
};

export default Survey;

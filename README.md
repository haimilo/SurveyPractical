SharePoint Framework (SPFx) Practical Test
Question: Create a Survey using SPFx.
Requirements

1. Retrieve and display the following information on screen. [[3 points]]
   a. Current User Profile.
   i. Full Name
   ii. Email
   b. Current Date/Time.
   c. If the current logged-in user has not yet answered the survey, display a “Start Survey” button. When current logged-in user clicks the button, start the survey. After user completed the survey, store the answer into SharePoint List.
   d. If the current logged-in user has answered the survey, display a “View My Response” button. When the current logged-in user clicks the button, displayed the survey responded by the current logged-in user.
2. Please find the survey questions below. Display one question only in one page. [[12 points]]

Question 1 --- This is Question 1. if you select Answer A, your next question will be Question 2. If you select Answer B, your next question will be Question 3.
Answer for Question 1, displayed as buttons
(A) Answer A, Go to Question 2
(B) Answer B, Go to Question 3

Question 2 --- What are your favorite programming languages? Please select 2.
Answer for Question 2, displayed as multi-select checkboxes
(A) C#
(B) Java
(C) PHP
(D) Python
(E) R

Question 3 --- When is your birthday?
Answer for Question 3, displayed as date control, after the user selected his/her birthday, display his/her age, for e.g., You are X years and Y months old.

Question 4 --- Please rate this survey.
Answer for Question 4, displayed as star ratings, max 5 stars.

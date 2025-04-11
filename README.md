# CPSC481 Degree Planner
CPSC481 Degree Planner is a customizable academic planning tool developed to help students visualize and organize their university courses over a 4-year period. Built with a focus on clarity and flexibility, the planner allows users to assign courses to specific terms, categorize them by type and view their academic progression at a glance. This tool is especially helpful for students trying to meet graduation requirements while balancing electives and major-specific classes. The project is designed to be easily extended or adapted for different programs or institutions.

## Our Group members
* Matthew Cusanelli
* Raaja Varshiny
* Jam Gammuac
* Taimoor Abrar
* Lei Fang

# System Instructions
To get started first open our app at the link _____.  

* Once you are on it you can either choose to click on the "Degree Search" button at the top to view degrees or the ```Course Search``` button.
* Once you have pressed either of these buttons, you are able to search for a degree or course you are interested in.  In this case, if you chose to view courses you can filter courses via their program in the dropdown alongside courses you have taken in your account or via a course number.  Once you have changed one of these fields, you can press ```search``` to see the results!
* For a degree you can filter degrees via the two dropdowns, one is for the faculty of the degree and the other is for the specific program, once you have filled either of those fields, you can also press ```search``` to view the results!
* After you find a course/degree you are interested in, you can view that degree or course through pressing the ``` view detailts ``` button.  This button will take you to the respective course or degree page where you can view their respective details.

## Course page Instructions
* In the case of a course, you can view the prerequisits, aantirequisits as well as review a course via choosing a rating from 1 - 5 from the ```Rate Course``` dropdown.  Once you have entered a rating, you can press ```Rate Course``` to add your rating.
* On this course page, you can also press the box for ```Mark as Taken``` which will mark a course as taken in the search.  This will help users to keep track of the courses they have taken in the system.
* Finally you can press ```Back To search``` to go back to the course Navigation page.

## Degree Page Instructions
* In the case of a Degree, you can view all the required courses in a list, you can narrow that list via selecting a year from the ```Year``` dropdown.  Once you select a year, the results will atuomatically be filtered to display a specic year, with the required courses you need catagorized by semester.
* Finally you can also view a specific course from this page by pressing the ```View Details``` button on  that course.  Please note that courses which are options or are not specific from a field do not have a correspondin button due to there being a large array of courses for the user to choose from.

## Login instructions
* if you so choose to login to our system, you can first press ```Signup``` to go to our account page and create a new account.  Once you fill in the username and password fields you can press ```signup``` to make a new account.
* With this new account, you can then login.

# System functionality
## Login and Signup
* Although user accounts dont do anything due to how ew have no database, we included a loggin in feature which would simulate logging in to the system.  Due to this project being a Prototype it wast neccessary to include a database.

## Course Search
* For course search, we included filters to allow for users to filter a course via a program, course number, and if it was taken or not.  We ensured that users would not enter invalid input for the course number via only letting numbers be entered.
  
## Course Page
* For checking off courses we use cookies to ensure that when you check off a course as taken it will appear in the course search page, ensuring we can simulate in real time saving courses.
* We also included a way to review courses which only allows you to enter a review once and blocks off the ```rate course``` button once you let a review, to ensure users dont review bomb a course.

## Degree Search
* For degree search, we included filters to allow for users to filter a degree via a faculy, and program, ensuring that the defaiult options are for all faculties and programs.
* We also included buttons to view specifc degrees.

# Degree Page
* For the degree page, we included filters to allow for users to select a specific year they want to view, alongside catagorizing years into semesters.
* In the degree page, we also included buttons that go directly to a course to allow for quick navigation to courses.


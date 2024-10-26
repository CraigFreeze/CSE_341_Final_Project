# School GradeBook

View package.json to view requried nodeDependecies. If you need access to the environment Variables for this project, please reach out to Craig Freeze

```bash
npm install body
npm install body-parser
npm install dotenv
npm install cors
npm install express
npm install express-session
npm install express-validator
npm install mongodb
npm install passport
npm install passport-github2
npm install nodemon --save-dev
npm install swagger-autogen --save-dev
npm install swagger-ui-express --save-dev
```

## Links

- [Github](https://github.com/CraigFreeze/CSE_341_Final_Project).
- [Render](https://cse-341-final-project-6enz.onrender.com).
- [Youtube](https://youtube.com).

## Individual Contributions

Each person requires at least 2 Individual Contributions

Craig Freeze
1. Set up Node Project including the relationship between files
1. Set up database
1. Populate class collection with filler data in the MongoDB
1. Populate grade collection with filler data in the MongoDB
1. Populate student collection with filler data in the MongoDB
1. Populate teacher collection with filler data in the MongoDB
1. Set up project file organization
1. Distribute Project information to group including .env information (database URI)
1. Set up getOne teacher (controller, and route)
1. Set up getAll teacher (controller, and route)
1. Trouble shoot authentication errors from production.
1. Assist in error handling



Arnold Sujan Katru
- [Youtube Link Week 5 Contribution Documentation ](https://youtu.be/uc4x-Ytr1Rc).
```
 Main (branch)
  |- arnold (branch for local machine)
  |- arnoldrender (branch for render)
```
1. Add login route
2. Add log out route
3. Develop authenticate.js
4. Update server.js to be compatible with OAuth
5. Update local .env to have client secret and client ID
6. Update Db Initialization in controllers 
7. Implement authentication in routes
8. Organize CRUD in routes 


Jan Zander
1. Validation for GET for teachers collection
2. Validation for POST for teachers collection
3. Validation for PUT for teachers collection
4. Validation for DELETE for teachers collection

5. Validation for GET for class collection
6. Validation for POST for class collection
7. Validation for PUT for class collection
8. Validation for DELETE for class collection

9. Validation for GET for student collection
10. Validation for POST for student collection
11. Validation for PUT for student collection
12. Validation for DELETE for student collection

13. Validation for GET for grade collection
14. Validation for POST for grade collection
15. Validation for PUT for grade collection
16. Validation for DELETE for grade collection

17. created the swagger ui


Ntombi Hontyo
1. PUT endpoints for all collections
1. DELETE endpoints for all collections


Josue Sinaca Gomez 
1. GET single and all for student and class (route and controller)
1. POST for student, class, and teacher (router and controller)
1. class, student, and techer file (rest file) was created to test GET (single and all) and POST
1. GET /student/findByFistName/:firstName
1. GET /student/findByLastName/:lastName
1. GET /class/subject/:subject
1. GET /teacher/name/:name
1. GET /teacher/login
1. GET /teacher/logout
1. GET /teacher/github/callback
1. GET /grade/:gradeID
1. GET /grade/student/:studentId
1. grade.rest to test the endpoints
1. PUT /student/:studentId
1. DELETE /student/:studentId
1. PUT /class/:classId
1. DELETE /class/:classId


Kami Smith
1. Brainstormed idea for our Gradebook Project and collections
2. Aided in the process of finalizing GET endpoints
3. Aided in the process of finalizing POST endpoints
4. Aided in fixing authentication points
5. Unit test for GET all classes
6. Unit test for GET single class
7. Unit test for GET all grades
8. Unit test for GET single grade
9. Unit test for GET all students
10. Unit test for GET single student
11. Unit test for GET all teachers
12. Unit test for GET single teacher

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

Arnold Sujan Katru
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
1. Validation for all routes
1. swagger ui

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
1.
1.

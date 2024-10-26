const { check, query, param, validationResult } = require("express-validator");
const validation = {};

/*#######################################
STUDENT VALIDATION RULES
#######################################*/

validation.studentFindByIdValidationRules = () => {
    return [
        param("id").matches(/^[0-9a-fA-F]{24}$/).withMessage("Invalid ID format. Must be a 24-character hex string (MongoDB ObjectId)")
    ];
};

validation.studentFindLastNameValidationRules = () => {
    return [
        param("last_name").isString().isLength({ min: 1, max: 40 }).withMessage("Last name must be a string with 1 to 40 characters")
    ];
};

validation.studentFindFirstNameValidationRules = () => {
    return [
        param("first_name").isString().isLength({ min: 1, max: 40 }).withMessage("First name must be a string with 1 to 40 characters")
    ];
};

validation.studentCreateValidationRules = () => {
    return [
        check("first_name").isString().isLength({ min: 1, max: 40 }).withMessage("First name must be a string with 1 to 40 characters"),
        check("last_name").isString().isLength({ min: 1, max: 40 }).withMessage("Last name must be a string with 1 to 40 characters"),
        check("enrolled_classes").isArray().withMessage("Enrolled classes must be an array"),
        check("date_of_birth").isDate({ format: 'YYYY-MM-DD' }).withMessage("Date of birth must be in the format YYYY-MM-DD"),
        check("address").isString().isLength({ min: 1, max: 120 }).withMessage("Address must be a string with 1 to 120 characters"),
        check("grade_level").isInt({ min: 1, max: 12 }).withMessage("Grade level must be an integer between 1 and 12")
    ];
};

validation.studentUpdateValidationRules = () => {
    return [
        param("studentId").matches(/^[0-9a-fA-F]{24}$/).withMessage("Invalid ID format. Must be a 24-character hex string (MongoDB ObjectId)"),
        check("first_name").isString().isLength({ min: 1, max: 40 }).withMessage("First name must be a string with 1 to 40 characters"),
        check("last_name").isString().isLength({ min: 1, max: 40 }).withMessage("Last name must be a string with 1 to 40 characters"),
        check("enrolled_classes").isArray().withMessage("Enrolled classes must be an array"),
        check("date_of_birth").isDate({ format: 'YYYY-MM-DD' }).withMessage("Date of birth must be in the format YYYY-MM-DD"),
        check("address").isString().isLength({ min: 1, max: 120 }).withMessage("Address must be a string with 1 to 120 characters"),
        check("grade_level").isInt({ min: 1, max: 12 }).withMessage("Grade level must be an integer between 1 and 12")
    ];
};

validation.studentDeleteByIdValidationRules = () => {
    return [
        // param("id").matches(/^[0-9a-fA-F]{24}$/).withMessage("Invalid ID format. Must be a 24-character hex string (MongoDB ObjectId)")
        param("studentId").isMongoId().withMessage("Invalid ID format. Must be a valid MongoDB ObjectId")
    ];
};

/*#######################################
CLASS VALIDATION RULES
#######################################*/

validation.classFindByIdValidationRules = () => {
    return [
        param("id").matches(/^[0-9a-fA-F]{24}$/).withMessage("Invalid ID format. Must be a 24-character hex string (MongoDB ObjectId)")
    ];
};

validation.classCreateValidationRules = () => {
    return [
        check("course_code").isString().isLength({ min: 1, max: 40 }).withMessage("Course code must be a string with 1 to 40 characters"),
        check("subject").isString().isLength({ min: 1, max: 40 }).withMessage("Subject must be a string with 1 to 40 characters"),
        check("class_description").isString().isLength({ min: 1, max: 120 }).withMessage("Class description must be a string with 1 to 120 characters"),
        check("max_class_size").isInt({ min: 1, max: 1000 }).withMessage("Max class size must be an integer between 1 and 1000")
    ];
};

validation.classBySubjectValidationRules = () => {
    return [
        check("subject").isString().isLength({ min: 1, max: 40 }).withMessage("Subject must be a string with 1 to 40 characters")
    ];
};

validation.classUpdateValidationRules = () => {
    return [
        param("classId").matches(/^[0-9a-fA-F]{24}$/).withMessage("Invalid ID format. Must be a 24-character hex string (MongoDB ObjectId)"),
        check("course_code").isString().isLength({ min: 1, max: 40 }).withMessage("Course code must be a string with 1 to 40 characters"),
        check("subject").isString().isLength({ min: 1, max: 40 }).withMessage("Subject must be a string with 1 to 40 characters"),
        check("class_description").isString().isLength({ min: 1, max: 120 }).withMessage("Class description must be a string with 1 to 120 characters"),
        check("max_class_size").isInt({ min: 1, max: 1000 }).withMessage("Max class size must be an integer between 1 and 1000")
    ];
};

validation.classDeleteByIdValidationRules = () => {
    return [
        // param("classId").matches(/^[0-9a-fA-F]{24}$/).withMessage("Invalid ID format. Must be a 24-character hex string (MongoDB ObjectId)")
        param("classId").isMongoId().withMessage("Invalid ID format. Must be a valid MongoDB ObjectId")
    ];
};

/*#######################################
GRADE VALIDATION RULES
#######################################*/

validation.gradeFindByIdValidationRules = () => {
    return [
        param("grade").matches(/^[0-9a-fA-F]{24}$/).withMessage("Invalid ID format. Must be a 24-character hex string (MongoDB ObjectId)")
    ];
};

validation.gradeFindByStudentIdValidationRules = () => {
    return [
        param("studentId").matches(/^[0-9a-fA-F]{24}$/).withMessage("Invalid ID format. Must be a 24-character hex string (MongoDB ObjectId)")
    ];
};

validation.gradeCreateValidationRules = () => {
    return [
        check("student_id").matches(/^[0-9a-fA-F]{24}$/).withMessage("Invalid ID format. Must be a 24-character hex string (MongoDB ObjectId)"),
        check("assignment_name").isString().isLength({ min: 1, max: 40 }).withMessage("Assignment name must be a string with 1 to 40 characters"),
        check("grade").isString().isLength({ min: 1, max: 2 }).withMessage("Grade must be a string with 1 to 2 characters")
    ];
};

validation.gradeUpdateValidationRules = () => {
    return [
        param("id").matches(/^[0-9a-fA-F]{24}$/).withMessage("Invalid ID format. Must be a 24-character hex string (MongoDB ObjectId)"),
        check("student_id").matches(/^[0-9a-fA-F]{24}$/).withMessage("Invalid ID format. Must be a 24-character hex string (MongoDB ObjectId)"),
        check("assignment_name").isString().isLength({ min: 1, max: 40 }).withMessage("Assignment name must be a string with 1 to 40 characters"),
        check("grade").isString().isLength({ min: 1, max: 2 }).withMessage("Grade must be a string with 1 to 2 characters")
    ];
};

validation.gradeDeleteByIdValidationRules = () => {
    return [
        // param("classId").matches(/^[0-9a-fA-F]{24}$/).withMessage("Invalid ID format. Must be a 24-character hex string (MongoDB ObjectId)")
        param("classId").isMongoId().withMessage("Invalid ID format. Must be a valid MongoDB ObjectId")
    ];
};

/*#######################################
TEACHER VALIDATION RULES
#######################################*/

validation.teacherFindByIdValidationRules = () => {
    return [
        param("id").matches(/^[0-9a-fA-F]{24}$/).withMessage("Invalid ID format. Must be a 24-character hex string (MongoDB ObjectId)")
    ];
};

validation.teacherFindNameValidationRules = () => {
    return [
        param("name").isString().isLength({ min: 1, max: 40 }).withMessage("Name must be a string with 1 to 40 characters")
    ];
};

validation.teacherCreateValidationRules = () => {
    return [
        check("first_name").isString().isLength({ min: 1, max: 40 }).withMessage("First name must be a string with 1 to 40 characters"),
        check("last_name").isString().isLength({ min: 1, max: 40 }).withMessage("Last name must be a string with 1 to 40 characters"),
        check("subject").isString().isLength({ min: 1, max: 40 }).withMessage("Subject must be a string with 1 to 40 characters"),
        check("classes").isArray().withMessage("Classes must be an array")
    ];
};

validation.teacherUpdateValidationRules = () => {
    return [
        param("id").matches(/^[0-9a-fA-F]{24}$/).withMessage("Invalid ID format. Must be a 24-character hex string (MongoDB ObjectId)"),
        check("first_name").isString().isLength({ min: 1, max: 40 }).withMessage("First name must be a string with 1 to 40 characters"),
        check("last_name").isString().isLength({ min: 1, max: 40 }).withMessage("Last name must be a string with 1 to 40 characters"),
        check("subject").isString().isLength({ min: 1, max: 40 }).withMessage("Subject must be a string with 1 to 40 characters"),
        check("classes").isArray().withMessage("Classes must be an array")
    ];
};

validation.teacherDeleteByIdValidationRules = () => {
    return [
        // param("id").matches(/^{24}$/).withMessage("Invalid ID format. Must be a 24-character hex string (MongoDB ObjectId)")
        param("id").isMongoId().withMessage("Invalid ID format. Must be a valid MongoDB ObjectId")
    ];
};

/*#######################################
VALIDATION PROCESS
#######################################*/

validation.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
};

module.exports = validation;

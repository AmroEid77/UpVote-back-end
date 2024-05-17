import joi from 'joi';
const dataMethods = ['body', 'query', 'params']

export const generalFields = {
    email: joi.string().email().required(),
    password: joi.string().min(8).max(20).required(),
    name: joi.string().required(),
    gender: joi.string().alphanum().valid("Male", "Female").required(),
    age: joi.number().integer().min(18).max(100).required(),
    bio: joi.string().max(200).required(),
}
const validation = (schema) => {

    return (req, res, next) => {
        const validationArray = [];
        dataMethods.forEach(method => {
            if (schema[method]) {
                const validationResult = schema[method].validate(req[method], { abortEarly: false });
                if (validationResult.error) {
                    validationArray.push(validationResult.error.details[0].message)
                }
            }
        });
        if (validationArray.length > 0) {
            return res.status(400).json({ message: " validation error", data: validationArray });
        }
        next();
    }


}

export default validation;
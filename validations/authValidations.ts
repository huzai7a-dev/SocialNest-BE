import Joi from 'joi';
import { SignupRequestBody } from '../interfaces/authInterface';


const signupSchema = Joi.object({
    full_name: Joi.string().min(3).max(355).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(255).required(),
    profile_image: Joi.any()
});


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(255).required(),
});

export const validateSignup = (req:SignupRequestBody) => {
    return signupSchema.validate(req);
}

export const validateLogin = (req: {email:string,password:string}) => {
    return loginSchema.validate(req)
}
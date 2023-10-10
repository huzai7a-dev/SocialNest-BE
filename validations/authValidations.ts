import Joi from 'joi';
import { SignupRequestBody } from '../interfaces/RequestInterfaces';


const signupSchema = Joi.object({
    firstName: Joi.string().min(3).max(255).required(),
    lastName: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(255).required(),
    profile_image: Joi.any(),
    bio: Joi.string(),
    city: Joi.string(),
    country: Joi.string(),
    isVerified: Joi.boolean()
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
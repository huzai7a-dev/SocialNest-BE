import { Request, Response } from "express";

import { validateLogin, validateSignup } from "../validations/authValidations";
import { comparePpassword, encryptPassword, getToken } from "../utils";
import { SignupRequestBody } from "../interfaces/RequestInterfaces";
import User from "../models/user";

const handleSignup = async (req: Request, res: Response) => {
    const { error } = validateSignup(req.body as SignupRequestBody);
    if (error) return res.status(400).send(error.details[0].message);

    const { email, firstName,lastName, password } = req.body as SignupRequestBody

    const hashedPassword = await encryptPassword(password);

    try {
        const user = new User({ email, firstName, lastName, password: hashedPassword });
        const savedUser = await user.save()
        res.status(201).json({ message: 'User added successfully',data:savedUser});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'An error occurred while adding a new user' });
    }
}


const handleLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body as { email: string, password: string }

    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const user = await User.findOne({ email });
        if (user) {
            const isCorrectPassword = await comparePpassword(password, user?.password);
            if (!isCorrectPassword) return res.status(400).send('Invalid email or password');
            const token = getToken({ id: user.id, email: user.email });
            return res.status(200).send({ token, message: 'Login successful' });
        }
        else {
            res.status(400).send('Invalid email or password');
        }

    } catch (error: any) {
        console.log(error.stack)
        res.status(500).send('Interval Server Error');
    }
}

export { handleSignup, handleLogin };
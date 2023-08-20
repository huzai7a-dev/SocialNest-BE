import { Request, Response } from "express";

import { SignupRequestBody } from "../interfaces/authInterface";
import { validateLogin, validateSignup } from "../validations/authValidations";
import { comparePpassword, encryptPassword, getToken, uploadImage } from "../utils";
import { createUser, searchUserByEmail } from "../utils/dbUtils/users";

const handleSignup = async (req: Request, res: Response) => {
    const { error } = validateSignup(req.body as SignupRequestBody);
    if (error) return res.status(400).send(error.details[0].message);

    const { email, full_name, password } = req.body as SignupRequestBody

    let profile_image_url;
    if (req?.files) {
        try {
            profile_image_url = await uploadImage(req?.files);
        } catch (error) {
            res.status(500).send('Internel Server Error');
        }
    }
    const hashedPassword = await encryptPassword(password);

    try {
        await createUser({ email, full_name, password: hashedPassword, profile_image_url });
        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while adding a new user' });
    }
}


const handleLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body as { email: string, password: string }

    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const user = await searchUserByEmail(email);
        if (user) {
            const isCorrectPassword = await comparePpassword(password, user?.password)
            const token = getToken({ id: user.id, email: user.email });
            if (!isCorrectPassword) return res.status(400).send('Invalid email or password');
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
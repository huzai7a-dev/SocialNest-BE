import Joi from 'joi';
import { FeedRequestBody } from '../interfaces/RequestInterfaces';

const feedSchema = Joi.object({
    caption: Joi.string().required(),
    user:Joi.any()
});

export const validateFeed = (body: FeedRequestBody) => {
    return feedSchema.validate(body)
}
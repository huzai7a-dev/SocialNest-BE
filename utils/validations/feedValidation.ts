import Joi from 'joi';
import { FeedRequestBody } from '../../interfaces/RequestInterfaces';

const feedSchema = Joi.object({
    caption: Joi.string().required(),
    post_media: Joi.string(),
    user:Joi.any()
});

export const validateFeed = (body: FeedRequestBody) => {
    return feedSchema.validate(body)
}
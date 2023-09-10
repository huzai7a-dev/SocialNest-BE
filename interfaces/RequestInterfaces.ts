import { JwtResponse } from "./ResponseInterfaces";

export interface SignupRequestBody {
    full_name: string,
    email: string,
    password: string,
    profile_image_url?:string,
}

export interface FeedRequestBody {
    caption: string,
    user: JwtResponse,
    post_media?:string
}
import { JwtResponse } from "./ResponseInterfaces";

export interface SignupRequestBody {
    firstName: string,
    lastName: string
    email: string,
    password: string,
    profile_image_url?:string,
}

export interface FeedRequestBody {
    caption: string,
    user: JwtResponse,
}
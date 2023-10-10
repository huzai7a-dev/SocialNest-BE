export interface JwtResponse {
    id: string,
    email:string
}

export interface UserResponseBody {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    profile_image?: String,
    bio?: String,
    city?: String,
    country?: String,
    isVerified:boolean
}

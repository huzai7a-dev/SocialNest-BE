export interface JwtResponse {
    id: number,
    email:string
}

export interface UserResponseBody {
    id: number,
    email: string,
    full_name: string,
    profile_image?: string,
    join_date:Date,
    last_login: Date,
    is_verified: 1 | 0,
    is_active:1 | 0
}

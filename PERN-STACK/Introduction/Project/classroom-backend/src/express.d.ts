declare global { globals } from 'globals'; {
    namespace Express {
        interface Request {
            user?: {
                role?: "admin" | "teacher" | "student"
            }
        }
    }
}

export {};
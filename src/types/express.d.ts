import { JwtPayload } from "./auth.interface";


declare global { //in the global score
    namespace Express{ // in the express namespace
        interface Request{ // extending the Request Interface
            authUser?: JwtPayload //adding optional authUser property for storing JwtPayload data during middleware operations
        }
    }
}
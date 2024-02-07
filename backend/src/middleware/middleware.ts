import jwt, {JwtPayload} from "jsonwebtoken"
import { JWT_SECRET } from "../config";

export default function middleware(req: any, res: any, next: any){
    const { authorization: token } = req.headers;
    const myToken = token.split(" ")[1];
    try{
        const decode = jwt.verify(myToken, JWT_SECRET) as JwtPayload;
        req.body.userId = decode.userId;
        next();
    }catch(error){
        return res.status(403).json({msg: "Auth failed!"});
    }
}
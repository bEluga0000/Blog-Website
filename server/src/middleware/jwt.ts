import jwt from 'jsonwebtoken'
export const secretKey:string|undefined = process.env.SECRET_KEY
import {Request,Response,NextFunction} from 'express'
export const authentication = (req:Request,res:Response,next:NextFunction)=>{
    const authHeader = req.headers.authorization
    if(authHeader){
        if (secretKey === undefined) {
            return res.status(500).json({ message: 'Secret key is not defined' });
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token,secretKey,(err,user)=>{
            if(err){
                return res.status(401).json({err})
            }
            if(!user)
            {
                return res.status(404).json({message:'User not found'})
            }
            if(typeof user === 'string')
            {
                return res.status(404).json({message:'USer is not valid'})
            }
            req.headers["userId"] = user.id;
            next();
        })
    }
    else
    {
        return res.status(401).json({message:'Header not set'})
    }
}
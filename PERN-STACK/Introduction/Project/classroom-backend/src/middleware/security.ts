// were creating a middleware for security right now

import type {Request,Response, NextFunction } from "express";
import { number } from "framer-motion";
import { error } from "node:console";
import aj from '../config/arcjet';
import { slidingWindow, type ArcjetNodeRequest } from "@arcjet/node";

const securityMiddleware = async (req: Request, res: Response, next: NextFunction) => {
if (process.env.NODE_ENV === 'test') return next();

try {
    // in this way we can allow for example admins or teachers to make more requests than students
    const role: RateLimitRole = req.user?.role ?? 'guest';

    let limit: number;
    let message: string;

    switch(role) {
        case 'admin': 
        limit = 20;
        message= 'Admin request exceded (20 per minute)';
        break;
        
        case 'teacher': 
        case 'student': 
        
        limit = 0;
        message= 'User request exceded (10 per minute). Please wait';
        break;
        default: 
        limit = 5
        message = 'Guest request limit. please signup for more limits'
    }


    const client = aj.withRule(
        slidingWindow({
            mode: 'LIVE',
            interval: '1m',
            max: limit
        }),

    )

    const arcjetRequest: ArcjetNodeRequest = {
headers: req.headers,
method: req.method,
url: req.originalUrl ?? req.url,
socket: {remoteAddress: req.socket.remoteAddress ??  req.ip ?? '0.0.0.0'}
    
    }

    const decision = await client.protect(arcjetRequest);


            if(decision.isDenied() && decision.reason.isBot() ) {
                return res.status(403).json({error: 'Forbidden', message: 'Automated requests are not allowed'});

            }
                if(decision.isDenied() && decision.reason.Sheild() ) {
            return res.status(403).json({error: 'Forbidden', message: 'Request Blocked by Security policy'});
            
        }
             if(decision.isDenied() && decision.reason.isRateLimit() ) {
                return res.status(403).json({error: 'Too many requests', message: message});
                
            }
                next();
} catch (e) {
    console.error('Arcjet middlware error:', e)

    res.status(500).json({error: 'Internal error', message: 'Something went wrong with the security middleware'});

}


}

export default securityMiddleware;
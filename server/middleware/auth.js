import jwt, { decode } from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const auth = async (req, res, next) => {

    try {
       const token = await req.headers.authorization.split(" ")[1];

       if(token === "") return res.status(404).json({ message: "no token found"});

        if(token) {

            if(token.length < 500) {

                await jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                    if(err) {
                        return res.status(404).json({ message: "Failed to verify token."+err })
                    }else {
                        next();
                    }
                });

            }else {

                const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
                client.verifyIdToken({idToken: token, audience: process.env.GOOGLE_CLIENT_ID})
                .then(response => {
                    if(response.payload.email_verified){
                        next();
                    }else {
                        return res.status(200).json({ message: "Email not verified.", error });

                    }
                    
                })
                .catch((error) => {
                    console.log(error);
                    res.status(200).json({ message: "Invalid token.", error });

                })
            }
        }
        
    } catch (error) {
        res.status(404).json({ message: "Sorry. Access denied. Good luck hacking", error: error.message});
    }
}

export default auth;
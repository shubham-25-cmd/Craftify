import jwt from 'jsonwebtoken'

export function authMiddleware(req,res,next){
  const token = req.cookies.token;
  if(!token){
    res.status(401).json({
      error:'Acess denied. No session porvided'
    });

  }try{
const decoded = jwt.verify(token,process.env.JWT_SECRET|| 'fallback secret');
req.user =decoded;
next()
  }catch(error){
res.status(401).json({
  error:'session expired or invalid.Please sign in again'
});

  }
}
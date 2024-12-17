import jwt from 'jsonwebtoken'
import catchAsync from '../utils/catchAsync.js';
import client from '../dbConfig.js';

const authMiddleware = catchAsync(async (req, res, next) => {
    console.log(req);
    const token = req.cookies?.token;
    if (!token) {
      const err = new Error("Unauthorized!");
      err.statusCode = 401;
      return next(err);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    const role = decoded.role === "operator"? "Tour_Operator" : decoded.role === "guide"? "Tour_Guide" : "Tourist";

    const user = await client.query(
      `SELECT * FROM ${role} WHERE ID = $1`, [id]
    );

    if (!user.rowCount){
      const err = new Error("Unauthorized!");
      err.statusCode = 401;
      return next(err);
    }
    
    req.user = user.rows[0];
    req.role = decoded.role; 
    next();
});

export default authMiddleware
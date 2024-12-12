import jwt from 'jsonwebtoken'
import catchAsync from '../utils/catchAsync.js';
import client from '../dbConfig.js';

const authMiddleware = catchAsync(async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    const role = decoded.role;
    // how to determine which to select from them ???
    let user;
    if(role === "tourist")
      user = await client.query('SELECT * FROM Tourist WHERE ID = $1', [id]);
    else if(role === "guide")
      user = await client.query('SELECT * FROM Tour_Guide WHERE ID = $1', [id]);
    else if(role === "operator")
      user = await client.query('SELECT * FROM Tour_Operator WHERE ID = $1', [id]);
    if (!user.rows.length)
      return res.status(401).json({ message: 'Unauthorized' });
    req.user = user.rows[0];
    req.role = role; 
    next();
});

export default authMiddleware
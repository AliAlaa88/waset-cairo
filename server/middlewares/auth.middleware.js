import jwt from 'jsonwebtoken'
import catchAsync from '../utils/catchAsync.js';

const authMiddleware = catchAsync(async (req, res, next) => {
    const token = req.cookie.token;
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
      user = await client.query('SELECT * FROM Tour guide WHERE ID = $1', [id]);
    else if(role === "operator")
      user = await client.query('SELECT * FROM Tour Operator WHERE ID = $1', [id]);
    if (!user.rows.length)
      return res.status(401).json({ message: 'Unauthorized' });
    req.user = user.rows[0];
    req.body.role = role; // req.role ??
    next();
});

export default authMiddleware
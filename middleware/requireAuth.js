// const jwt = require('jsonwebtoken');

// const User = require('../models/user-model');

// const requireAuth = async (req, res, next) => {
//   const { authorization } = req.headers;
//   console.log('Authorization Header:', authorization); 

//   if (!authorization) {
//     return res
//       .status(401)
//       .json({ error: 'Authorization token required.' });
//   }

//   const token = authorization.split(' ')[1];

//   try {
//     const { _id } = jwt.verify(token, process.env.JWT_SECRET);
//     console.log('Decoded Token ID:', _id);

//     req.user = await User.findOne(_id).select('_id');
//     next();
//   } catch (err) {
//     console.log(err);
//     res.status(401).json({ error: 'Request is not authorized' });
//   }
// };

// module.exports = requireAuth;

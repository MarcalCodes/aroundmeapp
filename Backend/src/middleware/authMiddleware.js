
/*
*  Comes from see: "https://expressjs.com/en/guide/writing-middleware.html"
*/


export const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized: Not logged in' });
  }
};
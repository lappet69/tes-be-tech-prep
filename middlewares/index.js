import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

class Middleware {


  // authentication user
  isAuthenticated(req, res, next) {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return res.status(401).json({ mgs: "unauthenticated" });
    }
    const token = authHeader.split(" ")[1];

    // verify jwt
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, "secretKey");
    } catch (error) {
      return res.status(401).json({ mgs: "unauthenticated" });
    }
    if (!decodedToken) {
      return res.status(401).json({ mgs: "unauthenticated" });
    }
    req.body.locals = decodedToken;
    next();
  }
}
export default new Middleware();

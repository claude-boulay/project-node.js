import fs from 'fs';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    
	const auth = req.headers.authorization;
    const secret=fs.readFileSync(".env","utf8");
    console.log(secret);

	const token = auth?.split(" ")[1];
    console.log(token);

	if (!token) {
		res.status(401).send("Unauthorized");
	}

	try {
		const decoded = jwt.verify(token, secret);

		req.user = decoded;
		next();
	} catch (e) {
		res.status(401).send("Unauthorized");
	}
};
import express from "express";
const router = express.Router();
export default router;

import { createUser, getUserByUsernameAndPassword } from "#db/queries/users";
import requireBody from "#middleware/requireBody";
import { createToken } from "#utils/jwt";

router
  .route("/register") // handles request to /users/register
  .post(requireBody(["username", "password"]), async (req, res, next) => {
    const { username, password } = req.body;
    const user = await createUser(username, password);

    const token = createToken({ id: user.id });
    res.status(201).send(token);
  });

router
  .route("/login") // handles request to /users/login
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsernameAndPassword(username, password);
    if (!user) return res.status(401).send("Invalid username or password.");

    const token = createToken({ id: user.id });
    res.send(token);
  });

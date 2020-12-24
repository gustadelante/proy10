import { Router } from "express";
const router = Router();

import * as authCtrl from "../controllers/auth.controller";
import { verifySignup, authJwt } from "../middlewares";


router.post(
  "/signup",
  [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted],
  authCtrl.signUp
);

router.post("/signin", authCtrl.signin);

router.get("/", authJwt.verifyToken, authCtrl.usuarioAutenticado)

export default router;

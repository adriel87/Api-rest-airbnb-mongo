import { envConstant } from "#core/index.js";
import { CookieOptions } from "express";

export const secureCookieOptions : CookieOptions = {
    httpOnly:true,
    secure: envConstant.isProduction
}
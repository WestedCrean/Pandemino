import { Inject, Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt } from "passport-jwt"
import { FirebaseAuthStrategy, FirebaseUser } from "@tfarras/nestjs-firebase-auth"
import { AuthService } from "./auth.service"

@Injectable()
export class FirebaseStrategy extends PassportStrategy(FirebaseAuthStrategy, "firebase") {
    public constructor(private authService: AuthService) {
        super({
            extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload: FirebaseUser): Promise<FirebaseUser> {
        await this.authService.validateUser(payload.email)
        return payload
    }
}

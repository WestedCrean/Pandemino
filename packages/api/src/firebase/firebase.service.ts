import { Injectable, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppOptions, initializeApp, app } from 'firebase-admin'
import { firebaseConfig } from './firebaseConfig';


@Injectable()
export class FirebaseService {
    private readonly firebaseReference : app.App = initializeApp(firebaseConfig)

    public async getInstance() {
        return this.firebaseReference
    }
}

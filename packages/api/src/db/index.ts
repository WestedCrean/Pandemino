import { ConnectionOptions } from "typeorm"

const connectionOptions: ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "pandemino",
    synchronize: true,
    logging: false,
    entities: [__dirname + "src/db/entity/**/*.ts"],
    migrations: ["src/db/migration/**/*.ts"],
    subscribers: ["src/db/subscriber/**/*.ts"],
    cli: {
        entitiesDir: "src/db/entity",
        migrationsDir: "src/db/migrations",
        subscribersDir: "src/db/subscriber",
    },
}

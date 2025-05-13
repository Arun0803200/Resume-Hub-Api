import { MicroframeworkSettings, MicroframeworkLoader } from "microframework";
import { getConnectionOptions, createConnection } from "typeorm";
import * as Migration from "../../src/common/index.migration";
import * as models from "../../src/common/index.model";
export const typeormLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings) => {  
    const loaderOption: any = await getConnectionOptions();    
    const connectionOptions: any = Object.assign(loaderOption, {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        database: 'db_resume_hub',
        password: 'Welcome123$',
        synchronize: false,
        logging: true,
        entities: Object.values(models),
        migrations: Object.values(Migration),
        cli: {
            migrationsDir: './src/database/Migrations'
        }
    });
    const connection = await createConnection(connectionOptions)    
    connection.runMigrations();
    if (settings) {
        settings.setData('connection', connection)
    }
}

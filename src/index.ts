import { initServer } from './server';

// @ts-ignore
import { sequelize } from '../models';


async function main() {
    try {
        await sequelize.authenticate();
        initServer(sequelize);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();

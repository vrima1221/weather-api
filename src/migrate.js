import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from './db.js';

export const runMigrations = async () => {
  const umzug = new Umzug({
    migrations: {
      glob: 'migrations/*.js', // шлях до твоїх міграцій
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });

  await umzug.up();
};

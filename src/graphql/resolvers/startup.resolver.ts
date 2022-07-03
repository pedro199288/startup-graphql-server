import db from '../../db';
import { Startup, StartupEntry, StartupNode } from '../../types';
import { v4 as uuidv4 } from 'uuid';

// TODO: implement all CRUD operations

const getAll = () => db.startups;

const getById = (root: any, { id }: Partial<Startup>) => db.startups.find((s) => s.id === id);

const getStartupPhases = (parent: StartupNode) => {
  return db.phases.map((p) => ({ ...p, startupId: parent.id })); // assume all phases are linked to all startups
};

const createStartup = (obj: any, { name }: Pick<StartupEntry, 'name'>): StartupEntry => {
  const startup = { id: uuidv4(), name };
  db.startups.push(startup);
  return startup;
};

export const startupResolvers = {
  Query: {
    startups: getAll,
    startup: getById,
  },
  Startup: {
    phases: getStartupPhases,
  },
  Mutation: {
    createStartup,
  },
};

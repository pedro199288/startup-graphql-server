import db from '../../db';
import { Phase, PhaseEntry, PhaseNode } from '../../types';
import { v4 as uuidv4 } from 'uuid';

// TODO: implement all CRUD operations

const getAll = () => db.phases;

const getById = (root: any, { id }: Partial<Phase>) => {
  return db.phases.find((p) => p.id === id);
};

const getPhaseTasks = (parent: PhaseNode) => {
  if (parent.startupId) {
    // looking for taks linked to a phase and a startup
    const tasksCompletionLinked = db.startupTaskCompletions.filter(
      (sTC) =>
        sTC.startupId === parent.startupId &&
        db.tasks.find((t) => t.id === sTC.taskId && t.phaseId === parent.id)
    );

    return tasksCompletionLinked.map((tcl) => {
      const taskData = db.tasks.find((t) => t.id === tcl.taskId);
      return { ...taskData, completed: tcl.completed };
    });
  }
  // looking for tasks not linked to a startup
  return db.tasks.filter((t) => t.phaseId === parent.id);
};

const createPhase = (
  obj: any,
  { name, executionOrder }: Pick<PhaseEntry, 'name' | 'executionOrder'>
): PhaseEntry => {
  const phase = { id: uuidv4(), name, executionOrder };
  db.phases.push(phase);
  return phase;
};

export const phaseResolvers = {
  Query: {
    phases: getAll,
    phase: getById,
  },
  Phase: {
    tasks: getPhaseTasks,
  },
  Mutation: {
    createPhase,
  },
};

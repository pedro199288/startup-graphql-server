import db from '../../db';
import { Task, TaskEntry, TaskNode } from '../../types';
import { v4 as uuidv4 } from 'uuid';

// TODO: implement all CRUD operations

const getAll = () => db.tasks;

const getById = (root: any, { id }: Partial<Task>) => db.tasks.find((t) => t.id === id);

const getTaskPhase = (parent: TaskNode) => db.phases.find((p) => p.id === parent.phaseId);

const createTask = (
  obj: any,
  { title, phaseId }: Pick<TaskEntry, 'title' | 'phaseId'>
): TaskEntry => {
  const task = { id: uuidv4(), title, phaseId, completed: false };
  db.tasks.push(task);
  return task;
};

export const taskResolvers = {
  Query: {
    tasks: getAll,
    task: getById,
  },
  Task: {
    phase: getTaskPhase,
  },
  Mutation: {
    createTask,
  },
};

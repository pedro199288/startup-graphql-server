import db from '../../db';
import { StartupTaskCompletionEntry, Task } from '../../types';

/**
 * returns the updated task completion and its index
 */
const getUpdateTaskCompletion = (startupId: string, taskId: string, completed: boolean) => {
  const index = db.startupTaskCompletions.findIndex(
    (sTC) => sTC.startupId === startupId && sTC.taskId === taskId
  );
  if (index === -1) {
    throw new Error('Startup or task not found');
  }
  const updatedTaskCompletion = { ...db.startupTaskCompletions[index], completed };
  return { updatedTaskCompletion, index };
};

const getTaskWithCompletionAndOrder = (startupId: string) =>
  db.tasks.map((t) => {
    return {
      ...t,
      // TODO: do a proper check of existence instead of use non-null assertion
      phaseOrder: db.phases.find((p) => p.id === t.phaseId)?.executionOrder!,
      completed:
        db.startupTaskCompletions.find((sTC) => sTC.taskId === t.id && sTC.startupId === startupId)
          ?.completed ?? false,
    };
  });

const completeTask = (
  obj: any,
  { startupId, taskId }: Pick<StartupTaskCompletionEntry, 'startupId' | 'taskId'>
): Task => {
  const { updatedTaskCompletion, index } = getUpdateTaskCompletion(startupId, taskId, true);
  const tasksWithOrder = getTaskWithCompletionAndOrder(startupId);
  const updatedTaskCompletionWithOrder = {
    ...updatedTaskCompletion,
    phaseOrder: tasksWithOrder.find((t) => t.id === taskId)?.phaseOrder!,
  };

  if (
    tasksWithOrder.find(
      (t) => !t.completed && t.phaseOrder < updatedTaskCompletionWithOrder.phaseOrder
    )
  ) {
    throw new Error('You must complete all previous phases');
  }

  db.startupTaskCompletions[index] = updatedTaskCompletion;

  const taskData = db.tasks.find((t) => t.id === taskId)!;
  return { ...taskData, completed: db.startupTaskCompletions[index].completed };
};

const uncompleteTask = (
  obj: any,
  { startupId, taskId }: Pick<StartupTaskCompletionEntry, 'startupId' | 'taskId'>
): Task[] => {
  const { updatedTaskCompletion, index } = getUpdateTaskCompletion(startupId, taskId, false);
  db.startupTaskCompletions[index] = updatedTaskCompletion;

  const tasksWithOrder = getTaskWithCompletionAndOrder(startupId);
  const updatedTaskCompletionWithOrder = {
    ...updatedTaskCompletion,
    phaseOrder: tasksWithOrder.find((t) => t.id === taskId)?.phaseOrder!,
  };

  return tasksWithOrder.map((t) => {
    if (t.phaseOrder > updatedTaskCompletionWithOrder.phaseOrder) {
      const { updatedTaskCompletion, index } = getUpdateTaskCompletion(startupId, t.id, false);
      db.startupTaskCompletions[index] = updatedTaskCompletion;

      const { phaseOrder, ...rest } = t; // remove phaseOrder
      return { ...rest, completed: false };
    }
    const { phaseOrder, ...rest } = t;
    return t.id === taskId ? { ...rest, completed: false } : rest;
  });
};

const linkTaskToStartup = (
  obj: any,
  { startupId, taskId }: Pick<StartupTaskCompletionEntry, 'startupId' | 'taskId'>
): StartupTaskCompletionEntry => {
  // check if startup and tasks exists
  const startup = db.startups.find((s) => s.id === startupId);
  const task = db.tasks.find((t) => t.id === taskId);
  if (!startup || !task) {
    throw new Error('Startup or task not found');
  }
  const startupTaskCompletion = {
    startupId,
    taskId,
    completed: false,
  };
  db.startupTaskCompletions.push(startupTaskCompletion);
  return startupTaskCompletion;
};

export const startupTaskCompletionResolvers = {
  Mutation: {
    completeTask,
    uncompleteTask,
    linkTaskToStartup,
  },
};

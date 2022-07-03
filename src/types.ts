// general types
export type IdEntry = {
  id: string;
};

export type GraphqlNode<parentNode = {}> = {
  __typename: string;
  parent: parentNode;
};

export type DataBase = {
  startups: StartupEntry[];
  phases: PhaseEntry[];
  tasks: TaskEntry[];
  startupTaskCompletions: StartupTaskCompletionEntry[];
};

// Startup
export type StartupEntry = IdEntry & {
  name: string;
};
export type Startup = StartupEntry & {
  tasks: Task[];
};
export type StartupNode = GraphqlNode<null> & Startup;

// Phase
export type PhaseEntry = IdEntry & {
  name: string;
  order: number;
};
export type Phase = PhaseEntry & {
  startupId?: string;
  tasks: Task[];
};
export type PhaseNode = GraphqlNode<Startup | Task> & Phase;

// Task
export type TaskEntry = IdEntry & {
  title: string;
  phaseId: string;
};
export type Task = TaskEntry & {
  phase?: Phase;
  completed: boolean;
};
export type TaskNode = GraphqlNode<Phase | Startup> & Task;

// StartupTaskCompletion
export type StartupTaskCompletionEntry = {
  startupId: string;
  taskId: string;
  completed: boolean;
};
export type StartupTaskCompletion = StartupTaskCompletionEntry & {
  startup: Startup;
  task: Task;
};
export type StartupTaskCompletionNode = GraphqlNode & StartupTaskCompletionEntry;

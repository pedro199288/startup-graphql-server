import { gql } from 'apollo-server';

const typeDefs = gql`
  ### types
  type Startup {
    id: ID!
    name: String!
    phases: [Phase!]!
    # ... more fields to describe startup, created_at, updated_at, etc.
  }

  type Phase {
    id: ID!
    startupId: ID
    name: String!
    executionOrder: Int!
    tasks: [Task!]!
    # ... more fields to describe phase, created_at, updated_at, etc.
  }

  type Task {
    id: ID!
    title: String!
    phaseId: ID!
    phase: Phase!
    completed: Boolean
    # ... more fields to describe task, created_at, updated_at, etc.
  }

  type StartupTaskCompletion {
    startup: Startup!
    task: Task!
    completed: Boolean!
  }

  type Query {
    startup(id: ID!): Startup
    startups: [Startup!]
    phase(id: ID!): Phase
    phases: [Phase!]
    task(id: ID!): Task
    tasks: [Task!]
  }

  ### mutations
  # TODO: create inputs types for mutations

  type Mutation {
    createStartup(name: String!): Startup
    createPhase(name: String!, executionOrder: Int!): Phase
    createTask(title: String!, phaseId: ID!): Task
    linkTaskToStartup(startupId: ID!, taskId: ID!): StartupTaskCompletion
    # TODO: addNewTaskToStartup that wouuld admit a TaskInput and startupId
    completeTask(startupId: ID!, taskId: ID!): Task
    uncompleteTask(startupId: ID!, taskId: ID!): [Task] # return an array with all startup tasks as some can become uncompleted when a previous phase becomes uncompleted
  }
`;

export default typeDefs;

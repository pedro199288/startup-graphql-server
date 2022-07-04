import { DataBase } from './types';

// initial data to make it easy to test
const db: DataBase = {
  startups: [
    {
      name: 'Some awesome startup',
      id: '509aa7e1-411d-4a1f-ac65-c9536bb36043',
    },
  ],
  phases: [
    { id: 'fe34136d-b6a0-4574-9d67-2b0bfd168d1a', name: 'Foundation', executionOrder: 1 },
    { id: '8700802a-dcb2-49ea-9287-1e3678c056af', name: 'Discovery', executionOrder: 2 },
    { id: '2f2ceceb-7656-444b-9b7f-cea14164d2bd', name: 'Delivery', executionOrder: 3 },
  ],
  tasks: [
    {
      title: 'Set startup name',
      id: '6f726f13-0f24-44b1-8e8b-9505a5b9ffd1',
      phaseId: 'fe34136d-b6a0-4574-9d67-2b0bfd168d1a',
    },
    {
      title: 'Change startup name',
      id: '16281ce8-6dc0-4f5b-a856-4bb89b9ece17',
      phaseId: 'fe34136d-b6a0-4574-9d67-2b0bfd168d1a',
    },
    {
      title: 'get some money',
      id: '3c7ebc54-520c-4731-9632-0f03556da072',
      phaseId: '8700802a-dcb2-49ea-9287-1e3678c056af',
    },
    {
      title: 'study other companies',
      id: 'c1415062-4387-48ed-b140-621c72d1e7df',
      phaseId: '8700802a-dcb2-49ea-9287-1e3678c056af',
    },
    {
      title: 'study potential advantages',
      id: '3f386df7-38df-4ed9-857d-d9ed32c71375',
      phaseId: '8700802a-dcb2-49ea-9287-1e3678c056af',
    },
    {
      title: 'launch the company',
      id: '078278b8-f993-46f8-a375-a77c0c58b94a',
      phaseId: '2f2ceceb-7656-444b-9b7f-cea14164d2bd',
    },
    {
      title: 'earn a lot of money',
      id: '0ab3efed-4678-49ce-81d6-a74ee3fa778a',
      phaseId: '2f2ceceb-7656-444b-9b7f-cea14164d2bd',
    },
  ],
  startupTaskCompletions: [
    {
      startupId: '509aa7e1-411d-4a1f-ac65-c9536bb36043',
      taskId: '6f726f13-0f24-44b1-8e8b-9505a5b9ffd1',
      completed: true,
    },
    {
      startupId: '509aa7e1-411d-4a1f-ac65-c9536bb36043',
      taskId: '16281ce8-6dc0-4f5b-a856-4bb89b9ece17',
      completed: true,
    },
    {
      startupId: '509aa7e1-411d-4a1f-ac65-c9536bb36043',
      taskId: '3c7ebc54-520c-4731-9632-0f03556da072',
      completed: false,
    },
    {
      startupId: '509aa7e1-411d-4a1f-ac65-c9536bb36043',
      taskId: 'c1415062-4387-48ed-b140-621c72d1e7df',
      completed: false,
    },
    {
      startupId: '509aa7e1-411d-4a1f-ac65-c9536bb36043',
      taskId: '3f386df7-38df-4ed9-857d-d9ed32c71375',
      completed: false,
    },
    {
      startupId: '509aa7e1-411d-4a1f-ac65-c9536bb36043',
      taskId: '078278b8-f993-46f8-a375-a77c0c58b94a',
      completed: false,
    },
    {
      startupId: '509aa7e1-411d-4a1f-ac65-c9536bb36043',
      taskId: '0ab3efed-4678-49ce-81d6-a74ee3fa778a',
      completed: false,
    },
  ],
};

export default db;

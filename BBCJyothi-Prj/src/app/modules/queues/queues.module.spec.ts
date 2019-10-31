import { QueuesModule } from './queues.module';

describe('QueuesModule', () => {
  let queuesModule: QueuesModule;

  beforeEach(() => {
    queuesModule = new QueuesModule();
  });

  it('should create an instance', () => {
    expect(queuesModule).toBeTruthy();
  });
});

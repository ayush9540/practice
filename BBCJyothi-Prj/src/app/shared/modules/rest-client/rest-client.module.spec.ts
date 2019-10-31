import { RestClientModule } from './rest-client.module';

describe('RestClientModule', () => {
  let restClientModule: RestClientModule;

  beforeEach(() => {
    restClientModule = new RestClientModule();
  });

  it('should create an instance', () => {
    expect(restClientModule).toBeTruthy();
  });
});

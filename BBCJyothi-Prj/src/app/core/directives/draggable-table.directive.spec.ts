import { DraggableTableDirective } from './draggable-table.directive';

describe('DraggableTableDirective', () => {
  it('should create an instance', () => {
    let elem;
    let renderer;
    const directive = new DraggableTableDirective(elem, renderer);
    expect(directive).toBeTruthy();
  });
});

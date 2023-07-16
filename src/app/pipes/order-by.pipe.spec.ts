import { CourseItem } from '../utils/public_api';
import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  const pipe = new OrderByPipe();

  it('transform should sort array', () => {
    const mock = [{ name: 'cba' }, { name: 'abc' }] as CourseItem[];

    expect(pipe.transform(mock, 'name')).toBe(mock);
  });
});

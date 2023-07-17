import { CourseItem } from '../utils/global.modules';
import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  const pipe = new FilterPipe();

  it('transform should return original value if value length === 0 ', () => {
    expect(pipe.transform([], 'test', 'name')).toEqual([]);
  });

  it('transform should return original value if filterString is empty', () => {
    const mock = [{ name: 'name' }] as CourseItem[];

    expect(pipe.transform(mock, '', 'name')).toEqual(mock);
  });

  it('transform should return array depending on filterString', () => {
    const mock = [{ name: 'title1' }, { name: 'title2' }] as CourseItem[];

    expect(pipe.transform(mock, 'Title1', 'name')).toEqual([mock[0]]);
  });
});

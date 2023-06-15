import { CourseItem } from '../utils/global.modules';
import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  const pipe = new FilterPipe();

  it('transform should return original value if value length === 0 ', () => {
    expect(pipe.transform([], 'test', 'title')).toEqual([]);
  });

  it('transform should return original value if filterString is empty', () => {
    const mock = [{ title: 'title' }] as CourseItem[];

    expect(pipe.transform(mock, '', 'title')).toEqual(mock);
  });

  it('transform should return array depending on filterString', () => {
    const mock = [
      { title: 'title1' },
      {
        title: 'title2',
      },
    ] as CourseItem[];

    expect(pipe.transform(mock, 'Title1', 'title')).toEqual([mock[0]]);
  });
});

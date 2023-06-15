import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  const pipe = new DurationPipe();

  it('transform should return minutes if value < 60', () => {
    expect(pipe.transform(2)).toBe(' 2min');
  });

  it('transform should return hours and minutes if value > 60', () => {
    expect(pipe.transform(61)).toBe('1h 1min');
  });
});

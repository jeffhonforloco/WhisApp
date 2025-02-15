import { platformConstants } from '../../platform';

describe('Platform Constants', () => {
  it('provides valid constants', () => {
    expect(platformConstants).toBeDefined();
    expect(typeof platformConstants.statusBarHeight).toBe('number');
    expect(typeof platformConstants.tabBarHeight).toBe('number');
  });

  it('has valid animation configurations', () => {
    expect(platformConstants.animation).toBeDefined();
    expect(platformConstants.animation.spring).toBeDefined();
  });
});
import { getYearsByStep, getLunarYearByStep } from '../year';

describe('getYearsByStep', () => {
  test('end 2015', () => {
    expect(getYearsByStep({ end: 2015 })).toEqual(expect.arrayContaining([2011, 2012, 2013, 2014, 2015]))
  })

  test('end 2015, step 2', () => {
    expect(getYearsByStep({ end: 2015, step: 2 })).toEqual(expect.arrayContaining([2014, 2015]))
  })
});

describe('getLunarYearByStep', () => {
  test('end 2015, step 2', () => {
    expect(getLunarYearByStep({ end: 2015, step: 2 })).toEqual(expect.arrayContaining(["甲午", "乙未"]))
  })

  test('end 2019', () => {
    expect(getLunarYearByStep({ end: 2019 })).toEqual(expect.arrayContaining(["甲午", "乙未"]))
  })
});


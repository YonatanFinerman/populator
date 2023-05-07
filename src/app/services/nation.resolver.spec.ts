import { TestBed } from '@angular/core/testing';

import { NationResolver } from './nation.resolver';

describe('NationResolver', () => {
  let resolver: NationResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(NationResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

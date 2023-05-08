import { TestBed } from '@angular/core/testing';

import { NationResolverResolver } from './nation-resolver.resolver';

describe('NationResolverResolver', () => {
  let resolver: NationResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(NationResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

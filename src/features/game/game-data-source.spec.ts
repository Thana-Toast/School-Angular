import { TestBed } from '@angular/core/testing';

import { GameDataSource } from './game-data-source';

describe('GameDataSource', () => {
  let service: GameDataSource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameDataSource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

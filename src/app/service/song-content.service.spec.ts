import {TestBed} from '@angular/core/testing';

import {SongContentService} from './song-content.service';

describe('SongContentService', () => {
  let service: SongContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

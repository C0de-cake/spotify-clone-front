import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FavoriteSongCardComponent} from './favorite-song-card.component';

describe('FavoriteSongCardComponent', () => {
  let component: FavoriteSongCardComponent;
  let fixture: ComponentFixture<FavoriteSongCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteSongCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteSongCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

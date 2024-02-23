import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FavoriteSongBtnComponent} from './favorite-song-btn.component';

describe('FavoriteSongBtnComponent', () => {
  let component: FavoriteSongBtnComponent;
  let fixture: ComponentFixture<FavoriteSongBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteSongBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteSongBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

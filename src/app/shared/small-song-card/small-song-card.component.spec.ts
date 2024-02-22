import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SmallSongCardComponent} from './small-song-card.component';

describe('SmallSongCardComponent', () => {
  let component: SmallSongCardComponent;
  let fixture: ComponentFixture<SmallSongCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallSongCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallSongCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

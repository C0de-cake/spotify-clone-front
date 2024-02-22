import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddSongComponent} from './add-song.component';

describe('AddSongComponent', () => {
  let component: AddSongComponent;
  let fixture: ComponentFixture<AddSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

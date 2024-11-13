import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbookComponent } from './feedbook.component';

describe('FeedbookComponent', () => {
  let component: FeedbookComponent;
  let fixture: ComponentFixture<FeedbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

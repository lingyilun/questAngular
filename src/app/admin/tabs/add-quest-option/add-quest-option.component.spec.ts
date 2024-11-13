import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestOptionComponent } from './add-quest-option.component';

describe('AddQuestOptionComponent', () => {
  let component: AddQuestOptionComponent;
  let fixture: ComponentFixture<AddQuestOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddQuestOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuestOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

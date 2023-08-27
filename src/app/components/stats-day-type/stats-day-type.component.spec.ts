import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsDayTypeComponent } from './stats-day-type.component';

describe('StatsDayTypeComponent', () => {
  let component: StatsDayTypeComponent;
  let fixture: ComponentFixture<StatsDayTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsDayTypeComponent]
    });
    fixture = TestBed.createComponent(StatsDayTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

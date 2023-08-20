import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsGenericComponent } from './stats-generic.component';

describe('StatsGenericComponent', () => {
  let component: StatsGenericComponent;
  let fixture: ComponentFixture<StatsGenericComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsGenericComponent]
    });
    fixture = TestBed.createComponent(StatsGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

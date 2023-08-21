import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogNextComponent } from './log-next.component';

describe('LogNextComponent', () => {
  let component: LogNextComponent;
  let fixture: ComponentFixture<LogNextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogNextComponent]
    });
    fixture = TestBed.createComponent(LogNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

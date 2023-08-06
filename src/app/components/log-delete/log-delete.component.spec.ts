import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogDeleteComponent } from './log-delete.component';

describe('LogDeleteComponent', () => {
  let component: LogDeleteComponent;
  let fixture: ComponentFixture<LogDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogDeleteComponent]
    });
    fixture = TestBed.createComponent(LogDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

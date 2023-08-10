import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogListLastComponent } from './log-list-last.component';

describe('LogListLastComponent', () => {
  let component: LogListLastComponent;
  let fixture: ComponentFixture<LogListLastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogListLastComponent]
    });
    fixture = TestBed.createComponent(LogListLastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

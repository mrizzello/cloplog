import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoLogsMessageComponent } from './no-logs-message.component';

describe('NoLogsMessageComponent', () => {
  let component: NoLogsMessageComponent;
  let fixture: ComponentFixture<NoLogsMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoLogsMessageComponent]
    });
    fixture = TestBed.createComponent(NoLogsMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

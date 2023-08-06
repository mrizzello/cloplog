import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseAdminComponent } from './database-admin.component';

describe('DatabaseAdminComponent', () => {
  let component: DatabaseAdminComponent;
  let fixture: ComponentFixture<DatabaseAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatabaseAdminComponent]
    });
    fixture = TestBed.createComponent(DatabaseAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

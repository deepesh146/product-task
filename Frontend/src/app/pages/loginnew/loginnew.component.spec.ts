import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginnewComponent } from './loginnew.component';

describe('LoginnewComponent', () => {
  let component: LoginnewComponent;
  let fixture: ComponentFixture<LoginnewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginnewComponent]
    });
    fixture = TestBed.createComponent(LoginnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

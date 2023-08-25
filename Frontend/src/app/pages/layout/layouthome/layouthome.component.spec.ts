import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayouthomeComponent } from './layouthome.component';

describe('LayouthomeComponent', () => {
  let component: LayouthomeComponent;
  let fixture: ComponentFixture<LayouthomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayouthomeComponent]
    });
    fixture = TestBed.createComponent(LayouthomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

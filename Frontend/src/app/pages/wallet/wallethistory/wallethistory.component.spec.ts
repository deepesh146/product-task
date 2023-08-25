import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallethistoryComponent } from './wallethistory.component';

describe('WallethistoryComponent', () => {
  let component: WallethistoryComponent;
  let fixture: ComponentFixture<WallethistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WallethistoryComponent]
    });
    fixture = TestBed.createComponent(WallethistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

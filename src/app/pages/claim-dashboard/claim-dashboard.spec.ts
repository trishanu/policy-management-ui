import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimDashboard } from './claim-dashboard';

describe('ClaimDashboard', () => {
  let component: ClaimDashboard;
  let fixture: ComponentFixture<ClaimDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(ClaimDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

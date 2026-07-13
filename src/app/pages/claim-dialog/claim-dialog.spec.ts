import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimDialog } from './claim-dialog';

describe('ClaimDialog', () => {
  let component: ClaimDialog;
  let fixture: ComponentFixture<ClaimDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ClaimDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

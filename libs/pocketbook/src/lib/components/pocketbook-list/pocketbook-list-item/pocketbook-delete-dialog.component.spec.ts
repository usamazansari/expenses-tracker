import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketbookDeleteDialogComponent } from './pocketbook-delete-dialog.component';

describe('PocketbookDeleteDialogComponent', () => {
  let component: PocketbookDeleteDialogComponent;
  let fixture: ComponentFixture<PocketbookDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PocketbookDeleteDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PocketbookDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

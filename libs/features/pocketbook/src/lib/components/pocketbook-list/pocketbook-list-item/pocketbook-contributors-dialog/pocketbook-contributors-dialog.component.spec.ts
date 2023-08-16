import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PocketbookContributorsDialogComponent } from './pocketbook-contributors-dialog.component';

describe('PocketbookContributorsDialogComponent', () => {
  let component: PocketbookContributorsDialogComponent;
  let fixture: ComponentFixture<PocketbookContributorsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PocketbookContributorsDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PocketbookContributorsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

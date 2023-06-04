import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketbookDetailComponent } from './pocketbook-detail.component';

describe('PocketbookDetailComponent', () => {
  let component: PocketbookDetailComponent;
  let fixture: ComponentFixture<PocketbookDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PocketbookDetailComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PocketbookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

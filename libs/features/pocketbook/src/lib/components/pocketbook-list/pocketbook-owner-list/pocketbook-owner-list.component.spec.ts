import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketbookOwnerListComponent } from './pocketbook-owner-list.component';

describe('PocketbookOwnerListComponent', () => {
  let component: PocketbookOwnerListComponent;
  let fixture: ComponentFixture<PocketbookOwnerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PocketbookOwnerListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PocketbookOwnerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketbookCollaboratorListComponent } from './pocketbook-collaborator-list.component';

describe('PocketbookCollaboratorListComponent', () => {
  let component: PocketbookCollaboratorListComponent;
  let fixture: ComponentFixture<PocketbookCollaboratorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PocketbookCollaboratorListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PocketbookCollaboratorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

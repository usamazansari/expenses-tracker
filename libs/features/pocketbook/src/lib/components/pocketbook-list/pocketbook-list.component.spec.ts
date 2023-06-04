import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketbookListComponent } from './pocketbook-list.component';

describe('PocketbookListComponent', () => {
  let component: PocketbookListComponent;
  let fixture: ComponentFixture<PocketbookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PocketbookListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PocketbookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketbookListItemComponent } from './pocketbook-list-item.component';

describe('PocketbookListItemComponent', () => {
  let component: PocketbookListItemComponent;
  let fixture: ComponentFixture<PocketbookListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PocketbookListItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PocketbookListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

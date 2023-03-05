import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketbookCardComponent } from './pocketbook-card.component';

describe('PocketbookCardComponent', () => {
  let component: PocketbookCardComponent;
  let fixture: ComponentFixture<PocketbookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PocketbookCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PocketbookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

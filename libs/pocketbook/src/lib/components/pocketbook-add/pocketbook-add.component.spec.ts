import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketbookAddComponent } from './pocketbook-add.component';

describe('PocketbookAddComponent', () => {
  let component: PocketbookAddComponent;
  let fixture: ComponentFixture<PocketbookAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PocketbookAddComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PocketbookAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

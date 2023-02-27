import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketbookEditComponent } from './pocketbook-edit.component';

describe('PocketbookEditComponent', () => {
  let component: PocketbookEditComponent;
  let fixture: ComponentFixture<PocketbookEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PocketbookEditComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PocketbookEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

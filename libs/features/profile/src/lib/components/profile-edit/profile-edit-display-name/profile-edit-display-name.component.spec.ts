import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileEditDisplayNameComponent } from './profile-edit-display-name.component';

describe('ProfileEditDisplayNameComponent', () => {
  let component: ProfileEditDisplayNameComponent;
  let fixture: ComponentFixture<ProfileEditDisplayNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileEditDisplayNameComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileEditDisplayNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

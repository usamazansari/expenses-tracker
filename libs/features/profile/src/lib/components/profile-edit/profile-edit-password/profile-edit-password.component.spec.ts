import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileEditPasswordComponent } from './profile-edit-password.component';

describe('ProfileEditPasswordComponent', () => {
  let component: ProfileEditPasswordComponent;
  let fixture: ComponentFixture<ProfileEditPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileEditPasswordComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileEditPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

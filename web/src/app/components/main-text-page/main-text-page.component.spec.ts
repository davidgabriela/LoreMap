import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainTextPageComponent } from './main-text-page.component';


describe('MainTextPageComponent', () => {
  let component: MainTextPageComponent;
  let fixture: ComponentFixture<MainTextPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainTextPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTextPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

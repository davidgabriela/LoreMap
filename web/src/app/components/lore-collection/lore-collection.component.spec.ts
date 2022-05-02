import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoreCollectionComponent } from './lore-collection.component';

describe('LoreCollectionComponent', () => {
  let component: LoreCollectionComponent;
  let fixture: ComponentFixture<LoreCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoreCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoreCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

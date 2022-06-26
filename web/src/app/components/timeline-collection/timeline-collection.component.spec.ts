import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineCollectionComponent } from './timeline-collection.component';

describe('TimelineCollectionComponent', () => {
  let component: TimelineCollectionComponent;
  let fixture: ComponentFixture<TimelineCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

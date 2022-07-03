import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCollectionComponent } from './map-collection.component';

describe('MapCollectionComponent', () => {
  let component: MapCollectionComponent;
  let fixture: ComponentFixture<MapCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

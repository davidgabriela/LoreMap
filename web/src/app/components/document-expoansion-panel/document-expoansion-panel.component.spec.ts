import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentExpoansionPanelComponent } from './document-expoansion-panel.component';

describe('DocumentExpoansionPanelComponent', () => {
  let component: DocumentExpoansionPanelComponent;
  let fixture: ComponentFixture<DocumentExpoansionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentExpoansionPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentExpoansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

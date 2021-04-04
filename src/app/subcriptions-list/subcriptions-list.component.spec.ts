import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcriptionsListComponent } from './subcriptions-list.component';

describe('SubcriptionsListComponent', () => {
  let component: SubcriptionsListComponent;
  let fixture: ComponentFixture<SubcriptionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcriptionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcriptionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

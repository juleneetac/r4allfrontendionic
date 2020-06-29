import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TorneoDetailPage } from './torneo-detail.page';

describe('TorneoDetailPage', () => {
  let component: TorneoDetailPage;
  let fixture: ComponentFixture<TorneoDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TorneoDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TorneoDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

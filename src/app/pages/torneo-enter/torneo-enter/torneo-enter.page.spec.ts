import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TorneoEnterPage } from './torneo-enter.page';

describe('TorneoEnterPage', () => {
  let component: TorneoEnterPage;
  let fixture: ComponentFixture<TorneoEnterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TorneoEnterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TorneoEnterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

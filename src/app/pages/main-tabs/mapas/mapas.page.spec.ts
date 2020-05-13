import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapasPage } from './mapas.page';

describe('MapasPage', () => {
  let component: MapasPage;
  let fixture: ComponentFixture<MapasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

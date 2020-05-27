import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewpartidaPage } from './newpartida.page';

describe('NewpartidaPage', () => {
  let component: NewpartidaPage;
  let fixture: ComponentFixture<NewpartidaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewpartidaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewpartidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

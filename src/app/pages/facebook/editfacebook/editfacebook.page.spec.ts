import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditfacebookPage } from './editfacebook.page';

describe('EditfacebookPage', () => {
  let component: EditfacebookPage;
  let fixture: ComponentFixture<EditfacebookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfacebookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditfacebookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

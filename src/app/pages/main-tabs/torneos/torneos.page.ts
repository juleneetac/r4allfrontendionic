import { Component, OnInit } from '@angular/core';
import { Modeltorneo } from 'src/app/models/modelTorneo/modeltorneo';
import { TorneoService } from 'src/app/services/serviceTorneo/torneo.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.page.html',
  styleUrls: ['./torneos.page.scss'],
})
export class TorneosPage implements OnInit {

  constructor(
    private torneosService: TorneoService
  ) { }

  listaTorneos: Modeltorneo[];    //Lista de Torneos

  visibleFilters: boolean;  //Indica si la lista de filtros está visible o no

  listaTorneosFlags = [];         //Flags para filtrar la lista de Torneos
  pistacubiertaValue: boolean;    //Valor del Toggle de pistacubierta
  generoValue;                    //Valor del Segment de genero del Torneo (m/f)
  modoValue;                      //Valor del Segment de modo del Torneo (i/d)
  tipopistaValue;                 //Valor del Select de tipopista del Torneo

  //Form para filtrar la lista de Torneos
  listaTorneosForm = new FormGroup({
    minParticipantesInput: new FormControl(''),
    maxParticipantesInput: new FormControl('')
  });

  ngOnInit() {
    this.listaTorneosFlags = [Boolean];
    for (let i = 0; i < 5; i++){
      //Por defecto, seleccionar todos como no marcados
      this.listaTorneosFlags[i] = false;
    }

    this.visibleFilters = false;

    this.pistacubiertaValue = false;
    this.generoValue = 'm';
    this.modoValue = 'i';

    this.getTorneos();
  }

  public getTorneos(){
    
    interface LooseObject {
      [key: string]: any
    }
    let query:LooseObject = {};
    let queryflags = [];

    if(this.listaTorneosFlags[0]){
      queryflags[0] = this.listaTorneosFlags[0];
        //--------- BUSCAR POR UBICACIÓN Y RADIO: QUEDA PENDIENTE ------------//
    }
    if(this.listaTorneosFlags[1]){
      queryflags[1] = this.listaTorneosFlags[1];
      Object.assign(query, {'pistacubierta': this.pistacubiertaValue});
    }
    if(this.listaTorneosFlags[2]){
      queryflags[2] = this.listaTorneosFlags[2];
      Object.assign(query, {'tipopista': this.tipopistaValue });
    }
    if(this.listaTorneosFlags[3]){
      queryflags[3] = this.listaTorneosFlags[3];
      Object.assign(query, {'modo': this.modoValue });
    }

    //NUM. PARTICIPANTES (FLAG 4)
    if(this.listaTorneosFlags[4] || this.listaTorneosFlags[5]){
      if(this.listaTorneosFlags[4] && this.listaTorneosFlags[5]){
        queryflags[4] = 3;
        Object.assign(query, {'participantes': [this.listaTorneosForm.get('minParticipantesInput').value, this.listaTorneosForm.get('maxParticipantesInput').value]});
      }
      else if(this.listaTorneosFlags[4]){
        queryflags[4] = 1;
        Object.assign(query, {'participantes': [this.listaTorneosForm.get('minParticipantesInput').value, 0]});
      }
      else{
        queryflags[4] = 2;
        Object.assign(query, {'participantes': [0,this.listaTorneosForm.get('maxParticipantesInput').value]});
      }
    }
    else{
      queryflags[4] = 0;
    }

    Object.assign(query, {'flags': queryflags});

    
    this.torneosService.getTorneos(query)
    .subscribe(res => {
      this.listaTorneos = res as Modeltorneo[];
      console.log(this.listaTorneos);
    },
    (err) => {
      console.log("err", err);
    });
  }

  toggleVisibleFilters(){
    this.visibleFilters = !this.visibleFilters;
  }

  pistacubiertaToggleChanged(){
    this.pistacubiertaValue = !this.pistacubiertaValue;
  }

  modoSegmentChanged(ev){
    this.modoValue = ev.detail.value;
  }

  /* generoSegmentChanged(ev){
    this.generoValue = ev.detail.value;
  } */

}

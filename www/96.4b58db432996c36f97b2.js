(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{vLf1:function(l,n,e){"use strict";e.r(n);var t=e("CcnG"),u=function(){return function(){}}(),o=e("pMnS"),i=e("MKJQ"),s=e("jy/b"),a=e("uAme"),r=function(){function l(l){this.usuariosService=l,this.itemsUsuarios=[],this.values=[]}return l.prototype.ngOnInit=function(){this.getAllUsuarios(),this.useVanillaJSLibrary()},l.prototype.useVanillaJSLibrary=function(){this.googleChartLibrary=window.google,this.googleChartLibrary.charts.load("current",{packages:["corechart"]}),this.googleChartLibrary.charts.setOnLoadCallback(this.DrawPieChart.bind(this))},l.prototype.DrawPieChart=function(){for(this.values.push(["ID","Partidos jugados","Torneos jugados","Género","Experiencia"]),this.i=0;this.i<this.usuarios.length;)this.itemsUsuarios=this.usuarios,this.values.push([this.itemsUsuarios[this.i].username,this.itemsUsuarios[this.i].partidas.length,this.itemsUsuarios[this.i].torneos.length,this.itemsUsuarios[this.i].sexo,this.itemsUsuarios[this.i].exp]),this.i++;console.log(this.values);var l=this.googleChartLibrary.visualization.arrayToDataTable(this.values);new this.googleChartLibrary.visualization.BubbleChart(document.getElementById("bubbleChart")).draw(l,{title:"Experciancia de los usuarios en función de los partidos y torneos jugados",hAxis:{title:"Partidos jugados"},vAxis:{title:"Torneos jugados"},bubble:{textStyle:{fontSize:11,auraColor:"none"}},legend:{position:"right",alignment:"center"}})},l.prototype.getAllUsuarios=function(){var l=this;this.usuariosService.getAllUsuarios().subscribe((function(n){l.usuarios=n}),(function(l){console.log("err",l)}))},l}(),c=t["ɵcrt"]({encapsulation:0,styles:[[".item[_ngcontent-%COMP%]{margin-top:15px;margin-left:15px}h5[_ngcontent-%COMP%]{font-style:italic}h4[_ngcontent-%COMP%]{font-size:small}"]],data:{}});function d(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,12,"ion-header",[],null,null,null,i.hb,i.r)),t["ɵdid"](1,49152,null,0,s.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](2,0,null,0,10,"ion-header",[["translucent",""]],null,null,null,i.hb,i.r)),t["ɵdid"](3,49152,null,0,s.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{translucent:[0,"translucent"]},null),(l()(),t["ɵeld"](4,0,null,0,8,"ion-toolbar",[["color","success"]],null,null,null,i.Fb,i.P)),t["ɵdid"](5,49152,null,0,s.zb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{color:[0,"color"]},null),(l()(),t["ɵeld"](6,0,null,0,3,"ion-buttons",[["slot","start"]],null,null,null,i.V,i.f)),t["ɵdid"](7,49152,null,0,s.l,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](8,0,null,0,1,"ion-menu-button",[["auto-hide","false"]],null,null,null,i.pb,i.A)),t["ɵdid"](9,49152,null,0,s.R,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](10,0,null,0,2,"ion-title",[["class","ion-text-center"]],null,null,null,i.Db,i.N)),t["ɵdid"](11,49152,null,0,s.xb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵted"](-1,0,["Estadísticas globales"])),(l()(),t["ɵeld"](13,0,null,null,11,"ion-content",[],null,null,null,i.eb,i.o)),t["ɵdid"](14,49152,null,0,s.u,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](15,0,null,0,6,"div",[["class","item"]],null,null,null,null,null)),(l()(),t["ɵeld"](16,0,null,null,2,"h5",[],null,null,null,null,null)),(l()(),t["ɵeld"](17,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,["*Tamaño del bubble: experciencia acumulada "])),(l()(),t["ɵeld"](19,0,null,null,2,"h4",[],null,null,null,null,null)),(l()(),t["ɵeld"](20,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,["Colocate encima de cada bubble para ver los datos "])),(l()(),t["ɵeld"](22,0,null,0,2,"ion-content",[],null,null,null,i.eb,i.o)),t["ɵdid"](23,49152,null,0,s.u,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["ɵeld"](24,0,null,0,0,"div",[["id","bubbleChart"],["style","width: 900px; height: 500px;"]],null,null,null,null,null))],(function(l,n){l(n,3,0,""),l(n,5,0,"success")}),null)}function h(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,1,"app-chart",[],null,null,null,d,c)),t["ɵdid"](1,114688,null,0,r,[a.a],null,null)],(function(l,n){l(n,1,0)}),null)}var p=t["ɵccf"]("app-chart",r,h,{},{},[]),g=e("Ip0R"),b=e("gIcY"),m=e("ZYCi"),f=function(){return function(){}}();e.d(n,"ChartPageModuleNgFactory",(function(){return C}));var C=t["ɵcmf"](u,[],(function(l){return t["ɵmod"]([t["ɵmpd"](512,t.ComponentFactoryResolver,t["ɵCodegenComponentFactoryResolver"],[[8,[o.a,p]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["ɵmpd"](4608,g.m,g.l,[t.LOCALE_ID,[2,g.s]]),t["ɵmpd"](4608,b.q,b.q,[]),t["ɵmpd"](4608,s.b,s.b,[t.NgZone,t.ApplicationRef]),t["ɵmpd"](4608,s.Db,s.Db,[s.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](4608,s.Hb,s.Hb,[s.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](1073742336,g.c,g.c,[]),t["ɵmpd"](1073742336,b.p,b.p,[]),t["ɵmpd"](1073742336,b.g,b.g,[]),t["ɵmpd"](1073742336,s.Bb,s.Bb,[]),t["ɵmpd"](1073742336,m.o,m.o,[[2,m.t],[2,m.m]]),t["ɵmpd"](1073742336,f,f,[]),t["ɵmpd"](1073742336,u,u,[]),t["ɵmpd"](1024,m.k,(function(){return[[{path:"",component:r}]]}),[])])}))}}]);
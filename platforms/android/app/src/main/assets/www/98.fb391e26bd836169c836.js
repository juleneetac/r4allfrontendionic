(window.webpackJsonp=window.webpackJsonp||[]).push([[98],{gJ3c:function(n,e,l){"use strict";l.r(e);var t=l("CcnG"),o=function(){return function(){}}(),u=l("pMnS"),i=l("MKJQ"),a=l("jy/b"),r=l("Ip0R"),s=l("gIcY"),c=l("mrSG"),d=l("uAme"),g=l("25lC"),m=function(){return function(n,e,l,t){this.author=n,this.destination=e,this.mensaje=l,this.date=t}}(),f=l("2Bap"),h=(l("lFSb"),function(){function n(n,e,l,t,o,u,i){var a=this;this.usuariosSevice=n,this.chatService=e,this.storage=l,this.router=t,this.toastCtrl=o,this.route=u,this.socket=i,this.user=JSON.parse(this.storage.getUser()),this.username=this.user.username,this.messages=[],this.namedestino=this.route.snapshot.paramMap.get("username"),setTimeout((function(){return a.scrollToBottom()}),500),console.log(i),this.chatService.setSocket(i)}return n.prototype.ngOnInit=function(){return c.__awaiter(this,void 0,void 0,(function(){var n=this;return c.__generator(this,(function(e){switch(e.label){case 0:return[4,this.chatService.getMessagesAlmacenados().toPromise().then((function(e){console.log(e),n.messages=e.filter((function(e){return e.author===n.namedestino||e.destination===n.namedestino}))}))];case 1:return e.sent(),this.chatService.getMessages().subscribe((function(e){e.username2===n.namedestino&&(n.messages.push(new m(e.username2,n.namedestino,e.message,new Date)),setTimeout((function(){return n.scrollToBottom()}),50))})),[2]}}))}))},n.prototype.sendMessage=function(n){var e=this;this.message=n,this.message.replace(/\s/g,"").length&&(this.messages.push(new m(this.username,this.namedestino,this.message,new Date)),this.chatService.sendMessage(this.message,this.namedestino),setTimeout((function(){return e.scrollToBottom()}),50))},n.prototype.scrollToBottom=function(){return c.__awaiter(this,void 0,void 0,(function(){return c.__generator(this,(function(n){switch(n.label){case 0:return[4,this.myContent.scrollToBottom(500)];case 1:return n.sent(),[2]}}))}))},n}()),p=l("ZYCi"),C=l("ytKu"),R=t["ɵcrt"]({encapsulation:0,styles:[["page-chat-room[_ngcontent-%COMP%]   .user_name[_ngcontent-%COMP%]{color:#afafaf}page-chat-room[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]{padding:10px!important;-webkit-transition:250ms ease-in-out!important;transition:all 250ms ease-in-out!important;border-radius:10px!important;margin-bottom:4px!important}page-chat-room[_ngcontent-%COMP%]   .my_message[_ngcontent-%COMP%]{color:#000!important}page-chat-room[_ngcontent-%COMP%]   .other_message[_ngcontent-%COMP%]{background:#dcdcdc!important;color:#000!important}page-chat-room[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%]{color:#afafaf;float:right;font-size:small}page-chat-room[_ngcontent-%COMP%]   .message_row[_ngcontent-%COMP%]{background-color:#fff}#res[_ngcontent-%COMP%]{margin-right:0;margin-left:500px;float:right}#u[_ngcontent-%COMP%]{background-color:#1e8fd5}#textsize[_ngcontent-%COMP%]{font-size:20px}"]],data:{}});function b(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,13,"ion-col",[["class","message"],["size","5"]],null,null,null,i.db,i.n)),t["ɵdid"](1,49152,null,0,a.t,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(n()(),t["ɵeld"](2,0,null,0,11,"ion-card",[],null,null,null,i.ab,i.g)),t["ɵdid"](3,49152,null,0,a.m,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](4,0,null,0,5,"ion-card-header",[],null,null,null,i.X,i.i)),t["ɵdid"](5,49152,null,0,a.o,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](6,0,null,0,3,"ion-card-subtitle",[],null,null,null,i.Y,i.j)),t["ɵdid"](7,49152,null,0,a.p,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵted"](8,0,[" "," - "," "])),t["ɵppd"](9,2),(n()(),t["ɵeld"](10,0,null,0,3,"ion-card-content",[["id","textsize"]],null,null,null,i.W,i.h)),t["ɵdid"](11,49152,null,0,a.n,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](12,0,null,0,1,"strong",[],null,null,null,null,null)),(n()(),t["ɵted"](13,null,["",""]))],(function(n,e){n(e,1,0,"5")}),(function(n,e){var l=e.parent.context.$implicit.author,o=t["ɵunv"](e,8,1,n(e,9,0,t["ɵnov"](e.parent.parent,0),e.parent.context.$implicit.date,"dd/MM/yy hh:MM:yy"));n(e,8,0,l,o),n(e,13,0,e.parent.context.$implicit.mensaje)}))}function v(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,13,"ion-col",[["class","message"],["id","res"],["offset-3",""],["size","5"]],null,null,null,i.db,i.n)),t["ɵdid"](1,49152,null,0,a.t,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(n()(),t["ɵeld"](2,0,null,0,11,"ion-card",[["id","u"]],null,null,null,i.ab,i.g)),t["ɵdid"](3,49152,null,0,a.m,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](4,0,null,0,5,"ion-card-header",[["class","text-white"]],null,null,null,i.X,i.i)),t["ɵdid"](5,49152,null,0,a.o,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](6,0,null,0,3,"ion-card-subtitle",[["class","text-white"]],null,null,null,i.Y,i.j)),t["ɵdid"](7,49152,null,0,a.p,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵted"](8,0,[" "," - "," "])),t["ɵppd"](9,2),(n()(),t["ɵeld"](10,0,null,0,3,"ion-card-content",[["class","text-white"],["id","textsize"]],null,null,null,i.W,i.h)),t["ɵdid"](11,49152,null,0,a.n,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](12,0,null,0,1,"strong",[],null,null,null,null,null)),(n()(),t["ɵted"](13,null,["",""]))],(function(n,e){n(e,1,0,"5")}),(function(n,e){var l=e.component.username,o=t["ɵunv"](e,8,1,n(e,9,0,t["ɵnov"](e.parent.parent,0),e.parent.context.$implicit.date,"dd/MM/yy hh:MM:yy"));n(e,8,0,l,o),n(e,13,0,e.parent.context.$implicit.mensaje)}))}function M(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,5,"ion-row",[],null,null,null,i.ub,i.E)),t["ɵdid"](1,49152,null,0,a.gb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,b)),t["ɵdid"](3,16384,null,0,r.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["ɵand"](16777216,null,0,1,null,v)),t["ɵdid"](5,16384,null,0,r.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,e){var l=e.component;n(e,3,0,e.context.$implicit.author!==l.username),n(e,5,0,e.context.$implicit.author===l.username)}),null)}function E(n){return t["ɵvid"](0,[t["ɵpid"](0,r.e,[t.LOCALE_ID]),t["ɵqud"](402653184,1,{myContent:0}),(n()(),t["ɵeld"](2,0,null,null,11,"ion-header",[["translucent",""]],null,null,null,i.hb,i.r)),t["ɵdid"](3,49152,null,0,a.B,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{translucent:[0,"translucent"]},null),(n()(),t["ɵeld"](4,0,null,0,9,"ion-toolbar",[["color","primary"]],null,null,null,i.Fb,i.P)),t["ɵdid"](5,49152,null,0,a.zb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{color:[0,"color"]},null),(n()(),t["ɵeld"](6,0,null,0,4,"ion-buttons",[["slot","start"]],null,null,null,i.V,i.f)),t["ɵdid"](7,49152,null,0,a.l,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](8,0,null,0,2,"ion-back-button",[["defaultHref","/chat"]],null,[[null,"click"]],(function(n,e,l){var o=!0;return"click"===e&&(o=!1!==t["ɵnov"](n,10).onClick(l)&&o),o}),i.S,i.c)),t["ɵdid"](9,49152,null,0,a.g,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{defaultHref:[0,"defaultHref"]},null),t["ɵdid"](10,16384,null,0,a.h,[[2,a.fb],a.Eb],{defaultHref:[0,"defaultHref"]},null),(n()(),t["ɵeld"](11,0,null,0,2,"ion-title",[["class","ion-text-center"]],null,null,null,i.Db,i.N)),t["ɵdid"](12,49152,null,0,a.xb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵted"](13,0,["",""])),(n()(),t["ɵeld"](14,0,null,null,5,"ion-content",[],null,null,null,i.eb,i.o)),t["ɵdid"](15,49152,[[1,4]],0,a.u,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](16,0,null,0,3,"ion-grid",[],null,null,null,i.gb,i.q)),t["ɵdid"](17,49152,null,0,a.A,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵand"](16777216,null,0,1,null,M)),t["ɵdid"](19,278528,null,0,r.j,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),t["ɵeld"](20,0,null,null,21,"ion-footer",[],null,null,null,i.fb,i.p)),t["ɵdid"](21,49152,null,0,a.z,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](22,0,null,0,19,"ion-toolbar",[],null,null,null,i.Fb,i.P)),t["ɵdid"](23,49152,null,0,a.zb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](24,0,null,0,17,"ion-row",[["class","message_row"]],null,null,null,i.ub,i.E)),t["ɵdid"](25,49152,null,0,a.gb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["ɵeld"](26,0,null,0,10,"ion-col",[["size","11"]],null,null,null,i.db,i.n)),t["ɵdid"](27,49152,null,0,a.t,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(n()(),t["ɵeld"](28,0,null,0,8,"ion-item",[["lines","none"]],null,null,null,i.lb,i.v)),t["ɵdid"](29,49152,null,0,a.H,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{lines:[0,"lines"]},null),(n()(),t["ɵeld"](30,0,null,0,6,"ion-input",[["placeholder","Escribe un mensaje"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"keyup.enter"],[null,"ionBlur"],[null,"ionChange"]],(function(n,e,l){var o=!0,u=n.component;return"ionBlur"===e&&(o=!1!==t["ɵnov"](n,31)._handleBlurEvent(l.target)&&o),"ionChange"===e&&(o=!1!==t["ɵnov"](n,31)._handleInputEvent(l.target)&&o),"ngModelChange"===e&&(o=!1!==(u.message=l)&&o),"keyup.enter"===e&&(u.sendMessage(u.message),o=!1!==(t["ɵnov"](n,36).value="")&&o),o}),i.kb,i.u)),t["ɵdid"](31,16384,null,0,a.Kb,[t.ElementRef],null,null),t["ɵprd"](1024,null,s.h,(function(n){return[n]}),[a.Kb]),t["ɵdid"](33,671744,null,0,s.m,[[8,null],[8,null],[8,null],[6,s.h]],{model:[0,"model"]},{update:"ngModelChange"}),t["ɵprd"](2048,null,s.i,null,[s.m]),t["ɵdid"](35,16384,null,0,s.j,[[4,s.i]],null,null),t["ɵdid"](36,49152,[["text",4]],0,a.G,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{placeholder:[0,"placeholder"],type:[1,"type"]},null),(n()(),t["ɵeld"](37,0,null,0,4,"ion-col",[["size","1"]],null,null,null,i.db,i.n)),t["ɵdid"](38,49152,null,0,a.t,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(n()(),t["ɵeld"](39,0,null,0,2,"ion-button",[["clear",""],["color","primary"]],null,[[null,"click"]],(function(n,e,l){var o=!0,u=n.component;return"click"===e&&(u.sendMessage(u.message),o=!1!==(t["ɵnov"](n,36).value="")&&o),o}),i.U,i.e)),t["ɵdid"](40,49152,null,0,a.k,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{color:[0,"color"],disabled:[1,"disabled"]},null),(n()(),t["ɵted"](-1,0,["➢"]))],(function(n,e){var l=e.component;n(e,3,0,""),n(e,5,0,"primary"),n(e,9,0,"/chat"),n(e,10,0,"/chat"),n(e,19,0,l.messages),n(e,27,0,"11"),n(e,29,0,"none"),n(e,33,0,l.message),n(e,36,0,"Escribe un mensaje","text"),n(e,38,0,"1"),n(e,40,0,"primary",""===l.message)}),(function(n,e){n(e,13,0,e.component.namedestino),n(e,30,0,t["ɵnov"](e,35).ngClassUntouched,t["ɵnov"](e,35).ngClassTouched,t["ɵnov"](e,35).ngClassPristine,t["ɵnov"](e,35).ngClassDirty,t["ɵnov"](e,35).ngClassValid,t["ɵnov"](e,35).ngClassInvalid,t["ɵnov"](e,35).ngClassPending)}))}function D(n){return t["ɵvid"](0,[(n()(),t["ɵeld"](0,0,null,null,1,"app-chatroom",[],null,null,null,E,R)),t["ɵdid"](1,114688,null,0,h,[d.a,f.a,g.a,p.m,a.Lb,p.a,C.WrappedSocket],null,null)],(function(n,e){n(e,1,0)}),null)}var y=t["ɵccf"]("app-chatroom",h,D,{},{},[]),_=function(){return function(){}}();l.d(e,"ChatroomPageModuleNgFactory",(function(){return N}));var N=t["ɵcmf"](o,[],(function(n){return t["ɵmod"]([t["ɵmpd"](512,t.ComponentFactoryResolver,t["ɵCodegenComponentFactoryResolver"],[[8,[u.a,y]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["ɵmpd"](4608,r.m,r.l,[t.LOCALE_ID,[2,r.s]]),t["ɵmpd"](4608,s.q,s.q,[]),t["ɵmpd"](4608,a.b,a.b,[t.NgZone,t.ApplicationRef]),t["ɵmpd"](4608,a.Db,a.Db,[a.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](4608,a.Hb,a.Hb,[a.b,t.ComponentFactoryResolver,t.Injector]),t["ɵmpd"](1073742336,r.c,r.c,[]),t["ɵmpd"](1073742336,s.p,s.p,[]),t["ɵmpd"](1073742336,s.g,s.g,[]),t["ɵmpd"](1073742336,a.Bb,a.Bb,[]),t["ɵmpd"](1073742336,p.o,p.o,[[2,p.t],[2,p.m]]),t["ɵmpd"](1073742336,_,_,[]),t["ɵmpd"](1073742336,o,o,[]),t["ɵmpd"](1024,p.k,(function(){return[[{path:"",component:h}]]}),[])])}))}}]);
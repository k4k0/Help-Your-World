/*
 * @author    RocketTheme http://www.rockettheme.com
 * @copyright Copyright (C) 2007 - 2012 RocketTheme, LLC
 * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 */
var PresetDropdown={list:{},init:function(a){PresetDropdown.list[a]=document.id(GantryParamsPrefix+a);var b=selectboxes.getObjects(PresetDropdown.list[a].getPrevious());
b.real.addEvent("change",PresetDropdown.select.bind(PresetDropdown,a));},newItem:function(i,g,f){if(!PresetDropdown.list[i]&&document.getElements("."+i).length){return Scroller.addBlock(i,g,f);
}var h=new Element("li").set("text",f);var e=new Element("option",{value:g}).set("text",f);var d=selectboxes.getObjects(PresetDropdown.list[i].getPrevious());
var a=null;d.real.getChildren().each(function(k,j){if(k.value==g){a=j;}});if(a==null){e.inject(PresetDropdown.list[i]);h.inject(PresetDropdown.list[i].getPrevious().getLast().getElement("ul"));
PresetDropdown.attach(i);}else{var c=d.real.getChildren()[a],b=PresetDropdown.list[i].getPrevious().getLast().getElement("ul").getChildren()[a];c.replaceWith(e);
b.replaceWith(h);PresetDropdown.attach(i,a);}return true;},attach:function(a,c){var e=selectboxes.getObjects(PresetDropdown.list[a].getPrevious()),b=this;
if(c==null){c=e.list.length-1;}var d=e.list[c];d.addEvents({mouseenter:function(){e.list.removeClass("hover");this.addClass("hover");},mouseleave:function(){this.removeClass("hover");
},click:function(){e.list.removeClass("active");this.addClass("active");this.fireEvent("select",[e,c]);},select:selectboxes.select.pass(selectboxes,[e,c])});
selectboxes.updateSizes(PresetDropdown.list[a].getPrevious());d.fireEvent("select");},select:function(a){var c=Presets[a].get(PresetDropdown.list[a].getPrevious().getElement(".selected span").get("text"));
var b=document.id("master-items");if(b){b=b.hasClass("active");}new Hash(c).each(function(i,j){var e=document.id(GantryParamsPrefix+j);var h=e.get("tag");
switch(h){case"select":var k=e.getElements("option").getProperty("value");var g=selectboxes.getObjects(e.getParent());selectboxes.select(g,k.indexOf(i));
break;case"input":var l=e.getProperty("class");e.setProperty("value",i);if(l.contains("picker-input")){e.fireEvent("keyup");}else{if(l.contains("background-picker")){e.fireEvent("keyup",i);
}else{if(l.contains("slider")){var d=window["slider"+j];d.set(d.list.indexOf(i));}else{if(l.contains("toggle")){var f=j.replace("-","");window["toggle"+f].set(i.toInt());
window["toggle"+f].fireEvent("onChange",i.toInt());}}}}break;}});}};var Scroller={init:function(a){Scroller.wrapper=document.getElements("."+a+" .scroller .wrapper")[0];
Scroller.bar=document.getElements("."+a+" .bar")[0];if(!Scroller.wrapper||!Scroller.bar){return;}var c="hide";Scroller.hook=document.id("toolbar-show-presets");
if(Scroller.hook){c=Cookie.read("gantry-"+GantryTemplate+"-adminpresets")||"hide";Scroller.hook.removeClass("rok-button-active");document.id("hack-panel").getFirst().setStyle("display","block");
Scroller.slide=new Fx.Slide("hack-panel",{duration:250,transition:"quad:out",link:"cancel",resetHeight:true,onStart:function(){if(!this.open){document.id("g4-details").addClass("presets-showing");
}},onComplete:function(){if(this.open){document.id("g4-details").removeClass("presets-showing");}}});Scroller.hook[c=="show"?"addClass":"removeClass"]("rok-button-active");
Scroller.hook.addEvent("click",function(f){f.preventDefault();if(!Scroller.slide.open){this.addClass("rok-button-active");Scroller.slide.slideIn();Cookie.write("gantry-"+GantryTemplate+"-adminpresets","show");
}else{this.removeClass("rok-button-active");Scroller.slide.slideOut();Cookie.write("gantry-"+GantryTemplate+"-adminpresets","hide");}});Scroller.slide[c=="show"?"show":"hide"]();
document.id("g4-details")[Scroller.slide.open?"addClass":"removeClass"]("presets-showing");}Scroller.childrens=Scroller.wrapper.getChildren();var b=Scroller.wrapper.getParent().getSize();
var e=Scroller.wrapper.getSize();Scroller.barWrapper=new Element("div",{"class":"presets-scrollbar",styles:{width:Scroller.bar.getSize().x}}).inject(Scroller.bar,"before");
Scroller.getBarSize();Scroller.bar.inject(Scroller.barWrapper).setStyles({left:0});Scroller.children(a);Scroller.slide[c=="show"?"show":"hide"]();var d=document.getElements(".delete-preset");
d.each(function(f){f.addEvent("click",function(g){g.preventDefault();Scroller.deleter(this,a);});});Scroller.bar.setStyle("width",Scroller.size);Scroller.drag(Scroller.wrapper,Scroller.bar);
if(Scroller.size>b.x){Scroller.barWrapper.setStyle("display","none");Scroller.barWrapper.getPrevious(".scroller").setStyle("margin-bottom",0);Scroller.slide[c=="show"?"show":"hide"]();
return;}},buttonText:function(a){Scroller.hook.set("text",a);},deleter:function(c,a){var b=c.id.replace("keydelete-","");new Request.HTML({url:GantryAjaxURL,onSuccess:function(d){Scroller.deleteAction(d,c,a,b);
growl.alert("Gantry",'Preset "'+b+'" has been successfully deleted.',{duration:6000});}}).post({model:"presets-saver",action:"delete","preset-title":a,"preset-key":b});
},deleteAction:function(a,h,i,g){var e,b=Cookie.read("gantry-"+GantryTemplate+"-adminpresets")||"hide";if(PresetsKeys[i].contains(g)){h.dispose();}else{var c=h.getParent();
Scroller.childrens.erase(c);c.empty().dispose();var f=Scroller.childrens.getLast().addClass("last");var d=Scroller.childrens[0].addClass("first");e=Scroller.wrapper.getStyle("width").toInt();
Scroller.wrapper.setStyle("width",e-200);Scroller.bar.setStyle("width",Scroller.getBarSize());}if(Scroller.size>=Scroller.wrapper.getParent().getSize().x){Scroller.barWrapper.setStyle("display","none");
Scroller.barWrapper.getPrevious(".scroller").setStyle("margin-bottom",0);Scroller.slide[b=="show"?"show":"hide"]();}Scroller.bar.setStyle("left",-2+(Scroller.barWrapper.getSize().x*Scroller.wrapper.getParent().getScroll().x/Scroller.wrapper.getParent().getScrollSize().x));
if(typeof CustomPresets!="undefined"&&CustomPresets[g]){delete CustomPresets[g];}},getBarSize:function(){var a=Scroller.wrapper.getParent().getSize();var b=Scroller.wrapper.getSize();
Scroller.size=a.x*Scroller.barWrapper.getStyle("width").toInt()/b.x;return Scroller.size;},addBlock:function(p,n,k){var o=Presets[p].get(k),a=Cookie.read("gantry-"+GantryTemplate+"-adminpresets")||"hide";
if(!o){if(document.id("contextual-preset-wrap").getStyle("display")=="none"){document.id("contextual-preset-wrap").setStyles({position:"absolute",top:-3000,display:"block"});
}var m=Scroller.childrens[Scroller.childrens.length-1],b=Scroller.childrens.length;var i=m.clone();i.inject(m,"after").addClass("last").className="";i.className="preset"+(b+1)+" block last";
i.getElement("span").set("html",k);m.removeClass("last");var f=i.getFirst().getStyle("background-image");var e=f.split("/");var d=e[e.length-1];var c="url("+n+".png)";
var l=e.join("/").replace(d,c);i.getElement(".presets-bg").setStyle("background-image","");i.getElement(".presets-bg").setStyle("background-image",l);var g=Scroller.wrapper.getStyle("width").toInt();
var h=i.getSize().x;Scroller.wrapper.setStyle("width",g+200);Scroller.bar.setStyle("width",Scroller.getBarSize());Scroller.childrens.push(i);if(Scroller.size>=Scroller.wrapper.getParent().getSize().x){Scroller.barWrapper.setStyle("display","none");
Scroller.barWrapper.getPrevious(".scroller").setStyle("margin-bottom",0);Scroller.slide[a=="show"?"show":"hide"]();}else{Scroller.barWrapper.setStyle("display","block");
Scroller.barWrapper.getPrevious(".scroller").setStyle("margin-bottom",null);Scroller.slide[a=="show"?"show":"hide"]();}Scroller.child(p,i);var j=new Element("div",{id:"keydelete-"+n,"class":"delete-preset"}).set("html","<span>&times;</span>").inject(i);
j.addEvent("click",function(q){q.preventDefault();Scroller.deleter(this,p);});if(document.id("contextual-preset-wrap").getStyle("display")=="block"&&document.id("contextual-preset-wrap").getStyle("top").toInt()==-3000){document.id("contextual-preset-wrap").setStyles({position:"relative",top:0,display:"none"});
}}},drag:function(b,a){Scroller.dragger=new Drag.Move(a,{container:Scroller.barWrapper,modifiers:{x:"left",y:false},onDrag:function(){var e=Scroller.wrapper.getParent();
var d=e.getSize();var c=this.value.now.x*e.getScrollSize().x/d.x;if(c>c/2){c+=10;}else{c-=10;}e.scrollTo(c);}});Scroller.wrapper.getParent().scrollTo(0);
},child:function(a,b){b.addEvent("click",function(c){c.preventDefault();Scroller.updateParams(a,b);this.addClass("pulsing");this.removeClass.delay(250,this,"pulsing");
this.addClass.delay(500,this,"pulsing");this.removeClass.delay(750,this,"pulsing");});},children:function(a){Scroller.childrens.each(function(c,b){Scroller.labs=new Hash({});
Scroller.involved=document.getElements(".presets-involved");Scroller.involvedFx=[];Scroller.involved.each(function(d){Scroller.involvedFx.push(new Fx.Tween(d,{link:"cancel"}).set("opacity",0));
});c.addEvent("click",function(d){d.preventDefault();Scroller.updateParams(a,c,b);this.addClass("pulsing");this.removeClass.delay(250,this,"pulsing");this.addClass.delay(500,this,"pulsing");
this.removeClass.delay(750,this,"pulsing");});});},updateParams:function(i,b,e){var j=b.getElement("span").get("text");var g=Presets[i].get(j);var h=b.getElement(".delete-preset");
if(h){var d=h.id.replace("keydelete-","");if(CustomPresets[d]){g=CustomPresets[d];}}var a=document.id("master-items");if(a){a=a.hasClass("active");}var f={};
var c=Scroller.labs;c.each(function(k){k.each(function(m){var l=m.retrieve("gantry:text",false);if(l){m.set("text",l);m.store("gantry:notice",false);}Scroller.involved.set("text",0);
});});new Hash(g).each(function(q,r){if(r=="name"){return;}var m=document.id(GantryParamsPrefix+r.replace(/-/,"_"));if(!m){return;}if(!c.get(j)){c.set(j,[]);
}var n=m.get("tag");var k=m.getParent(".g4-panel").className.replace(/[panel|\-|\s|g4]/g,"").toInt()-1;if(!f[k]){f[k]=0;}f[k]++;Scroller.involved[k].set("text",f[k]);
var p;if(m.getParent(".gantry-field").getElement(".base-label")){p=m.getParent(".gantry-field").getElement(".base-label label");}else{p=m.getParent(".gantry-field").getElement("label");
}var o=c.get(j);if(!o.contains(p)){o.push(p);}if(!p.retrieve("gantry:notice",false)){p.store("gantry:text",p.get("html"));p.set("html",'<span class="preset-info"></span> '+p.retrieve("gantry:text"));
p.store("gantry:notice",true);}switch(n){case"select":m.set("value",q);m.fireEvent("change");break;case"input":var s=m.get("class");m.set("value",q);if(s.contains("picker-input")){document.getElement("[data-moorainbow-trigger="+m.id+"] .overlay").setStyle("background-color",q);
}else{if(s.contains("background-picker")){m.fireEvent("keyup",q);}else{if(s.contains("slider")){var l=window.sliders[(GantryParamsPrefix+r.replace(/-/,"_")).replace("-","_")];
l.set(l.list.indexOf(q));l.hiddenEl.fireEvent("set",q);}else{if(s.contains("toggle")){m.set("value",q);m.getParent(".toggle").removeClass("toggle-off").removeClass("toggle-on").addClass(q=="1"?"toggle-on":"toggle-off");
}}}}break;}});Scroller.involved.each(function(k,l){var m=k.get("text").toInt();if(!m){Scroller.involvedFx[l].element.getParent().removeClass("double-badge");
Scroller.involvedFx[l].cancel().start("opacity",[1,0]).chain(function(){this.element.setStyle("display","none");});return;}var n=Scroller.involvedFx[l].element.getNext("span");
if(n&&n.getStyle("display")=="block"){Scroller.involvedFx[l].element.getParent().addClass("double-badge");}else{Scroller.involvedFx[l].element.getParent().removeClass("double-badge");
}k.setStyle("display","block");Scroller.involvedFx[l].element.setStyles({visibility:"visible",display:"block",opacity:0});Scroller.involvedFx[l].start("opacity",[0,1]);
});}};var PresetsBadges={init:function(a){if(!PresetsBadges.list){PresetsBadges.list=new Hash();}var b=PresetsBadges.getLabel(a);var d=[];PresetsBadges.list.set(a,[]);
Presets[a].each(function(h,f){if(!d.length){for(var i in h){d.push(i);var g=PresetsBadges.getLabel(i);if(g){var e=PresetsBadges.build(i,g,b,false);PresetsBadges.list.get(a).push(e);
}}}});if(!PresetsBadges.buttons){PresetsBadges.buttons=[];}var c=PresetsBadges.build(a,b,false,d.length);PresetsBadges.buttons.push(c);c.addEvents({click:function(f){f.preventDefault();
this.fireEvent("toggle");},show:function(){this.getElement(".number").setStyle("visibility","visible");document.getElements(PresetsBadges.list.get(a)).setStyle("display","block");
this.showing=true;},hide:function(){this.getElement(".number").setStyle("visibility","hidden");document.getElements(PresetsBadges.list.get(a)).setStyle("display","none");
this.showing=false;},toggle:function(){PresetsBadges.buttons.each(function(e){if(e!=c){e.fireEvent("hide");}});if(this.showing){this.fireEvent("hide");
}else{this.fireEvent("show");}}});},build:function(n,i,j,f){var b=i.getChildren(),m=i.getSize().y,g;var a=i.getElement(".presets-wrapper");if(!a){a=new Element("div",{"class":"presets-wrapper",styles:{position:"relative"}}).inject(i,"top");
b.each(a.adopt.bind(a));a.setStyle("height",m+15);i.getElement(".hasTip").setStyle("line-height",m+15);}var l=(j)?j.getElement(".hasTip").innerHTML:GantryLang.show_parameters;
g=new Element("div",{"class":"presets-badge"}).inject(a,"top");var c=new Element("span",{"class":"left"}).inject(g);var k=new Element("span",{"class":"right"}).inject(c).set("text",l);
if($chk(f)){var d=new Element("span",{"class":"number"}).inject(k);d.set("text",f).setStyle("visibility","hidden");g.setStyle("cursor","pointer").addClass("parent");
}else{g.setStyle("display","none");var e=i.getNext().getFirst().getLast();if(e){var h=e.getStyle("top").toInt();e.setStyle("top",h-10);}}return g;},getLabel:function(a){var c=document.id(GantryParamsPrefix+a);
if(c){var d=c.getParent(),b=null;while(d&&d.get("tag")!="table"){if(d.get("tag")=="tr"){b=d;}d=d.getParent();}return b.getFirst();}else{return null;}}};

"use strict"
define("dummy/app",["exports","dummy/resolver","ember-load-initializers","dummy/config/environment"],function(e,t,n,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var i=Ember.Application.extend({modulePrefix:o.default.modulePrefix,podModulePrefix:o.default.podModulePrefix,Resolver:t.default});(0,n.default)(i,o.default.modulePrefix)
var a=i
e.default=a}),define("dummy/components/accessibility-result",["exports","@coyote-labs/ember-accessibility/components/accessibility-result"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/accessibility-tester",["exports","@coyote-labs/ember-accessibility/components/accessibility-tester"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/banner-img",["exports","dummy/templates/components/banner-img"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Component.extend({layout:t.default})
e.default=n}),define("dummy/components/faint-text",["exports","dummy/templates/components/faint-text"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Component.extend({layout:t.default})
e.default=n}),define("dummy/components/toggle-result",["exports","@coyote-labs/ember-accessibility/components/toggle-result"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/controllers/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({actions:{toggle:function(){this.toggleProperty("canShowComponent")}}})
e.default=t}),define("dummy/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=n}),define("dummy/initializers/ember-accessibility",["exports","@coyote-labs/ember-accessibility/ext/ember-accessibility"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
e.default={name:"ember-accessibility",initialize:function(){}}}),define("dummy/initializers/export-application-global",["exports","dummy/config/environment"],function(e,t){function n(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var n
if("undefined"!=typeof window)n=window
else if("undefined"!=typeof global)n=global
else{if("undefined"==typeof self)return
n=self}var o,i=t.default.exportApplicationGlobal
o="string"==typeof i?i:Ember.String.classify(t.default.modulePrefix),n[o]||(n[o]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete n[o]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=n,e.default=void 0
var o={name:"export-application-global",initialize:n}
e.default=o}),define("dummy/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("dummy/router",["exports","dummy/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
n.map(function(){this.route("hello-world")})
var o=n
e.default=o}),define("dummy/routes/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("dummy/routes/hello-world",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("dummy/services/accessibility-test",["exports","@coyote-labs/ember-accessibility/services/accessibility-test"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"EHpXyaLa",block:'{"symbols":[],"statements":[[7,"div",true],[10,"style","text-align: center"],[8],[0,"\\n  "],[7,"h1",true],[10,"style","color:cyan"],[8],[0,"ember-accessibility"],[9],[0,"\\n  "],[7,"h1",true],[8],[0,"Identify accessibility issues during development!"],[9],[0,"\\n\\n  "],[5,"banner-img",[],[[],[]]],[0,"\\n\\n  "],[7,"button",true],[10,"class","empty-btn"],[8],[9],[0,"\\n\\n  "],[7,"button",false],[12,"data-toggle","display-text"],[12,"type","button"],[3,"action",[[23,0,[]],"toggle"]],[8],[0,"Click to display some text"],[9],[0,"\\n"],[4,"if",[[24,["canShowComponent"]]],null,{"statements":[[0,"    "],[5,"faint-text",[],[[],[]]],[0,"\\n"]],"parameters":[]},null],[9],[0,"\\n\\n"],[5,"accessibility-tester",[],[[],[]]],[0,"\\n\\n"],[1,[22,"outlet"],false],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"dummy/templates/application.hbs"}})
e.default=t}),define("dummy/templates/components/banner-img",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"3pcACYhM",block:'{"symbols":[],"statements":[[7,"img",true],[10,"src","sample.jpeg"],[8],[9],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"dummy/templates/components/banner-img.hbs"}})
e.default=t}),define("dummy/templates/components/faint-text",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"64Dk2JY5",block:'{"symbols":[],"statements":[[7,"p",true],[10,"style","color:cyan"],[8],[0,"Too faint to read"],[9],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"dummy/templates/components/faint-text.hbs"}})
e.default=t}),define("dummy/templates/hello-world",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"T0iTP0VY",block:'{"symbols":[],"statements":[[7,"img",true],[10,"src","https://picsum.photos/200/300"],[10,"style","width: 210px;height: 125px; position: relative;left: 140px;"],[8],[9],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"dummy/templates/hello-world.hbs"}})
e.default=t}),define("dummy/config/environment",[],function(){try{var e="dummy/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),n={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(n,"__esModule",{value:!0}),n}catch(o){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("dummy/app").default.create({})

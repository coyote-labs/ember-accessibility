"use strict"
define("dummy/app",["exports","dummy/resolver","ember-load-initializers","dummy/config/environment"],function(e,t,o,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var i=Ember.Application.extend({modulePrefix:n.default.modulePrefix,podModulePrefix:n.default.podModulePrefix,Resolver:t.default});(0,o.default)(i,n.default.modulePrefix)
var l=i
e.default=l}),define("dummy/components/accessibility-result",["exports","@coyote-labs/ember-accessibility/components/accessibility-result"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/accessibility-tester",["exports","@coyote-labs/ember-accessibility/components/accessibility-tester"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/critical-icon",["exports","@coyote-labs/ember-accessibility/components/critical-icon"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/faint-text",["exports","dummy/templates/components/faint-text"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o=Ember.Component.extend({layout:t.default})
e.default=o}),define("dummy/components/minor-icon",["exports","@coyote-labs/ember-accessibility/components/minor-icon"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/moderate-icon",["exports","@coyote-labs/ember-accessibility/components/moderate-icon"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/serious-icon",["exports","@coyote-labs/ember-accessibility/components/serious-icon"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/toggle-result",["exports","@coyote-labs/ember-accessibility/components/toggle-result"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/controllers/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({actions:{toggle:function(){this.toggleProperty("canShowComponent")}}})
e.default=t}),define("dummy/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=o}),define("dummy/initializers/ember-accessibility",["exports","@coyote-labs/ember-accessibility/ext/ember-accessibility"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
e.default={name:"ember-accessibility",initialize:function(){}}}),define("dummy/initializers/export-application-global",["exports","dummy/config/environment"],function(e,t){function o(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var o
if("undefined"!=typeof window)o=window
else if("undefined"!=typeof global)o=global
else{if("undefined"==typeof self)return
o=self}var n,i=t.default.exportApplicationGlobal
n="string"==typeof i?i:Ember.String.classify(t.default.modulePrefix),o[n]||(o[n]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete o[n]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=o,e.default=void 0
var n={name:"export-application-global",initialize:o}
e.default=n}),define("dummy/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o=t.default
e.default=o}),define("dummy/router",["exports","dummy/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
o.map(function(){this.route("hello-world")})
var n=o
e.default=n}),define("dummy/routes/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("dummy/routes/hello-world",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("dummy/services/accessibility-test",["exports","@coyote-labs/ember-accessibility/services/accessibility-test"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"YAfqk3hM",block:'{"symbols":[],"statements":[[7,"div"],[11,"style","text-align: center"],[9],[0,"\\n  "],[7,"h1"],[11,"style","color:cyan"],[9],[0,"ember-accessibility"],[10],[0,"\\n  "],[7,"h1"],[9],[0,"Identify accessibility issues during development!"],[10],[0,"\\n\\n  "],[7,"img"],[11,"src","https://source.unsplash.com/gWFXgcH-LeU/800x450"],[9],[10],[0,"\\n\\n  "],[7,"br"],[9],[10],[0,"\\n\\n  "],[7,"button"],[11,"class","empty-btn"],[9],[10],[0,"\\n\\n  "],[7,"button"],[11,"type","button"],[9],[0,"Click to display some text"],[3,"action",[[24,0,[]],"toggle"]],[10],[0,"\\n"],[4,"if",[[25,["canShowComponent"]]],null,{"statements":[[0,"    "],[5,"faint-text",[],[[],[]]],[0,"\\n"]],"parameters":[]},null],[10],[0,"\\n\\n"],[5,"accessibility-tester",[],[[],[]]],[0,"\\n\\n"],[1,[23,"outlet"],false],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"dummy/templates/application.hbs"}})
e.default=t}),define("dummy/templates/components/faint-text",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"mQVRux0M",block:'{"symbols":[],"statements":[[7,"p"],[11,"style","color:cyan"],[9],[0,"Too faint to read"],[10],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"dummy/templates/components/faint-text.hbs"}})
e.default=t}),define("dummy/templates/hello-world",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"OEZbG0Mp",block:'{"symbols":[],"statements":[[7,"img"],[11,"src","https://picsum.photos/200/300"],[11,"style","width: 210px;height: 125px; position: relative;left: 140px;"],[9],[10],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"dummy/templates/hello-world.hbs"}})
e.default=t}),define("dummy/config/environment",[],function(){try{var e="dummy/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),o={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(o,"__esModule",{value:!0}),o}catch(n){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("dummy/app").default.create({})

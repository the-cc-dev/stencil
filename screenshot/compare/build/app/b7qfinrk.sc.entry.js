/*! Built with http://stenciljs.com */
const{h:t}=window.App;class e{constructor(){this.mismatchedPixels=null}navToDiff(t){t.preventDefault(),t.stopPropagation(),this.diffNavChange.emit(this.diff.id)}render(){const e=this.diff,i="number"==typeof this.mismatchedPixels,s=i?this.mismatchedPixels/(e.width*e.deviceScaleFactor*(e.height*e.deviceScaleFactor)):null;let a="";return i?this.mismatchedPixels>0&&(a="has-mismatch"):a="not-calculated",[t("p",{class:"test-path"},e.testPath),t("dl",null,t("div",null,t("dt",null,"Diff"),t("dd",null,t("a",{href:"#diff-"+e.id,onClick:this.navToDiff.bind(this)},e.id))),t("div",{class:a},t("dt",null,"Mismatched Pixels"),t("dd",null,i?this.mismatchedPixels:"--")),t("div",{class:a},t("dt",null,"Mismatched Ratio"),t("dd",null,i?s.toFixed(4):"--")),t("div",null,t("dt",null,"Device"),t("dd",null,e.device)),t("div",null,t("dt",null,"Width"),t("dd",null,e.width)),t("div",null,t("dt",null,"Height"),t("dd",null,e.height)),t("div",null,t("dt",null,"Device Scale Factor"),t("dd",null,e.deviceScaleFactor)),t("div",{class:"desc"},t("dt",null,"Description"),t("dd",null,e.desc)))]}static get is(){return"compare-analysis"}static get encapsulation(){return"shadow"}static get properties(){return{diff:{type:"Any",attr:"diff"},mismatchedPixels:{type:Number,attr:"mismatched-pixels"}}}static get events(){return[{name:"diffNavChange",method:"diffNavChange",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return".test-path.sc-compare-analysis{margin-top:0;padding-top:0;font-size:10px;color:var(--analysis-data-color)}dl.sc-compare-analysis{padding:0;margin:0;font-size:var(--analysis-data-font-size);line-height:28px}div.sc-compare-analysis{display:-webkit-box;display:-ms-flexbox;display:flex;width:260px}dt.sc-compare-analysis{display:inline;-webkit-box-flex:2;-ms-flex:2;flex:2;font-weight:500}dd.sc-compare-analysis{display:inline;-webkit-box-flex:1;-ms-flex:1;flex:1;color:var(--analysis-data-color)}.desc.sc-compare-analysis, .desc.sc-compare-analysis   dt.sc-compare-analysis{display:block}.desc.sc-compare-analysis   dd.sc-compare-analysis{display:block;margin:0;line-height:22px}.not-calculated.sc-compare-analysis   dd.sc-compare-analysis{color:#ccc}.has-mismatch.sc-compare-analysis   dd.sc-compare-analysis{color:#ff6200}p.sc-compare-analysis{padding-top:14px;font-size:var(--analysis-data-font-size)}a.sc-compare-analysis{color:var(--analysis-data-color)}a.sc-compare-analysis:hover{text-decoration:none}"}}function i(t,e){return`screenshot_mismatch_${t}_${e}`}var s=function(t,e,i,s,c,h){h||(h={});for(var o=void 0===h.threshold?.1:h.threshold,m=35215*o*o,f=0,g=0;g<c;g++)for(var u=0;u<s;u++){var p=4*(g*s+u);if(l(t,e,p,p)>m)h.includeAA||!a(t,u,g,s,c,e)&&!a(e,u,g,s,c,t)?(i&&n(i,p,255,0,0),f++):i&&n(i,p,255,255,0);else if(i){var v=d(r(d((w=t)[(y=p)+0],A=w[y+3]/255),d(w[y+1],A),d(w[y+2],A)),.1);n(i,p,v,v,v)}}var w,y,A;return f};function a(t,e,i,s,r,c){for(var h,d,n,o,m=Math.max(e-1,0),f=Math.max(i-1,0),g=Math.min(e+1,s-1),u=Math.min(i+1,r-1),p=4*(i*s+e),v=0,w=0,y=0,A=0,S=0,b=m;b<=g;b++)for(var C=f;C<=u;C++)if(b!==e||C!==i){var x=l(t,t,p,4*(C*s+b),!0);if(0===x?v++:x<0?y++:x>0&&w++,v>2)return!1;c&&(x<A&&(A=x,h=b,d=C),x>S&&(S=x,n=b,o=C))}return!c||0!==y&&0!==w&&(!a(t,h,d,s,r)&&!a(c,h,d,s,r)||!a(t,n,o,s,r)&&!a(c,n,o,s,r))}function l(t,e,i,s,a){var l=t[i+3]/255,n=e[s+3]/255,o=d(t[i+0],l),m=d(t[i+1],l),f=d(t[i+2],l),g=d(e[s+0],n),u=d(e[s+1],n),p=d(e[s+2],n),v=r(o,m,f)-r(g,u,p);if(a)return v;var w=c(o,m,f)-c(g,u,p),y=h(o,m,f)-h(g,u,p);return.5053*v*v+.299*w*w+.1957*y*y}function r(t,e,i){return.29889531*t+.58662247*e+.11448223*i}function c(t,e,i){return.59597799*t-.2741761*e-.32180189*i}function h(t,e,i){return.21147017*t-.52261711*e+.31114694*i}function d(t,e){return 255+(t-255)*e}function n(t,e,i,s,a){t[e+0]=i,t[e+1]=s,t[e+2]=a,t[e+3]=255}function o(t,e,i){if(f.has(e))return void i(f.get(e));if(m.has(e))return void m.get(e).push(i);m.set(e,[i]);const s=document.createElement("script");s.src=`${t}screenshot_${e}.js`,document.head.appendChild(s)}window.loadScreenshot=((t,e)=>{const i=m.get(t);i&&(i.forEach(t=>t(e)),m.delete(t)),f.set(t,e)});const m=new Map,f=new Map;class g{constructor(){this.imageASrc="",this.imageBSrc="",this.imagesLoaded=new Set,this.isImageALoaded=!1,this.isImageBLoaded=!1,this.initializeCalculateMismatch=!1,this.hasCalculatedMismatch=!1}componentWillLoad(){this.loadScreenshots()}componentWillUpdate(){this.loadScreenshots()}loadScreenshots(){if(this.show)return this.diff.identical?(this.imageASrc=this.imagesUrl+this.diff.imageA,void(this.imageBSrc=this.imagesUrl+this.diff.imageB)):void(this.initializeCalculateMismatch||(this.imageAClass="is-loading",this.imageBClass="is-loading",this.canvasClass="is-loading",this.initializeCalculateMismatch=!0,null!=this.jsonpUrl?(null!=this.diff.imageA&&o(this.jsonpUrl,this.diff.imageA,t=>{this.imageASrc=t}),null!=this.diff.imageB&&o(this.jsonpUrl,this.diff.imageB,t=>{this.imageBSrc=t})):(this.imageASrc=this.imagesUrl+this.diff.imageA,this.imageBSrc=this.imagesUrl+this.diff.imageB)))}async compareImages(){const t=this.diff;this.isImageALoaded&&this.isImageBLoaded&&!this.hasCalculatedMismatch&&(this.hasCalculatedMismatch=!0,t.mismatchedPixels=await function(t,e,i,a,l){let r=-1;try{const c=document.createElement("canvas");c.width=a,c.height=l;const h=document.createElement("canvas");h.width=a,h.height=l;const d=c.getContext("2d");d.drawImage(t,0,0);const n=h.getContext("2d");n.drawImage(e,0,0);const o=document.createElement("canvas").getContext("2d");o.drawImage(t,0,0),o.getImageData(0,0,a,l);const m=d.getImageData(0,0,a,l).data,f=n.getImageData(0,0,a,l).data,g=i.getContext("2d"),u=g.createImageData(a,c.height);r=s(m,f,u.data,a,l,{threshold:.1}),g.putImageData(u,0,0)}catch(t){console.error(t)}return r}(this.imageA,this.imageB,this.canvas,Math.round(t.width*t.deviceScaleFactor),Math.round(t.height*t.deviceScaleFactor)),this.canvasClass="has-loaded",function(e,s,a){const l=i(t.imageA,t.imageB);localStorage.setItem(l,String(a))}(0,0,t.mismatchedPixels),this.compareLoaded.emit(t))}render(){const e=this.diff,i={width:e.width+"px",height:e.height+"px"};return[t("compare-cell",null,t("a",{href:this.imagesUrl+e.imageA,target:"_blank"},t("img",{src:this.imageASrc,class:this.imageAClass,style:i,onLoad:this.diff.identical?null:()=>{this.isImageALoaded=!0,this.imageAClass="has-loaded",this.compareImages()},ref:t=>this.imageA=t}))),t("compare-cell",null,t("a",{href:this.imagesUrl+e.imageA,target:"_blank"},t("img",{src:this.imageBSrc,class:this.imageBClass,style:i,onLoad:this.diff.identical?null:()=>{this.isImageBLoaded=!0,this.imageBClass="has-loaded",this.compareImages()},ref:t=>this.imageB=t}))),t("compare-cell",null,this.diff.identical?t("img",{style:i,src:this.imageASrc}):t("canvas",{width:Math.round(e.width*e.deviceScaleFactor),height:Math.round(e.height*e.deviceScaleFactor),class:this.canvasClass,style:i,ref:t=>this.canvas=t})),t("compare-cell",null,t("compare-analysis",{mismatchedPixels:this.diff.mismatchedPixels,diff:this.diff}))]}static get is(){return"compare-row"}static get properties(){return{canvasClass:{state:!0},diff:{type:"Any",attr:"diff"},elm:{elementRef:!0},imageAClass:{state:!0},imageASrc:{state:!0},imageBClass:{state:!0},imageBSrc:{state:!0},imagesUrl:{type:String,attr:"images-url"},jsonpUrl:{type:String,attr:"jsonp-url"},show:{type:Boolean,attr:"show"}}}static get events(){return[{name:"compareLoaded",method:"compareLoaded",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return"compare-row canvas,compare-row img{-webkit-box-shadow:var(--screenshot-box-shadow);box-shadow:var(--screenshot-box-shadow);border-radius:var(--screenshot-border-radius)}.is-loading{visibility:hidden}"}}class u{render(){if(!this.a||!this.b||!this.diffs)return;let e=0;this.diffs.forEach(t=>{t.width>e&&(e=t.width)});const i={width:(e-=6)+"px"};return[t("th-cell",null,t("div",{style:i},t("a",{href:this.a.url},this.a.message))),t("th-cell",null,t("div",{style:i},t("a",{href:this.b.url},this.b.message))),t("th-cell",null,t("div",{style:i},"Diff")),t("th-cell",{class:"analysis"},t("div",null,"Analysis"))]}static get is(){return"compare-thead"}static get encapsulation(){return"shadow"}static get properties(){return{a:{type:"Any",attr:"a"},b:{type:"Any",attr:"b"},diffs:{type:"Any",attr:"diffs"}}}static get style(){return".sc-compare-thead-h{display:-webkit-box;display:-ms-flexbox;display:flex}th-cell.sc-compare-thead{display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;font-weight:500;font-size:12px}th-cell.sc-compare-thead   div.sc-compare-thead{padding-left:12px;padding-right:12px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}th-cell.sc-compare-thead   a.sc-compare-thead{color:var(--font-color);text-decoration:none}th-cell.sc-compare-thead   a.sc-compare-thead:hover{color:var(--analysis-data-color);text-decoration:underline}.analysis.sc-compare-thead   div.sc-compare-thead{width:262px}"}}function p(t,e){const i=Object.assign({},t,e),s=Object.keys(i),a=[];return s.map(t=>{const e=i[t];!0===e?a.push(t):null!=e&&""!==e&&a.push(t+"-"+e)}),window.location.hash=a.sort().join(";"),i}class v{constructor(){this.appSrcUrl="",this.imagesUrl="/data/images/",this.buildsUrl="/data/builds/",this.comparesUrl="/data/compares/",this.jsonpUrl=null,this.diffs=[]}async componentWillLoad(){this.compare?(this.diffs=w(this.compare,this.imagesUrl),this.a=this.compare.a,this.b=this.compare.b):this.match&&this.match.params.buildIdA&&this.match.params.buildIdB&&await this.loadBuilds(this.match.params.buildIdA,this.match.params.buildIdB),this.filter=function(){const t={},e=location.hash.replace("#","");return""!==e&&e.split(";").forEach(e=>{const i=e.split("-");t[i[0]]=!(i.length>1)||i[1]}),t}(),this.updateDiffs()}componentDidLoad(){this.filter&&this.filter.diff&&this.navToDiff(this.filter.diff)}async loadBuilds(t,e){const s=`${this.comparesUrl}${t}-${e}.json`;let a=`${this.buildsUrl}${t}.json`;"master"===t&&(a+=`?ts=${Date.now()}`);let l=`${this.buildsUrl}${e}.json`;"master"===e&&(l+=`?ts=${Date.now()}`);const r=await Promise.all([fetch(s),fetch(a),fetch(l)]),c=await r[0],h=await r[1],d=await r[2];if(c.ok){const t=await c.json();this.diffs=w(t,this.imagesUrl),this.a=t.a,this.b=t.b}else h.ok&&d.ok&&(this.a=await h.json(),this.b=await d.json(),this.diffs=await function(t,e,s){const a=[];return e.screenshots.forEach(e=>{const l=s.screenshots.find(t=>t.id===e.id);if(!l)return;const r=e.image===l.image,c={id:e.id,desc:e.desc,testPath:e.testPath,imageA:e.image,imageUrlA:`${t}${e.image}`,imageB:l.image,imageUrlB:`${t}${l.image}`,identical:r,mismatchedPixels:r?0:null,width:e.width,height:e.height,deviceScaleFactor:e.deviceScaleFactor,device:e.device||e.userAgent,show:!1};if(!r){const t=function(t,e){const s=i(c.imageA,c.imageB),a=localStorage.getItem(s);if("string"==typeof a){const t=parseInt(a,10);if(!isNaN(t))return t}return null}();"number"==typeof t&&(c.mismatchedPixels=t,0===c.mismatchedPixels&&(c.identical=!0))}a.push(c)}),a}(this.imagesUrl,this.a,this.b))}filterChange(t){this.filter=p(this.filter,t.detail),this.updateDiffs()}diffNavChange(t){const e=t.detail;this.filter=p(this.filter,{diff:e}),this.updateDiffs(),this.navToDiff(e)}navToDiff(t){const e=document.getElementById(`d-${t}`),i=document.querySelector(".scroll-y");e&&i&&(i.scrollTop=e.offsetTop-84)}compareLoaded(t){const e=t.detail,i=this.diffs.find(t=>t.id===e.id);i&&(i.mismatchedPixels=e.mismatchedPixels),this.updateDiffs()}updateDiffs(){var t;this.diffs=(t=this.filter,this.diffs.map(e=>(e=Object.assign({},e),function(t,e){const i=!t.device||t.device===e.device,s=!t.search||e.desc.includes(t.search);let a=!0;return t.diff&&t.diff===e.id?a=!0:t.mismatch?null!=e.mismatchedPixels&&"all"!==t.mismatch&&(a=parseInt(t.mismatch,10)<e.mismatchedPixels):a=e.mismatchedPixels>0||null==e.mismatchedPixels,e.show=i&&s&&a,e}(t,e))).sort((t,e)=>t.mismatchedPixels>e.mismatchedPixels?-1:t.mismatchedPixels<e.mismatchedPixels?1:t.desc.toLowerCase()<e.desc.toLowerCase()?-1:t.desc.toLowerCase()>e.desc.toLowerCase()?1:t.device.toLowerCase()<e.device.toLowerCase()?-1:t.device.toLowerCase()>e.device.toLowerCase()?1:0))}render(){return[t("compare-header",{diffs:this.diffs,filter:this.filter,appSrcUrl:this.appSrcUrl}),t("section",{class:"scroll-x"},t("compare-thead",{a:this.a,b:this.b,diffs:this.diffs}),t("section",{class:"scroll-y"},t("compare-table",null,t("compare-tbody",null,this.diffs.map(e=>t("compare-row",{key:e.id,id:"d-"+e.id,show:e.show,hidden:!e.show,imagesUrl:this.imagesUrl,jsonpUrl:this.jsonpUrl,diff:e}))))))]}static get is(){return"screenshot-compare"}static get properties(){return{appSrcUrl:{type:String,attr:"app-src-url"},buildsUrl:{type:String,attr:"builds-url"},compare:{type:"Any",attr:"compare"},comparesUrl:{type:String,attr:"compares-url"},diffs:{state:!0},filter:{state:!0},imagesUrl:{type:String,attr:"images-url"},jsonpUrl:{type:String,attr:"jsonp-url"},match:{type:"Any",attr:"match"}}}static get listeners(){return[{name:"filterChange",method:"filterChange"},{name:"diffNavChange",method:"diffNavChange"},{name:"compareLoaded",method:"compareLoaded"}]}}function w(t,e){return t.diffs.map(t=>({id:t.id,desc:t.desc,testPath:t.testPath,imageA:t.imageA,imageUrlA:`${e}${t.imageA}`,imageB:t.imageB,imageUrlB:`${e}${t.imageB}`,identical:0===t.mismatchedPixels,mismatchedPixels:t.mismatchedPixels,width:t.width,height:t.height,deviceScaleFactor:t.deviceScaleFactor,device:t.device||t.userAgent,show:!1}))}export{e as CompareAnalysis,g as CompareRow,u as CompareThead,v as ScreenshotCompare};
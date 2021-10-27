(this["webpackJsonpcs573-load-data"]=this["webpackJsonpcs573-load-data"]||[]).push([[18],{241:function(e,t,a){"use strict";a.d(t,"a",(function(){return S})),a.d(t,"b",(function(){return x})),a.d(t,"c",(function(){return O})),a.d(t,"e",(function(){return M})),a.d(t,"d",(function(){return D}));var r=a(490),n=a(237),o=a.n(n),i=a(238),u="https://gist.githubusercontent.com/apetit2/",c={MinimumWageCSV:"".concat(u,"212a7cd715f8ba34eb637d014fffb12f/raw/0cc5e300ed1747be91ec391f4546e1a44c90d810/minimum-wage-data.csv"),AvocadoCSV:"".concat(u,"a3a8f61f0c56a1d1448804a584b7c1bb/raw/53be30feacedf088d4b8f609ccc509ca1e52591d/avocado.csv"),HurricaneCSV:"".concat(u,"5c1aa857558bc646281763252ea13d57/raw/daa565a0dc8c0dd99a63d162efad23037b067678/pacific.csv"),RentCSV:"".concat(u,"aaa39169ab48ff313cfb2bfe12486fef/raw/6d5308a46301f7f2b08c6974a3be7e7e138434f8/rent.csv"),WorldMap:"https://unpkg.com/world-atlas@1.1.4/world/110m.json",USMap:"https://unpkg.com/us-atlas@3.0.0/states-10m.json"},s=function(){var e=Object(i.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(c.WorldMap);case 2:return e.next=4,e.sent.json();case 4:return t=e.sent,e.abrupt("return",t);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),d=function(){var e=Object(i.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(c.USMap);case 2:return e.next=4,e.sent.json();case 4:return t=e.sent,e.abrupt("return",t);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),b=a(239),l=a(486),m=function(e,t,a){var r,n=Object(l.a)(null!==(r=e.Date)&&void 0!==r?r:"","yyyy-MM-dd",new Date);return{date:e.Date,averagePrice:Number(e.AveragePrice),totalVolume:Number(e["Total Volume"]),4046:Number(e[4046]),4225:Number(e[4225]),4770:Number(e[4770]),totalBags:Number(e["Total Bags"]),smallBags:Number(e["Small Bags"]),largeBags:Number(e["Large Bags"]),xLargeBags:Number(e["XLarge Bags"]),type:e.type,year:Number(e.year),region:e.region,month:n.getMonth()+1,day:n.getDate(),rowType:"Avocado"}},f=function(){var e=Object(i.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(b.b)(c.AvocadoCSV,m);case 2:return t=e.sent.filter((function(e){return 0!==e.year})),e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),p=function(e){var t=null===e||void 0===e?void 0:e.slice(-1),a=Number(null===e||void 0===e?void 0:e.slice(0,-1)),r=0;switch(t){case"W":case"S":r=Number(a)/-1;break;default:r=Number(a)}return r},g=function(e,t,a){var r,n=Object(l.a)(null!==(r=e.Date)&&void 0!==r?r:"","yyyyMMdd",new Date);return{id:e.ID,name:e.Name,date:e.Date,time:Number(e.time),event:e.Event,status:e.Status,latitude:p(e.Latitude),longitude:p(e.Longitude),maxWind:Number(e["Maximum Wind"]),minPressure:Number(e["Minimum Pressure"]),lowWindNE:Number(e["Low Wind NE"]),lowWindSE:Number(e["Low Wind SE"]),lowWindSW:Number(e["Low Wind SW"]),lowWindNW:Number(e["Low Wind NW"]),moderateWindNE:Number(e["Moderate Wind NE"]),moderateWindSE:Number(e["Moderate Wind SE"]),moderateWindSW:Number(e["Moderate Wind SW"]),moderateWindNW:Number(e["Moderate Wind NW"]),highWindNE:Number(e["High Wind NE"]),highWindSE:Number(e["High Wind SE"]),highWindSW:Number(e["High Wind SW"]),highWindNW:Number(e["High Wind NW"]),year:n.getFullYear(),month:n.getMonth()+1,day:n.getDate(),rowType:"Hurricane"}},h=function(){var e=Object(i.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(b.b)(c.HurricaneCSV,g);case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),N=a(240),j=function(e,t){return t*e/260.28},v=function(e){return{year:Number(e.Year),state:e.State,stateMinWage:Number(e["State.Minimum.Wage"]),stateMinWageTodayDollars:Number(e["State.Minimum.Wage.2020.Dollars"]),federalMinWage:Number(e["Federal.Minimum.Wage"]),federalMinWageTodayDollars:Number(e["Federal.Minimum.Wage.2020.Dollars"]),effectiveMinWage:Number(e["Effective.Minimum.Wage"]),effectiveMinWageTodayDollars:Number(e["Effective.Minimum.Wage.2020.Dollars"]),cpiAverage:Number(e["CPI.Average"]),depLaborUncleanData:e["Department.Of.Labor.Uncleaned.Data"],depLaborCleanedLowValue:Number(e["Department.Of.Labor.Cleaned.Low.Value"]),depLaborCleanedLowValueTodayDollars:Number(e["Department.Of.Labor.Cleaned.Low.Value.2020.Dollars"]),depLaborCleanedHighValue:Number(e["Department.Of.Labor.Cleaned.High.Value"]),depLaborCleanedHighValueTodayDollars:Number(e["Department.Of.Labor.Cleaned.High.Value.2020.Dollars"]),footnote:e.Footnote,rowType:"MinWage"}},W=function(e){return{state:e.State,year:Number(e.Year),studio:Number(e["Rent 0 BR"]),oneBedroom:Number(e["Rent 1 BR"]),twoBedroom:Number(e["Rent 2 BR"]),threeBedroom:Number(e["Rent 3 BR"]),fourBedroom:Number(e["Rent 4 BR"]),population:Number(e.Population),rowType:"Rent"}},y=function(e,t){return t.map((function(t){var a=e.find((function(e){return e.year===t.year&&e.state===t.state}));return a?Object(N.a)(Object(N.a)({},t),{},{studio:j(t.cpiAverage,a.studio),oneBedroom:j(t.cpiAverage,a.oneBedroom),twoBedroom:j(t.cpiAverage,a.twoBedroom),threeBedroom:j(t.cpiAverage,a.threeBedroom),fourBedroom:j(t.cpiAverage,a.fourBedroom),population:a.population}):t}))},w=function(){var e=Object(i.a)(o.a.mark((function e(){var t,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(b.b)(c.MinimumWageCSV,v);case 2:return t=e.sent,e.next=5,Object(b.b)(c.RentCSV,W);case 5:return a=e.sent,e.abrupt("return",y(a,t));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),O=function(e){return Object(r.a)("minWage",w,e)},S=function(e){return Object(r.a)("avocado",f,e)},x=function(e){return Object(r.a)("hurricane",h,e)},M=function(e){return Object(r.a)("worldMap",s,e)},D=function(e){return Object(r.a)("usMap",d,e)}},243:function(e,t,a){"use strict";a.d(t,"a",(function(){return u}));var r=a(106),n=a(228),o=a(6),i=n.a.Text,u=function(e,t,a){var n=null;return t&&(n=Object(o.jsx)(i,{strong:!0,style:{color:"red"},children:"Failed To Load Dataset."})),e&&(n=Object(o.jsx)(r.a,{})),a||e||(n=Object(o.jsx)(i,{strong:!0,children:"No Data Found."})),{fallback:n}}},247:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var r={minWageUrl:"https://gist.github.com/apetit2/212a7cd715f8ba34eb637d014fffb12f",rentUrl:"https://gist.github.com/apetit2/aaa39169ab48ff313cfb2bfe12486fef"}},261:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var r=a(228),n=a(491),o=a(496),i=a(222),u=a(484),c=a(6),s=r.a.Text,d=function(e){var t=e.dataSetName,a=e.dataSetSize,r=e.numOfRows,n=e.numOfCols,o=e.titleStyle,u=e.bodyStyle;return Object(c.jsxs)(i.b,{size:"small",direction:"vertical",children:[Object(c.jsxs)(s,{strong:!0,style:o,children:[t," CSV Characteristics"]}),Object(c.jsxs)(s,{style:u,children:["Size: ",a," KB"]}),Object(c.jsxs)(s,{style:u,children:["Number of Rows: ",r]}),Object(c.jsxs)(s,{style:u,children:["Number of Columns: ",n]})]})},b=r.a.Text,l=function(e){var t=e.description,a=e.datasetName,r=e.data;return Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)(n.a,{gutter:[0,24],justify:"space-between",style:{width:"100%"},children:[Object(c.jsx)(o.a,{sm:10,md:7,children:Object(c.jsx)(d,{titleStyle:{fontSize:"24px"},bodyStyle:{fontSize:"18px"},dataSetName:a,dataSetSize:Math.round(Object(u.a)(r).length/1024),numOfRows:r.length,numOfCols:Object.keys(r[0]).length})}),Object(c.jsx)(o.a,{sm:10,md:13,children:Object(c.jsxs)(i.b,{direction:"vertical",style:{width:"100%"},children:[Object(c.jsx)(b,{strong:!0,style:{fontSize:"24px"},children:"Description"}),t]})})]})})}},500:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return b}));var r=a(247),n=a(261),o=a(33),i=a(228),u=a(243),c=a(241),s=a(6),d=i.a.Text,b=function(){var e=Object(c.c)(),t=e.data,a=e.isLoading,i=e.isError,b=Object(u.a)(a,i,t).fallback;if(b||!t)return b;var l=Object(s.jsxs)(d,{children:["provides information on minimum wage for all U.S states and territories since 1968. Data is supplied by the U.S Department of Labor. The CSV can be found in the"," ",Object(s.jsx)(o.b,{to:{pathname:r.a.minWageUrl},target:"_blank",children:"Minimum Wage Dataset"}),"."]});return Object(s.jsx)(n.a,{description:l,datasetName:"Minimum Wage",data:t})}}}]);
//# sourceMappingURL=18.9aa44f39.chunk.js.map
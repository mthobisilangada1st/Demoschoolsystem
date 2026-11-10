const $=s=>document.querySelector(s);
const root=document.documentElement;
let school={n:"Greenfield Academy",s:"Growing minds, building futures"};
const fmt=n=>"R"+n.toLocaleString("en-ZA",{minimumFractionDigits:2,maximumFractionDigits:2});
const kpi=(l,v,s="",c="")=>`<div class="card k"><div class="l">${l}</div><div class="v">${v}</div><div class="s ${c}">${s}</div></div>`;
const bars=a=>a.map(([n,p])=>`<div class="bar"><div><span>${n}</span><b>${p}%</b></div><div class="tr"><i style="width:${p}%"></i></div></div>`).join("");
const list=a=>`<ul class="l">${a.map(([x,y])=>`<li><div>${x}</div><span>${y}</span></li>`).join("")}</ul>`;
const card=(t,b)=>`<div class="card"><h3>${t}</h3>${b}</div>`;
const grid=a=>`<div class="grid">${a.join("")}</div>`;

const kids={"Thando Mokoena · Grade 7":{att:96,avg:78,hw:3,bal:2450,subs:[["Mathematics",82],["English",76],["Natural Sciences",74],["Social Sciences",80],["Afrikaans",68],["Life Orientation",88]]},
"Lerato Mokoena · Grade 4":{att:98,avg:84,hw:1,bal:0,subs:[["Mathematics",88],["English",85],["Natural Sciences",79],["Social Sciences",83],["Afrikaans",81],["Life Orientation",90]]}};

const views={
parents(){return `<h2>Parents dashboard</h2>
<select class="sel" id="kid">${Object.keys(kids).map(k=>`<option>${k}</option>`).join("")}</select><div id="kidv"></div>`},
teachers:()=>`<h2>Teachers dashboard</h2>`+grid([kpi("My classes",5,"Grades 6 to 7"),kpi("Learners",142,"Across 5 classes"),kpi("Average mark","73%","▲ 2% vs last term","up"),kpi("Attendance today","95%","7 absent","wn"),kpi("Marking pending",24,"Due Friday","dn"),kpi("Homework submitted","88%","Last 7 days","up")])+
`<div class="g2">${card("Class performance",bars([["7A Mathematics",76],["7B Mathematics",71],["6A Mathematics",79],["6B Mathematics",68],["6C Mathematics",74]]))}
${card("Today’s timetable",list([["Gr 7A · Mathematics","07:45"],["Gr 6B · Mathematics","09:30"],["Staff meeting","11:15"],["Gr 7B · Mathematics","12:30"],["Extra lessons","14:30"]]))}
${card("Learners needing support",list([["Sipho Dlamini · 7A","Avg 38%"],["Naledi Khumalo · 7B","Avg 42%"],["Ayanda Zulu · 6B","Absent 6 days"],["Kyle Jacobs · 6C","Avg 45%"]]))}
${card("Assessment calendar",list([["Term test · Gr 7","18 Nov"],["Project due · Gr 6","21 Nov"],["Reports to office","29 Nov"]]))}</div>`,
admin:()=>`<h2>Administrator dashboard</h2>`+grid([kpi("Total learners",842,"+18 this term","up"),kpi("Staff members",54,"3 on leave","wn"),kpi("Attendance today","94%","Learners","up"),kpi("Staff present","51 / 54","","up"),kpi("Pending admissions",16,"Awaiting docs","wn"),kpi("Open incidents",4,"1 high priority","dn")])+
`<div class="g2">${card("Enrolment by grade",bars([["Grade R",60],["Grade 1 to 3",82],["Grade 4 to 6",90],["Grade 7",75],["Capacity used",88]]))}
${card("Daily tasks",list([["Capture late-arrival register","Open"],["Print Grade 7 report templates","In progress"],["Order stationery stock","Open"],["Update parent contact list","Done"],["Book bus for Term 4 trip","Open"]]))}
${card("Resources and facilities",bars([["Textbook availability",91],["ICT lab uptime",97],["Classroom usage",86],["Maintenance tickets closed",72]]))}
${card("Communication sent",list([["SMS to parents (this month)","1 240"],["Newsletters","4"],["WhatsApp broadcast reach","93%"]]))}</div>`,
principal:()=>`<h2>Principal’s overview</h2>`+grid([kpi("Pass rate","91%","▲ 3% year on year","up"),kpi("School average","71%","Target 75%","wn"),kpi("Attendance","94%","Target 95%","wn"),kpi("Learner : teacher","28 : 1","Provincial norm 35 : 1","up"),kpi("Fees collected","87%","Of annual budget","up"),kpi("Parent satisfaction","4.4 / 5","212 responses","up")])+
`<div class="g2">${card("Performance by grade",bars([["Grade 4",78],["Grade 5",74],["Grade 6",72],["Grade 7",70],["Grade 8",66],["Grade 9",69]]))}
${card("Strategic goals 2026",bars([["Improve maths average",64],["Digital classroom rollout",80],["Reduce absenteeism",58],["Teacher development hours",72]]))}
${card("Staff snapshot",list([["Teacher attendance","97%"],["Professional development hours","612"],["Open vacancies","2"],["Appraisals completed","41 / 48"]]))}
${card("Needs your attention",list([["Disciplinary hearing · Gr 9","Thu"],["Governing body meeting","Tue 18:00"],["Budget approval: lab upgrade","Pending"]]))}</div>`,
finance(){return `<h2>Finance · School earnings meter</h2><div class="card" style="margin-bottom:12px;border-color:var(--ac)"><b>InsyncTech fee: R13.00 per child (default)</b><p class="note" style="margin:4px 0 0">Every school pays InsyncTech R13 per child for using the system. The meter below shows what the school itself earns: move it up in 50c steps per child.</p></div>
<div class="g2"><div class="card gauge"><h3>School earnings per child (50c steps)</h3>
<svg viewBox="0 0 200 120"><path d="M10 100A90 90 0 0 1 190 100" fill="none" stroke="var(--bd)" stroke-width="16" stroke-linecap="round"/><path id="arc" d="M10 100A90 90 0 0 1 190 100" fill="none" stroke="var(--ac2)" stroke-width="16" stroke-linecap="round" stroke-dasharray="282.74" stroke-dashoffset="282.74"/><text x="100" y="88" text-anchor="middle" font-size="22" font-weight="800" fill="var(--tx)" id="rt">R0.00</text><text x="100" y="108" text-anchor="middle" font-size="9" fill="var(--mu)">per child · max R50.00</text></svg>
<input type="range" id="mt" min="0" max="50" step="0.5" value="0" aria-label="Rate per child">
<div class="row"><button id="mn">− 50c</button><button id="pl">+ 50c</button><button id="mx">Reset to R0</button></div></div>
<div class="card"><h3>School details</h3><label for="kn">Number of children at the school</label><input type="number" id="kn" min="0" step="1" value="500">
<div style="margin-top:18px" class="note">School earnings per month</div><div class="big" id="g1">R0.00</div>
<div class="note">School earnings per year (12 months)</div><div class="big" id="g2" style="font-size:1.5rem">R0.00</div>
<p class="note" id="ex"></p><p class="note" id="cmp"></p></div></div>
<div class="card" style="margin-top:12px"><h3>How it works</h3><p class="note" style="margin:0">Earnings = number of children × the amount on the meter. Each move adds or removes 50c per child. The R13 per child InsyncTech fee is fixed and shown separately.</p></div>`}
};
const tabs=[["parents","👪 Parents"],["teachers","📚 Teachers"],["admin","🗂 Admin"],["principal","🏫 Principal"],["finance","💰 Finance"]];

function paintKid(){const k=kids[$("#kid").value];$("#kidv").innerHTML=grid([kpi("Attendance",k.att+"%","This term","up"),kpi("Average mark",k.avg+"%","▲ 3% vs last term","up"),kpi("Homework due",k.hw,"This week",k.hw>2?"wn":"up"),kpi("Fees balance",fmt(k.bal),k.bal?"Due 30 Nov":"Paid up",k.bal?"dn":"up")])+
`<div class="g2">${card("Subject marks",bars(k.subs))}${card("Teacher messages",list([["Maths: great improvement on fractions","Mon"],["Class teacher: excursion consent form","Fri"],["Sports: netball practice moved","Wed"]]))}
${card("Upcoming events",list([["Parent–teacher evening","14 Nov"],["Term tests begin","18 Nov"],["Sports day","25 Nov"],["Prize giving","04 Dec"]]))}
${card("Behaviour and wellbeing",list([["Merit points","46"],["Detentions","0"],["Late arrivals","2"],["Library books out","1"]]))}</div>`}
function paintFin(){const m=+$("#mt").value,n=Math.max(0,Math.floor(+$("#kn").value)||0),g=n*m;
$("#arc").style.strokeDashoffset=282.74*(1-m/50);$("#rt").textContent=fmt(m);$("#g1").textContent=fmt(g);$("#g2").textContent=fmt(g*12);
$("#ex").textContent=`${n.toLocaleString("en-ZA")} children × ${fmt(m)} = ${fmt(g)}`;$("#cmp").textContent=`InsyncTech fee (R13.00 × ${n.toLocaleString("en-ZA")} children): ${fmt(n*13)}`}
function show(id){$("#tabs").querySelectorAll("button").forEach(b=>b.classList.toggle("on",b.dataset.id===id));$("#view").innerHTML=views[id]();
 if(id==="parents"){$("#kid").onchange=paintKid;paintKid()}
 if(id==="finance"){const mt=$("#mt");mt.oninput=paintFin;$("#kn").oninput=paintFin;
  $("#pl").onclick=()=>{mt.value=Math.min(50,+mt.value+.5);paintFin()};$("#mn").onclick=()=>{mt.value=Math.max(0,+mt.value-.5);paintFin()};$("#mx").onclick=()=>{mt.value=0;paintFin()};paintFin()}
 scrollTo(0,0)}
function paintSchool(){document.querySelectorAll("[data-school]").forEach(e=>e.textContent=school.n);document.querySelectorAll("[data-slogan]").forEach(e=>e.textContent=school.s);document.title=school.n+" · Dashboard"}
$("#tabs").innerHTML=tabs.map(t=>`<button data-id="${t[0]}">${t[1]}</button>`).join("");
$("#tabs").onclick=e=>{const b=e.target.closest("button");if(b)show(b.dataset.id)};
$("#eye").onclick=()=>{const i=$("#sg");i.type=i.type==="password"?"text":"password"};
$("#go").onclick=()=>{school={n:$("#sn").value.trim()||school.n,s:$("#sg").value.trim()||school.s};paintSchool();$("#login").classList.add("hide");$("#app").classList.remove("hide");show("parents")};
$("#lo").onclick=()=>{$("#app").classList.add("hide");$("#login").classList.remove("hide");$("#sg").value=""};
function setTheme(t){root.dataset.theme=t;$("#th").textContent=t==="dark"?"☀️":"🌙"}
setTheme(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
$("#th").onclick=()=>setTheme(root.dataset.theme==="dark"?"light":"dark");

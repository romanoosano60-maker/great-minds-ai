(()=>{
"use strict";
const sets={
"english.html":{name:"English",icon:"📚",levels:{
beginner:[
["Which letter starts apple?",["A","B","C"],0],
["Which word rhymes with cat?",["Sun","Hat","Dog"],1],
["Which one is a vowel?",["B","E","T"],1],
["Choose the correct word: I ___ happy.",["am","is","are"],0],
["Which word names an animal?",["Run","Blue","Tiger"],2]],
pro:[
["Which sentence is written correctly?",["the boy can read.","The boy can read.","The Boy can read"],1],
["What is the plural of child?",["Childs","Children","Childes"],1],
["Which word is an adjective?",["Quickly","Beautiful","Jump"],1],
["Choose the correct past tense of teach.",["Teached","Teaching","Taught"],2],
["What punctuation ends a question?",["?","!","."],0]],
advanced:[
["Which sentence uses a semicolon correctly?",["I was tired; I went to bed.","I was; tired I went to bed.","I was tired I; went to bed."],0],
["What is the closest synonym for reluctant?",["Unwilling","Excited","Certain"],0],
["Identify the subordinate clause: 'Although it rained, we played.'",["Although it rained","we played","it rained we"],0],
["Which is the correct reported speech for: She said, 'I am ready.'",["She said that she was ready.","She said she is ready yesterday.","She said that I am ready."],0],
["What does the prefix 'mis-' usually mean?",["Wrongly or badly","Before","Again"],0]]
}},
"math.html":{name:"Mathematics",icon:"➗",levels:{
beginner:[
["What is 3 + 2?",["4","5","6"],1],
["What is 9 − 4?",["4","5","6"],1],
["Which number is even?",["3","7","8"],2],
["How many sides does a triangle have?",["2","3","4"],1],
["What is double 5?",["8","10","12"],1]],
pro:[
["What is 8 × 7?",["54","56","64"],1],
["What is 72 ÷ 9?",["7","8","9"],1],
["What is 3/4 of 20?",["12","15","16"],1],
["A rectangle is 8 cm long and 3 cm wide. What is its perimeter?",["11 cm","22 cm","24 cm"],1],
["What is 0.6 as a percentage?",["6%","60%","600%"],1]],
advanced:[
["Solve: 3(2x − 4) = 18.",["x = 5","x = 7","x = 9"],0],
["What is 15% of 240?",["24","36","40"],1],
["A ratio is 3:5 and the total is 64. What is the smaller share?",["24","30","40"],0],
["What is the area of a triangle with base 12 cm and height 7 cm?",["42 cm²","84 cm²","19 cm²"],0],
["Simplify 18/24 to its lowest terms.",["2/3","3/4","4/5"],1]]
}},
"science.html":{name:"Science",icon:"🔬",levels:{
beginner:[
["Which part of a plant takes in water?",["Roots","Flower","Fruit"],0],
["Which animal is a mammal?",["Frog","Dolphin","Fish"],1],
["What gives Earth light in the daytime?",["The Sun","The Moon","A lamp"],0],
["What do we breathe in to live?",["Oxygen","Smoke","Helium"],0],
["What is frozen water called?",["Steam","Ice","Rain"],1]],
pro:[
["What process lets green plants make food using sunlight?",["Photosynthesis","Evaporation","Digestion"],0],
["What causes day and night?",["Earth's rotation","The Moon's shadow every day","The Sun orbiting Earth"],0],
["Which blood vessels carry blood away from the heart?",["Veins","Arteries","Capillaries only"],1],
["What happens when a liquid evaporates?",["It changes into gas","It becomes a solid","It disappears completely"],0],
["Which is a producer in a food chain?",["Grass","Rabbit","Fox"],0]],
advanced:[
["Why does a metal spoon feel colder than a wooden spoon at the same room temperature?",["Metal conducts heat away from your hand faster","Metal is always below room temperature","Wood creates heat"],0],
["Which statement best describes a balanced chemical equation?",["Atoms are conserved on both sides","Products must weigh less","All coefficients must be one"],0],
["What is the role of decomposers in an ecosystem?",["Recycle nutrients from dead matter","Make sunlight","Stop all food chains"],0],
["If a force is doubled while mass stays constant, what happens to acceleration?",["It doubles","It halves","It stays unchanged"],0],
["Which cell structure controls most cell activities and contains DNA?",["Nucleus","Cell wall","Vacuole"],0]]
}},
"social-studies.html":{name:"Social Studies",icon:"🌍",levels:{
beginner:[
["Who helps children learn at school?",["Teacher","Pilot","Baker"],0],
["What is a community?",["People living and working together","A single toy","A kind of cloud"],0],
["Where can people borrow books?",["Library","Airport","Garage"],0],
["Which is a safe road habit?",["Use a crossing with an adult","Run between cars","Ignore traffic lights"],0],
["Who helps put out fires?",["Firefighter","Farmer","Artist"],0]],
pro:[
["Why do communities make rules?",["To support safety and fairness","To stop people helping","To make everyone identical"],0],
["What is a responsibility of a citizen?",["Respect laws and others","Damage public places","Ignore community needs"],0],
["Why are taxes collected by governments?",["To help fund public services","To buy private toys for everyone","To stop schools"],0],
["What does a map key explain?",["The meaning of map symbols","The age of a map","The weather next year"],0],
["What is one purpose of local government?",["Manage local services","Control the weather","Choose every family's job"],0]],
advanced:[
["Why is separating powers among branches of government important?",["It helps prevent too much power being held by one branch","It removes the need for laws","It gives courts control of elections"],0],
["What is a primary historical source?",["A diary written by someone who witnessed an event","A modern textbook summary","A fictional story set in the past"],0],
["What does a census usually collect?",["Population information","Daily weather forecasts","Every person's passwords"],0],
["Why might two reliable sources describe an event differently?",["They may have different perspectives or evidence","One must always be lying","History has only one possible viewpoint"],0],
["What is a trade-off in a community decision?",["A benefit is gained while another benefit or resource is given up","Everyone gets everything without cost","A decision is never reviewed"],0]]
}},
"geography.html":{name:"Geography",icon:"🧭",levels:{
beginner:[
["Which direction is opposite north?",["South","East","West"],0],
["Which is the largest ocean?",["Pacific","Arctic","Indian"],0],
["What does a map show?",["Places and locations","Only songs","Only recipes"],0],
["Which is a landform?",["Mountain","Cloud","Shadow"],0],
["What do we call a very dry area?",["Desert","Rainforest","Wetland"],0]],
pro:[
["What causes seasons on Earth?",["Earth's tilted axis as it orbits the Sun","Earth moving closer to the Sun each day","The Moon blocking sunlight"],0],
["Which line divides Earth into Northern and Southern Hemispheres?",["Equator","Prime Meridian","Tropic of Cancer"],0],
["What is the capital city of Japan?",["Tokyo","Seoul","Beijing"],0],
["Which instrument measures air pressure?",["Barometer","Thermometer","Compass"],0],
["Why are river valleys often good for farming?",["They can have fertile soil and water","They never receive rain","They have no slopes"],0]],
advanced:[
["What is the main cause of the Coriolis effect?",["Earth's rotation","The Moon's phases","Ocean salinity"],0],
["What does a contour line on a topographic map connect?",["Points of equal elevation","Places with equal rainfall","Roads of equal width"],0],
["Which process forms a delta at a river mouth?",["Deposition of sediment","Only volcanic eruption","Glacier melting on a mountain"],0],
["What is urbanisation?",["An increasing share of people living in towns and cities","The spread of deserts only","A fall in all transport use"],0],
["Why can a rain shadow form behind a mountain range?",["Descending air on the leeward side becomes drier","The mountain creates new oceans","Clouds are attracted to rocks"],0]]
}},
"history.html":{name:"History",icon:"🏺",levels:{
beginner:[
["What do historians study?",["The past","Future weather","Space travel only"],0],
["Which can show what people used long ago?",["An artefact","A new toy","A weather app"],0],
["What comes first in time?",["Past","Present","Future"],0],
["What is a timeline used for?",["Showing events in order","Measuring temperature","Finding directions"],0],
["Which is an example of a historical source?",["An old letter","A brand-new advert","A made-up rumour"],0]],
pro:[
["Why do historians compare different sources?",["To check evidence and viewpoints","To avoid asking questions","To make dates disappear"],0],
["Which civilisation built the pyramids at Giza?",["Ancient Egyptians","Ancient Romans","Maya"],0],
["What is an archaeologist most likely to study?",["Material remains from the past","Tomorrow's weather","Modern traffic lights"],0],
["Why did many early settlements grow near rivers?",["Water, fertile land and transport","No floods ever happened","Rivers stopped farming"],0],
["What does chronology mean?",["The order of events in time","A type of ancient building","A list of opinions"],0]],
advanced:[
["What is historiography?",["The study of how history is written and interpreted","The study of rocks only","The measurement of ancient buildings"],0],
["Why must historians consider an author's context?",["It can shape what the author noticed and recorded","It proves every source is false","It replaces the need for evidence"],0],
["What is one limitation of carbon dating?",["It is mainly useful for once-living materials","It gives an exact date for every metal object","It works only on modern plastics"],0],
["What is the difference between a cause and a trigger of an event?",["A trigger sparks an event while deeper causes build conditions","They always mean exactly the same thing","A cause happens only afterward"],0],
["Why can historical interpretations change?",["New evidence and questions can change explanations","The past itself changes","All earlier documents vanish"],0]]
}},
"computer.html":{name:"Computer Studies",icon:"💻",levels:{
beginner:[
["Which device is used to type?",["Keyboard","Speaker","Monitor"],0],
["What does a monitor show?",["Pictures and text","Printed paper","Sound waves only"],0],
["What should you do with your password?",["Keep it private","Share it publicly","Write it in a public comment"],0],
["Which device moves the pointer?",["Mouse","Printer","Microphone"],0],
["What does Save do?",["Keeps your work","Deletes your work","Turns off Wi-Fi"],0]],
pro:[
["What is an algorithm?",["A step-by-step set of instructions","A computer screen","A type of battery"],0],
["What is debugging?",["Finding and fixing errors","Deleting every file","Increasing screen brightness"],0],
["Which is an example of an input device?",["Microphone","Monitor","Speaker"],0],
["Why should software be updated?",["To improve features and fix security issues","To remove all passwords","To make devices heavier"],0],
["What does a loop do in programming?",["Repeats instructions","Prints a document","Stores electricity"],0]],
advanced:[
["What is the purpose of a variable in programming?",["To store a value that a program can use or change","To permanently delete code","To connect a monitor"],0],
["What does encryption do?",["Transforms data so it is unreadable without the right key","Makes a file larger only","Removes the need for authentication"],0],
["Which statement best describes an API?",["A defined way for software systems to communicate","A computer's power cable","A type of screen resolution"],0],
["What is a primary benefit of version control?",["It tracks changes and supports collaboration","It guarantees code has no bugs","It replaces all testing"],0],
["What is a database index mainly used for?",["Speeding up data retrieval","Encrypting every password automatically","Creating screen animations"],0]]
}},
"home-science.html":{name:"Home Science",icon:"🏡",levels:{
beginner:[
["What should you do before eating?",["Wash your hands","Play with soil","Touch rubbish"],0],
["Which drink helps keep you hydrated?",["Clean water","Soda only","Cooking oil"],0],
["Who should help you handle a hot pan?",["A trusted adult","A younger child","A stranger"],0],
["Where should rubbish go?",["In a bin","On the floor","In drinking water"],0],
["Which is a healthy food choice?",["Fruit","Only sweets","Only fizzy drinks"],0]],
pro:[
["Why should raw meat be kept separate from ready-to-eat food?",["To reduce cross-contamination","To make food sweeter","To cool the refrigerator"],0],
["What does a balanced meal include?",["A variety of food groups","Only one food every day","Only sugary snacks"],0],
["Why should cleaning products be stored safely?",["They may be harmful if swallowed or touched","They are toys","They improve food flavour"],0],
["What is one way to reduce household water use?",["Turn off the tap while brushing","Leave taps running","Wash one spoon at a time under running water"],0],
["What should you do if you smell gas at home?",["Tell an adult, leave the area and avoid switches or flames","Light a match to check","Ignore it"],0]],
advanced:[
["Why is the food temperature danger zone important?",["Bacteria can multiply quickly in that range","Food becomes frozen instantly","All nutrients disappear"],0],
["What does a food label's 'use by' date mainly indicate?",["A safety date for highly perishable food","The best colour of packaging","The day a product was invented"],0],
["How can a household reduce food waste?",["Plan meals and store food correctly","Buy more than can be used","Leave leftovers unrefrigerated"],0],
["Why is ventilation important when using some household cleaning products?",["It reduces the build-up of potentially harmful fumes","It makes chemicals edible","It removes the need for instructions"],0],
["What is the most reliable first response to a minor burn?",["Cool it under cool running water and seek adult help","Apply ice directly for a long time","Rub butter into it"],0]]
}},
"vocabulary.html":{name:"Vocabulary",icon:"📝",levels:{
beginner:[
["A synonym for happy is…",["Glad","Angry","Sleepy"],0],
["What does tiny mean?",["Very small","Very loud","Very old"],0],
["Which word is an animal?",["Rabbit","Quickly","Blue"],0],
["What is the opposite of hot?",["Cold","Warm","Bright"],0],
["What does brave mean?",["Ready to face difficulty","Always sleepy","Very tiny"],0]],
pro:[
["What does 'reluctant' mean?",["Unwilling or hesitant","Very excited","Completely certain"],0],
["Which word is closest in meaning to observe?",["Notice carefully","Forget","Hide"],0],
["What is the plural of analysis?",["Analyses","Analysises","Analysis"],0],
["What does the prefix 'pre-' mean?",["Before","Again","Against"],0],
["Which word is an antonym of scarce?",["Abundant","Rare","Limited"],0]],
advanced:[
["What does 'ambiguous' mean?",["Open to more than one interpretation","Extremely obvious","Impossible to pronounce"],0],
["Which word best completes: 'The evidence was ___, so the claim was convincing.'",["Compelling","Careless","Unrelated"],0],
["What is the meaning of 'mitigate'?",["Make less severe","Make certain","Repeat exactly"],0],
["Which is the correct use of 'affect'?",["The weather can affect our plans.","The affect was blue.","Please affect the parcel."],0],
["What does 'connotation' describe?",["An associated feeling or idea beyond literal meaning","A word's number of syllables only","The order of letters in a word"],0]]
}},
"creative-arts.html":{name:"Creative Arts",icon:"🎨",levels:{
beginner:[
["Which shape has three sides?",["Triangle","Circle","Square"],0],
["Red mixed with yellow makes…",["Orange","Green","Purple"],0],
["Which tool helps draw a straight line?",["Ruler","Spoon","Cup"],0],
["What is rhythm in music?",["A pattern of beats","A paint colour","A drawing tool"],0],
["Which material is useful for a paper collage?",["Clean paper","Hot metal","Broken glass"],0]],
pro:[
["What is texture in art?",["How a surface feels or appears to feel","How fast music plays","The size of a frame"],0],
["Which colours are complementary on a traditional colour wheel?",["Blue and orange","Blue and green","Red and orange"],0],
["What is a musical tempo?",["The speed of the beat","The loudness only","The instrument's age"],0],
["What is perspective used for in drawing?",["Creating a sense of depth","Mixing paint safely","Measuring sound"],0],
["Why do artists make a thumbnail sketch?",["To plan a composition quickly","To finish the artwork","To choose a frame size only"],0]],
advanced:[
["What is chiaroscuro in visual art?",["Use of strong light-dark contrast to create form","A method of weaving fabric","A type of musical scale"],0],
["What is syncopation in music?",["Emphasising unexpected beats or offbeats","Playing every note at the same volume","Removing rhythm"],0],
["What is negative space in composition?",["The area around and between subjects","The darkest paint only","A blank canvas that cannot be used"],0],
["What is the purpose of a motif in design?",["A recurring visual or musical element","A one-time accident","A type of measuring tool"],0],
["Why might an artist create multiple drafts?",["To test ideas and refine choices","To avoid making decisions","To ensure every draft is identical"],0]]
}}
};

sets["general-knowledge.html"]={name:"General Knowledge",icon:"🧠",levels:{
beginner:[
["Which planet do we live on?",["Earth","Mars","Venus"],0],
["How many days are in a week?",["5","7","10"],1],
["Which animal is known as the king of the jungle?",["Lion","Rabbit","Goat"],0],
["Which season is usually the coldest?",["Winter","Summer","Spring"],0],
["What do bees make?",["Honey","Milk","Bread"],0]],
pro:[
["Which gas do plants absorb from the air?",["Carbon dioxide","Oxygen only","Helium"],0],
["How many continents are commonly recognised?",["5","6","7"],2],
["Which instrument measures temperature?",["Thermometer","Compass","Ruler"],0],
["What is the largest planet in our solar system?",["Jupiter","Earth","Mars"],0],
["Which organ helps humans breathe?",["Lungs","Stomach","Kidneys"],0]],
advanced:[
["Which part of the atmosphere contains most of the ozone layer?",["Stratosphere","Troposphere","Mesosphere"],0],
["What is the smallest prime number?",["1","2","3"],1],
["Which branch of science studies heredity?",["Genetics","Geology","Astronomy"],0],
["What is the main function of a nation's central bank?",["Manage monetary policy and currency stability","Run all schools","Build every road"],0],
["Which process turns atmospheric nitrogen into compounds plants can use?",["Nitrogen fixation","Condensation","Combustion"],0]]
}};
sets["encyclopedia.html"]={name:"Little Learners Encyclopedia",icon:"📖",levels:{
beginner:[
["Which animal has a trunk?",["Elephant","Tiger","Penguin"],0],
["What do roots take in from soil?",["Water","Sunlight","Sound"],0],
["Which object helps us see distant stars?",["Telescope","Toaster","Compass"],0],
["What do we call a baby dog?",["Puppy","Kitten","Calf"],0],
["Which part of the body helps us hear?",["Ears","Elbows","Knees"],0]],
pro:[
["What is a habitat?",["The natural home of an organism","A type of weather","A machine part"],0],
["Which planet has prominent rings?",["Saturn","Mercury","Mars"],0],
["What is the job of a pollinator?",["Move pollen between flowers","Make soil disappear","Chop tree roots"],0],
["Which material is a good electrical conductor?",["Copper","Rubber","Dry wood"],0],
["What is a fossil?",["Preserved evidence of past life","A newly grown seed","A modern plastic toy"],0]],
advanced:[
["What is biodiversity?",["The variety of life in an area or on Earth","The age of one animal","The number of clouds"],0],
["Why are decomposers essential to ecosystems?",["They return nutrients to the environment","They stop photosynthesis","They remove all oxygen"],0],
["What is an adaptation?",["A feature that helps an organism survive or reproduce","A random weather event","A type of rock only"],0],
["Which scale is commonly used to measure mineral hardness?",["Mohs scale","Beaufort scale","Richter scale"],0],
["What does the term renewable resource mean?",["A resource replenished naturally on a human timescale","A resource that can never be used","A resource found only underground"],0]]
}};
const aliases={"english-extra.html":"english.html","reading-writing.html":"english.html","math-extra.html":"math.html","science-extra.html":"science.html","social-extra.html":"social-studies.html","social.html":"social-studies.html","computer-extra.html":"computer.html"};

const file=location.pathname.split("/").pop()||"";
const data=sets[file]||sets[aliases[file]];if(!data)return;
function start(){
 if(document.getElementById("gm-level-challenges"))return;
 const section=document.createElement("section");section.id="gm-level-challenges";section.className="gm-extra-panel";
 section.style.cssText="margin:24px auto;padding:20px;border-radius:20px;background:linear-gradient(135deg,#eef7ff,#fff4e8);border:2px solid #d8e8ff;max-width:1000px";
 section.innerHTML='<h2>'+data.icon+' '+data.name+' — Choose Your Challenge Level</h2><p>Start gently, build confidence, then try a tougher challenge. Each level has its own questions and score.</p><div class="gm-level-grid" role="group" aria-label="Choose challenge level"><button type="button" data-level="beginner">🌱 Beginner <small>Gentle starter questions</small></button><button type="button" data-level="pro">⭐ Pro <small>More challenging questions</small></button><button type="button" data-level="advanced">🚀 Advanced <small>Hardest questions</small></button></div><div id="gm-level-quiz" hidden><p id="gm-level-meta" aria-live="polite"></p><h3 id="gm-level-question"></h3><div id="gm-level-answers" class="answers"></div><p id="gm-level-feedback" role="status" aria-live="polite"></p><button type="button" id="gm-level-next" hidden>Next question →</button><p id="gm-level-score">Score: 0</p><button type="button" id="gm-level-back" class="secondary">Choose another level</button></div>';
 const style=document.createElement("style");style.textContent="#gm-level-challenges .gm-level-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:16px 0}#gm-level-challenges .gm-level-grid button{min-height:76px;border:2px solid #c9dafa;border-radius:14px;background:#fff;color:#20345c;font-weight:800;padding:10px;cursor:pointer}#gm-level-challenges .gm-level-grid small{display:block;font-weight:500;margin-top:5px}#gm-level-challenges button:focus-visible{outline:3px solid #f0a000;outline-offset:2px}#gm-level-challenges #gm-level-answers{display:grid;gap:9px}#gm-level-challenges #gm-level-answers button{min-height:48px;text-align:left;padding:10px;border-radius:12px;border:1px solid #cbd5e1;background:white;color:#172554}#gm-level-challenges button:disabled{opacity:.8}#gm-level-challenges #gm-level-feedback{min-height:28px;font-weight:700}@media(max-width:560px){#gm-level-challenges{padding:14px!important;margin:16px 8px!important}#gm-level-challenges .gm-level-grid{grid-template-columns:1fr}#gm-level-challenges .gm-level-grid button{min-height:58px}}";
 document.head.appendChild(style);
 const footer=document.querySelector("footer");if(footer)footer.parentNode.insertBefore(section,footer);else document.body.appendChild(section);
 const $=id=>document.getElementById(id);let level="beginner",index=0,score=0,answered=false;
 function chooseLevel(value){level=value;index=0;score=0;answered=false;$( "gm-level-quiz").hidden=false;section.querySelector(".gm-level-grid").hidden=true;render();}
 function render(){const bank=data.levels[level];answered=false;$("gm-level-meta").textContent=level.toUpperCase()+" • Question "+(index+1)+" of "+bank.length;$("gm-level-question").textContent=bank[index][0];$("gm-level-feedback").textContent="";$("gm-level-next").hidden=true;$("gm-level-answers").innerHTML="";bank[index][1].forEach((choice,i)=>{const b=document.createElement("button");b.type="button";b.textContent=choice;b.addEventListener("click",()=>{if(answered)return;answered=true;Array.from($("gm-level-answers").children).forEach(x=>x.disabled=true);if(i===bank[index][2]){score++;$("gm-level-feedback").textContent="🎉 Correct! Excellent work."}else{$("gm-level-feedback").textContent="Good try. The correct answer is "+bank[index][1][bank[index][2]]+"."} $("gm-level-score").textContent="Score: "+score+" / "+bank.length;$("gm-level-next").hidden=false;});$("gm-level-answers").appendChild(b);});$("gm-level-score").textContent="Score: "+score+" / "+bank.length;}
 function finish(){const bank=data.levels[level];$("gm-level-meta").textContent="Challenge complete";$("gm-level-question").textContent="You completed the "+level+" "+data.name+" challenge!";$("gm-level-answers").innerHTML="";$("gm-level-feedback").textContent="Final score: "+score+" out of "+bank.length+". Keep learning!";$("gm-level-next").hidden=true;if(window.gmSaveStudentProgress){window.gmSaveStudentProgress({subject:data.name,activity_key:"level-challenge-"+file.replace(".html","")+"-"+level,score,max_score:bank.length,correct_count:score,question_count:bank.length,source:"level-challenge",level}).catch(()=>{});}try{const key="greatMindsLevelChallengeScores";const old=JSON.parse(localStorage.getItem(key)||"[]");old.push({subject:data.name,level,score,total:bank.length,completedAt:new Date().toISOString()});localStorage.setItem(key,JSON.stringify(old.slice(-100)));}catch(e){}}
 section.querySelectorAll("[data-level]").forEach(b=>b.addEventListener("click",()=>chooseLevel(b.dataset.level)));
 $("gm-level-next").addEventListener("click",()=>{if(!answered)return;index++;if(index<data.levels[level].length)render();else finish();});
 $("gm-level-back").addEventListener("click",()=>{$("gm-level-quiz").hidden=true;section.querySelector(".gm-level-grid").hidden=false;});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();
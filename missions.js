// missions.js — All missions from Insomniac Spider-Man, Amazing Spider-Man 2, story missions

var MISSIONS = {
  story: [
    // ── PETER & MJ STORY ──
    {icon:'🏥',name:"Doctor's Appointment",desc:"Peter takes MJ to her prenatal checkup. The doctor has news...",villain:null,badge:'story',objective:'Escort MJ safely to the clinic on 5th Ave'},
    {icon:'🛻',name:"The Thrusters Box",desc:"A mysterious Stark crate arrives at the apartment. Inside: a new Spider-Man suit and jetpack thrusters.",villain:null,badge:'story',objective:'Open the crate and equip the new suit'},
    {icon:'🍼',name:"Setting Up the Nursery",desc:"Help MJ assemble the crib. Kingpin's men interrupt the neighborhood.",villain:'Kingpin Thugs',badge:'story',objective:'Protect the block while MJ finishes the nursery'},
    {icon:'👴',name:"Uncle Ben's Workshop",desc:"Visit Uncle Ben — he's alive and building something special for the baby.",villain:null,badge:'story',objective:"Help Uncle Ben finish building the baby's first toy"},
    {icon:'👨‍👩‍👦',name:"Miles Meets the Baby News",desc:"Peter tells Miles he's going to be a father. Miles has his own news too.",villain:null,badge:'story',objective:'Visit Miles at his apartment'},
    {icon:'📰',name:"Ned's Research",desc:"Ned has discovered a data leak. Someone is targeting Peter's identity.",villain:'Shocker',badge:'story',objective:'Stop Shocker from broadcasting Peter\'s identity'},
    {icon:'🏥',name:"MJ Goes into Labor",desc:"MJ's water breaks mid-swing. Race to the hospital while Doc Ock blocks the route!",villain:'Doctor Octopus',badge:'story',objective:'Get MJ to the hospital in under 4 minutes'},
    {icon:'👶',name:"The Baby Arrives",desc:"Peter and MJ's child is born. But Venom has other plans for the hospital.",villain:'Venom',badge:'story',objective:'Protect the hospital from Venom'},
    {icon:'🦸',name:"Family Matters",desc:"Stan Lee visits the hospital and gives Peter advice about being a hero AND a father.",villain:null,badge:'story',objective:'Talk to Stan Lee in the hospital lobby'},
  ],
  insomniac: [
    // ── INSOMNIAC PS4/PS5 MISSIONS ──
    {icon:'🚔',name:"The Main Event",desc:"Spider-Man stops the Kingpin — the opening mission.",villain:'Kingpin',badge:'story',objective:'Defeat Kingpin at Fisk Tower'},
    {icon:'🔬',name:"Keeping the Peace",desc:"A gang war erupts. Spider-Man must stop it before innocent people get hurt.",villain:'Inner Demons',badge:'story',objective:'Stop 3 gang confrontations across Harlem'},
    {icon:'⚡',name:"Wheels Within Wheels",desc:"Electro escapes from the Raft. Chase him across the power grid.",villain:'Electro',badge:'boss',objective:'Defeat Electro before he powers down the city'},
    {icon:'🦅',name:"Flight of the Vulture",desc:"The Vulture attacks the financial district from above.",villain:'Vulture',badge:'boss',objective:'Take down Vulture over Midtown'},
    {icon:'🦏',name:"Rhino Charge",desc:"Rhino has gone rogue in Times Square. Civilians everywhere.",villain:'Rhino',badge:'boss',objective:'Stop Rhino without civilian casualties'},
    {icon:'🪲',name:"The Screwball Challenge",desc:"Screwball livestreams herself creating chaos. Stop her before it goes viral.",villain:'Screwball',badge:'story',objective:'Complete 3 Screwball challenges'},
    {icon:'🤡',name:"Face the Music",desc:"Mysterio has turned Central Park into an illusion maze.",villain:'Mysterio',badge:'boss',objective:'Navigate Mysterio\'s illusions and defeat him'},
    {icon:'☠️',name:"The Raft Breaks Open",desc:"All super-villains escape from the Raft at once. Survive the chaos.",villain:'Multiple Villains',badge:'boss',objective:'Recapture Electro, Vulture, Rhino, Scorpion, Mister Negative'},
    {icon:'🐙',name:"Doctor Octopus Returns",desc:"Otto Octavius has lost control. The city is at stake.",villain:'Doctor Octopus',badge:'boss',objective:'Stop Doc Ock at the center of Manhattan'},
    {icon:'⚫',name:"The Symbiote Spreads",desc:"Venom's symbiote is spreading. Protect civilians.",villain:'Venom',badge:'boss',objective:'Defeat Venom at the bridge'},
    {icon:'💡',name:"Mister Negative's Gang",desc:"Inner Demons, armed with Dark Energy, take over Grand Central.",villain:'Mister Negative',badge:'boss',objective:'Clear Grand Central of Inner Demons'},
    {icon:'💀',name:"Silver Sable Contract",desc:"Silver Sable has a Sable International contract on Spider-Man.",villain:'Silver Sable',badge:'story',objective:'Convince Silver Sable to stand down'},
    {icon:'🐉',name:"The Demons Rise",desc:"Mister Negative corrupts FEAST volunteers. Save them.",villain:'Mister Negative',badge:'story',objective:'Cure 8 corrupted volunteers'},
    {icon:'🌃',name:"Miles First Mission",desc:"Play as Miles for the first time. Learn Venom Strike and Camouflage.",villain:'Roxxon Guards',badge:'story',objective:'Infiltrate Roxxon as Miles'},
    {icon:'🎵',name:"Miles Confronts the Tinkerer",desc:"The Tinkerer — Phin — is Miles\' childhood friend. A heartbreaking mission.",villain:'Tinkerer',badge:'boss',objective:'Stop the Tinkerer at the Oscorp building'},
    {icon:'🦠',name:"The Plague",desc:"A bioweapon is released. Spider-Man races to find the cure.",villain:'Mr. Negative',badge:'story',objective:'Find the antigen in 5 minutes'},
    {icon:'🏙️',name:"Yuri's Last Stand",desc:"Detective Yuri Watanabe has gone too far. Stop the Wraith.",villain:'Wraith',badge:'story',objective:'Confront Yuri on the rooftop'},
    {icon:'🤖',name:"Hammerhead's Iron Army",desc:"Hammerhead has given himself a metal skull and an army of robots.",villain:'Hammerhead',badge:'boss',objective:'Defeat Hammerhead and destroy his war robots'},
  ],
  amazing: [
    // ── AMAZING SPIDER-MAN 2 (ACTIVISION) MISSIONS ──
    {icon:'🚗',name:"The Car Chase",desc:"Spider-Man chases Kingpin's limo through Manhattan. Swing between cars!",villain:'Kingpin',badge:'story',objective:'Stop Kingpin\'s limo before it reaches the docks'},
    {icon:'🔥',name:"The Carnage Clues",desc:"A serial killer is terrorizing NYC. Follow the clues.",villain:'Cletus Kasady',badge:'story',objective:'Find 5 Carnage clues across the city'},
    {icon:'🎭',name:"Mysterio's Illusions",desc:"Mysterio creates fake crises to lure Spider-Man into a trap.",villain:'Mysterio',badge:'boss',objective:'Escape Mysterio\'s reality-bending trap'},
    {icon:'🦂',name:"Scorpion's Sting",desc:"Mac Gargan — the Scorpion — is hunting police officers.",villain:'Scorpion',badge:'boss',objective:'Defeat Scorpion at the police precinct'},
    {icon:'⚡',name:"Electro's Grid",desc:"Max Dillon attacks the power grid. NYC goes dark.",villain:'Electro',badge:'boss',objective:'Restore power to 3 substations then defeat Electro'},
    {icon:'🕷️',name:"The Spider-Slayer",desc:"Spencer Smythe unleashes a Spider-Slayer robot in Midtown.",villain:'Smythe',badge:'boss',objective:'Destroy the Spider-Slayer robot'},
    {icon:'🃏',name:"Crime Master",desc:"Crime Master has kidnapped a senator. Infiltrate his hideout.",villain:'Crime Master',badge:'stealth',objective:'Rescue the senator without being seen'},
    {icon:'🦹',name:"Black Cat's Heist",desc:"Felicia Hardy is stealing from Oscorp. Friend or foe?",villain:'Black Cat',badge:'story',objective:'Stop Black Cat from escaping with the Oscorp data'},
    {icon:'🏗️',name:"Kingpin's Construction",desc:"Kingpin is using a construction site as a front for weapons smuggling.",villain:'Kingpin',badge:'story',objective:'Take down Kingpin\'s operation at the docks'},
    {icon:'🐙',name:"Superior Spider-Man",desc:"Otto Octavius has taken over Peter\'s body. Miles must stop him.",villain:'Superior Spider-Man',badge:'boss',objective:'Defeat the Superior Spider-Man as Miles'},
    {icon:'💣',name:"Carnage Unleashed",desc:"Cletus Kasady has bonded with the Carnage symbiote. NYC is in chaos.",villain:'Carnage',badge:'boss',objective:'Defeat Carnage at the museum — do not let him escape'},
    {icon:'🐝',name:"Swarm Attack",desc:"Swarm — a villain made of Nazi bees — attacks the park.",villain:'Swarm',badge:'boss',objective:'Defeat Swarm at Central Park'},
  ],
  stealth: [
    {icon:'🥷',name:"Infiltrate Fisk Tower",desc:"Get past 20 guards, cameras, and laser tripwires without being spotted.",villain:'Kingpin',badge:'stealth',objective:'Reach Kingpin\'s vault undetected'},
    {icon:'🌑',name:"Miles Goes Dark",desc:"Use Miles\' camouflage to sneak through Roxxon Energy\'s lab.",villain:'Roxxon Guards',badge:'stealth',objective:'Steal the Nuform data without triggering any alarms'},
    {icon:'📷',name:"MJ's Undercover",desc:"Play as MJ — no powers! Sneak through the gala using only wit and a camera.",villain:'Demons',badge:'stealth',objective:'Photograph the deal without being caught'},
    {icon:'🔦',name:"The Shadow Heist",desc:"Steal Electro\'s power cell from a SHIELD facility using only web gadgets.",villain:'SHIELD',badge:'stealth',objective:'Get in and out in under 3 minutes'},
    {icon:'🏛️',name:"Courthouse Conspiracy",desc:"A corrupt judge is selling warrants. Record the evidence.",villain:'Corrupt Officials',badge:'stealth',objective:'Plant 3 listening devices in the courthouse'},
    {icon:'🚢',name:"Hammerhead\'s Submarine",desc:"Sneak onto Hammerhead\'s submarine to find where the weapons are going.",villain:'Hammerhead',badge:'stealth',objective:'Tag all weapons crates and escape before the sub dives'},
  ],
  freeroam: [
    {icon:'🌆',name:"NYC Free Roam",desc:"Swing anywhere in Manhattan. No objectives, just vibes.",villain:null,badge:'free',objective:'Explore the city — just swing!'},
    {icon:'🌃',name:"Midnight Patrol",desc:"Free roam at night. Random crimes spawn — stop as many as you can.",villain:'Random Criminals',badge:'free',objective:'Stop random crimes for 10 minutes'},
    {icon:'📸',name:"Tourist Mode",desc:"Swing past all NYC landmarks and photograph them.",villain:null,badge:'free',objective:'Photograph 12 NYC landmarks'},
    {icon:'🏃',name:"Race the Clock",desc:"Swing from the Statue of Liberty to the Empire State Building as fast as possible.",villain:null,badge:'free',objective:'Complete the route in under 90 seconds'},
    {icon:'🐦',name:"Pigeon Watch",desc:"Stan Lee needs help finding his missing pigeons on the rooftops.",villain:null,badge:'free',objective:'Find Stan Lee\'s 8 pigeons'},
    {icon:'🎭',name:"Street Performer",desc:"Pose for photos with 10 tourists as Spider-Man.",villain:null,badge:'free',objective:'Take selfies with tourists around Times Square'},
  ],
  boss: [
    {icon:'👑',name:"Kingpin — Final Form",desc:"Wilson Fisk in his bulletproof armor. Use the environment.",villain:'Kingpin',badge:'boss',objective:'Defeat Kingpin'},
    {icon:'⚡',name:"Electro — Maximum Power",desc:"Max Dillon at full voltage. Hit him during discharge windows.",villain:'Electro',badge:'boss',objective:'Defeat Electro'},
    {icon:'🦅',name:"Vulture — Aerial Battle",desc:"Adrian Toomes in the air. Web his wings to ground him.",villain:'Vulture',badge:'boss',objective:'Defeat Vulture'},
    {icon:'🦏',name:"Rhino — Armored Assault",desc:"Aleksei in his armored suit. Use heavy objects against him.",villain:'Rhino',badge:'boss',objective:'Defeat Rhino'},
    {icon:'🐙',name:"Doctor Octopus — Maximum",desc:"Otto with his full mechanical arms. Dodge and counter.",villain:'Doctor Octopus',badge:'boss',objective:'Defeat Doctor Octopus'},
    {icon:'⚫',name:"Venom — Symbiote Rage",desc:"Eddie Brock merged with the symbiote. Use fire and sound.",villain:'Venom',badge:'boss',objective:'Defeat Venom'},
    {icon:'🦸',name:"Green Goblin — Glider",desc:"Norman Osborn on his glider with pumpkin bombs.",villain:'Green Goblin',badge:'boss',objective:'Defeat Green Goblin'},
    {icon:'💀',name:"Carnage — Chaos",desc:"Cletus Kasady bonded with Carnage. Fastest boss in the game.",villain:'Carnage',badge:'boss',objective:'Survive and defeat Carnage'},
    {icon:'🦂',name:"Scorpion — Tail Strike",desc:"Mac Gargan\'s acid tail. Dodge the acid puddles.",villain:'Scorpion',badge:'boss',objective:'Defeat Scorpion'},
    {icon:'🌫️',name:"Mysterio — Mind Games",desc:"Quentin Beck\'s illusions make 10 Spider-Men. Find the real one.",villain:'Mysterio',badge:'boss',objective:'See through Mysterio\'s illusions and defeat him'},
    {icon:'🔌',name:"Shocker — Vibro Blasts",desc:"Herman Schultz with upgraded gauntlets.",villain:'Shocker',badge:'boss',objective:'Defeat Shocker'},
    {icon:'🌙',name:"Mister Negative — Corruption",desc:"Martin Li\'s dark power infects anything it touches.",villain:'Mister Negative',badge:'boss',objective:'Defeat Mister Negative and purify the corruption'},
    {icon:'🤖',name:"Hammerhead — Steel Skull",desc:"Hammerhead charges like a bull. Get out of the way.",villain:'Hammerhead',badge:'boss',objective:'Defeat Hammerhead'},
    {icon:'💃',name:"Silver Sable — Elite",desc:"Silver Sable with her mercenary squad. No cheap tricks.",villain:'Silver Sable',badge:'boss',objective:'Defeat Silver Sable in a fair fight'},
    {icon:'⚔️',name:"Tombstone — Invincible",desc:"Lonnie Lincoln is nearly invincible. Find the weakness.",villain:'Tombstone',badge:'boss',objective:'Defeat Tombstone using sonic webbing'},
    {icon:'🎪',name:"Tinkerer — Mech Suit",desc:"Phin Mason in her power suit. A heartbreaking battle.",villain:'Tinkerer',badge:'boss',objective:'Defeat the Tinkerer'},
    {icon:'🐺',name:"The Jackal — Clone Army",desc:"Miles Warren has made Spider-Man clones. Which is real?",villain:'Jackal',badge:'boss',objective:'Defeat the Jackal and his clone army'},
  ],
};

var currentMissionTab = 'story';
function setMissionTab(tab, el){
  currentMissionTab = tab;
  document.querySelectorAll('.mTab').forEach(function(t){ t.classList.remove('active'); });
  el.classList.add('active');
  buildMissionList(tab);
}

function buildMissionList(tab){
  var list = document.getElementById('missionList');
  list.innerHTML='';
  var missions = MISSIONS[tab] || MISSIONS.story;
  missions.forEach(function(m, i){
    var d = document.createElement('div');
    d.className='missionCard'+(i>6&&tab==='story'?' locked':'');
    var badgeColors = {story:'badge-story',free:'badge-free',stealth:'badge-stealth',boss:'badge-boss'};
    d.innerHTML='<div class="mCardIcon">'+m.icon+'</div>'
      +'<div class="mCardInfo">'
        +'<div class="mCardName">'+m.name+'</div>'
        +'<div class="mCardDesc">'+m.desc+'</div>'
        +(m.villain?'<div class="mCardVillain">VILLAIN: '+m.villain+'</div>':'')
      +'</div>'
      +'<div class="mCardBadge '+badgeColors[m.badge]+'">'+m.badge.toUpperCase()+'</div>';
    if(i<=6||tab!=='story'){
      d.onclick=(function(mission){ return function(){ startMission(mission); }; })(m);
    }
    list.appendChild(d);
  });
}

function startMission(m){
  currentMission = m;
  document.getElementById('mHUDName').textContent = m.name;
  document.getElementById('mHUDObj').textContent = m.objective;
  launchGame();
}

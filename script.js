let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;"
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]); //first object in the location array.. Town square
}

function goStore() {
  update(locations[1]); //second object in the location array.. Store
}

function goCave() {
  update(locations[2]); //third object in the location array.. Cave
}

function buyHealth() {
  if (gold >= 10) { // 50 >= 10 true
    gold -= 10; //50 - 10 = 40
    health += 10; // 100 + 10 = 110
    goldText.innerText = gold; //40
    healthText.innerText = health; //110
  } else {
    text.innerText = "You do not have enough gold to buy health."; //"You do not have enough gold to buy health."
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) { //0 < 3 = true
    if (gold >= 30) { //50 >= 30 true
      gold -= 30; // 50 - 30 = 20
      currentWeapon++; // 0 + 1= 1
      goldText.innerText = gold; // 20
      let newWeapon = weapons[currentWeapon].name; //dagger
      text.innerText = "You now have a " + newWeapon + "."; //"You now have a dagger."
      inventory.push(newWeapon); //dagger
      text.innerText += " In your inventory you have: " + inventory; //" In your inventory you have: dagger "
    } else {
      text.innerText = "You do not have enough gold to buy a weapon."; //if gold is not > or = 30 "You do not have enough gold to buy a weapon." 
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) { //if inventory contains more than one item. inventory = ["stick","dagger"] 2 > 1 true 
    gold += 15; // 50 + 15 = 65
    goldText.innerText = gold; //65
    let currentWeapon = inventory.shift(); // "stick"
    text.innerText = "You sold a " + currentWeapon + "."; //"You sold a stick"
    text.innerText += " In your inventory you have: " + inventory; //" In your inventory you have: dagger."
  } else {
    text.innerText = "Don't sell your only weapon!"; //if inventory is <= 1 then. "Don't sell your only weapon!"
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]); // fourth object in the locationn array
  monsterHealth = monsters[fighting].health; // monsterHealth =monsters[0].health.. monsterHealth = 15
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name; //"Slime"
  monsterHealthText.innerText = monsterHealth; //15
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks."; //"The slime attacks."
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + "."; //" You attack it with your dagger."
  health -= getMonsterAttackValue(monsters[fighting].level); // 100 -= 5 * 2 = 10. 100 -10 =90 . health = 90
  if (isMonsterHit()) { //If true: Player hits the monster, and the next block executes. If false it moves to the else block
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1; // monsterHealth -= 30 + 0 + 1. monsterHealth -= 31. 15 - 31= -16(defeated)
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health; // 90
  monsterHealthText.innerText = monsterHealth; // 16
  if (health <= 0) {  // false
    lose();
  } else if (monsterHealth <= 0) { //true
    if (fighting === 2) {  // false fighting === 0 slime
      winGame();
    } else {
      defeatMonster(); // defeat monster
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {  //true inventory ["stick", "dagger"]
    text.innerText += " Your " + inventory.pop() + " breaks."; //Your dagger breaks. 
    currentWeapon--; //"stick"
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0; // if hit is greater than 0 return hit else return 0
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;  // "You dodge the attack from the slime"
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7); // gold += 2*6.7 =13.4. gold += 13 . gold = 63
  xp += monsters[fighting].level; // xp = 2
  goldText.innerText = gold; //63
  xpText.innerText = xp; //2
  update(locations[4]); //fifth object in the  array (location[4]).
}

function lose() {
  update(locations[5]); //6th object in the array (loaction[5])
}

function winGame() {
  update(locations[6]); //7th object in the array (loaction[6])
}

function restart() {
  xp = 0; // reset xp to 0
  health = 100; // reset health to 100
  gold = 50; // reset gold to 50
  currentWeapon = 0; //resets to default weapon stick
  inventory = ["stick"]; // clears out inventory and resets to stick
  goldText.innerText = gold; //gold
  healthText.innerText = health; //health
  xpText.innerText = xp; //xp
  goTown();
}

function easterEgg() {
  update(locations[7]); //8th object in the  array array (location[7])
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = []; //[] after looping and pushing to the array.numbers = [3, 7, 10, 2, 8, 5, 6, 9, 0, 1];
  while (numbers.length < 10) { //true the loops keeps being true till numbers array lenght is not less than 10
    numbers.push(Math.floor(Math.random() * 11)); // example numbers = [3, 7, 10, 2, 8, 5, 6, 9, 0, 1];
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }

  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
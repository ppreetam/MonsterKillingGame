const MONSTER_HEALTHBAR = document.getElementById('monster-health');
const PLAYER_HEALTHBAR = document.getElementById('player-health');
let bonusLifeEl = document.getElementById('bonus-life');
const attackBtn = document.getElementById('attack-btn');
const strongAttackBtn = document.getElementById('strong-attack-btn');
const healBtn = document.getElementById('heal-btn');
const logBtn = document.getElementById('log-btn');
const attack_value=10;
const MONSTER_AttackValue=11;
const strong_attack_value=14;
const healValue=20;
let bonus=true;
function getLife(){
let enterdHealth=prompt("enter the initial health for you and monster");
let parseLife=parseInt(enterdHealth);
if(isNaN(parseLife)||parseLife<=0){
    throw {message: 'the choosen value is not a number'};

}
return parseLife;

}
let MAX_LIFE;
try{
    MAX_LIFE=getLife();
}
catch(error){
    MAX_LIFE=100;
}

let current_PLAYER_HEALTH=MAX_LIFE;
let current_MONSTER_HEALTH=MAX_LIFE;
adjustHealthBars(MAX_LIFE);
let Player_attack="playerAttack";
let monster_attack="monsterAttack";
let game_over="the game is over ";
let playerStrongAttack="StrongAttack";
let Heling="heal";
let battlelog=[];

function adjustHealthBars(maxLife) {
    MONSTER_HEALTHBAR.max = maxLife;
    MONSTER_HEALTHBAR.value = maxLife;
    PLAYER_HEALTHBAR.max = maxLife;
    PLAYER_HEALTHBAR.value = maxLife;
  }
  function endRound(){
      let intialhealth=current_PLAYER_HEALTH;
      let playerdamage=DealPlayerDamage(MONSTER_AttackValue);
      current_PLAYER_HEALTH-=playerdamage;
      writetolog(monster_attack,
        playerdamage,
        current_PLAYER_HEALTH,
        current_MONSTER_HEALTH);
      if(current_PLAYER_HEALTH<=0 && bonus){
        bonus=false;
        current_PLAYER_HEALTH=intialhealth;
        PLAYER_HEALTHBAR.value=current_PLAYER_HEALTH;
        removebonuslife();
        alert("You Were Saved By BonusLife");
      }
 
    if(current_PLAYER_HEALTH<=0 && current_MONSTER_HEALTH>0){
        alert("You Lost :(");
        writetolog(game_over,
            "monster Won",
            current_PLAYER_HEALTH,
            current_MONSTER_HEALTH);
    }
    else if(current_PLAYER_HEALTH>0 && current_MONSTER_HEALTH<=0){
        alert("You won :)");
        writetolog(game_over,
            "Player won",
            current_PLAYER_HEALTH,
            current_MONSTER_HEALTH);
    }
    else if (current_PLAYER_HEALTH<0 && current_MONSTER_HEALTH<0){
        alert("Match is Draw!");
        writetolog(game_over,
            "its a draw",
            current_PLAYER_HEALTH,
            current_MONSTER_HEALTH);
    }
    if(current_PLAYER_HEALTH<=0|| current_MONSTER_HEALTH<=0){
        resetgame();
    }

  }
function Attack_Handler(mode)
{
    maxDamage= mode==="ATTACK" ? attack_value : strong_attack_value;
    let attack_event= mode==="ATTACk" ? Player_attack : playerStrongAttack;
    // if(mode=="ATTACK"){
    //     maxDamage=attack_value;
    //     attack_event=Player_attack;
    // }
    // if (mode=="STRONGATTACK"){
    //     maxDamage=strong_attack_value;
    //     attack_event=playerStrongAttack;
    // }
    damage=DealMonsterDamage(maxDamage);
    current_MONSTER_HEALTH-=damage;
    damage=DealPlayerDamage(MONSTER_AttackValue);
    current_PLAYER_HEALTH-=damage;
    writetolog(attack_event,
        damage,
        current_PLAYER_HEALTH,
        current_MONSTER_HEALTH);
        endRound();
}
function DealMonsterDamage(AttackValue){
    let damage=Math.random()*AttackValue;
    MONSTER_HEALTHBAR.value-=damage;
    // alert(damage);
    return damage;
    
}
function DealPlayerDamage(MONSTER_AttackValue){
    let damage=Math.random()*MONSTER_AttackValue;
    PLAYER_HEALTHBAR.value-=damage;
    // alert(damage);
    return damage;
    
}
function healing(){
    let Heal_Value;
    if (current_PLAYER_HEALTH+ healValue >= MAX_LIFE){
            alert("You Can't heal more than 100 max life");
            Heal_Value=MAX_LIFE-current_PLAYER_HEALTH;
        }
    else{
        Heal_Value=healValue;
    }
    current_PLAYER_HEALTH+=Heal_Value;
    PLAYER_HEALTHBAR.value+=Heal_Value;
    let playerdamage=DealPlayerDamage(attack_value)
   current_PLAYER_HEALTH-=playerdamage;

   writetolog(Heling,
    playerdamage,
    current_PLAYER_HEALTH,
    current_MONSTER_HEALTH);
    endRound();

}
function resetgame()
  {current_PLAYER_HEALTH=MAX_LIFE;
    current_MONSTER_HEALTH=MAX_LIFE;
    PLAYER_HEALTHBAR.value=MAX_LIFE;
    MONSTER_HEALTHBAR.value=MAX_LIFE;
  }
function Attack_function(){
    Attack_Handler("ATTACK");
}
function strongAttackFuction(){
    Attack_Handler("STRONGATTACK");
}
function removebonuslife(){
    bonusLifeEl.parentNode.removeChild(bonusLifeEl);
}
function writetolog(ev,val,playerhealth,monsterhealth){
    let logentry={event:ev,
        playerhealth:playerhealth,
        monsterhealth:monsterhealth,
        value:val
    };
    if(ev===Player_attack|| ev===playerStrongAttack){
        logentry.Attack="Monster";
    }
    if(ev===monster_attack){
        logentry.Attack="Player";
    }
    if(ev===Heling){
        logentry.Attack="Player";
    }
    if(ev===game_over){
        logentry={event:ev,
            playerhealth:playerhealth,
            monsterhealth:monsterhealth,
            value:val
        };
    }
 battlelog.push(logentry);
}
let i=0;
function printthelog(){
    for (let logentry of battlelog){
        console.log(`#${i}`);
        for(let key in logentry){
            console.log(`${key}=>${logentry[key]}`);
        }
        i++;
    }
    console.log(battlelog);  
}
attackBtn.addEventListener("click",Attack_function);
strongAttackBtn.addEventListener("click",strongAttackFuction);
healBtn.addEventListener("click",healing);
logBtn.addEventListener('click',printthelog);


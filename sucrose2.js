var modInfo={};
var monsterId=0;
var monsterHP=new Decimal(131);
var Attack3Value=new Decimal(0);

function getAttackEnergy(){
	if(Decimal.fromDecimal(window.parent.player.energy).gte(100)){
		return Decimal.fromDecimal(window.parent.player.energy).div(Decimal.fromDecimal(window.parent.player.energy).log10().div(2).pow(0.1));
	}
	return new Decimal(100);
}

function getAttackEnergy2(){
	return getAttackEnergy().mul(1.4+1000/(Date.now()-Attack2Time+1)).add(1e60);
}

function getAttackEnergy3(){
	return getAttackEnergy().mul(Decimal.add(16/9,Attack3Value.div(getAttackEnergy().log10().sqrt()).div(getBaseAttack()).div(100))).add(1e100);
}

function getAttack(){
	return Decimal.floor(getAttackEnergy().log10().sqrt().mul(getBaseAttack()).mul(monsterInfo[monsterId][3]).div(monsterInfo[monsterId][3]+500+Decimal.fromDecimal(window.parent.player.sucrose.level).toNumber()));
}

function getAttack2(){
	return Decimal.floor(getAttackEnergy().log10().sqrt().mul(getBaseAttack()).mul(3).mul(monsterInfo[monsterId][3]).div(monsterInfo[monsterId][3]+500+Decimal.fromDecimal(window.parent.player.sucrose.level).toNumber()));
}

function getAttack3(){
	return getAttackEnergy().log10().sqrt().mul(getBaseAttack());
}

function attack(){
	if(Decimal.fromDecimal(window.parent.player.energy).gte(100)){
		monsterHP=monsterHP.sub(getAttack());
		window.parent.player.energy=window.parent.player.energy.sub(window.parent.Decimal.fromDecimal(getAttackEnergy()));
		if(monsterHP.lte(0)){
			window.parent.player.sucrose.exp=window.parent.player.sucrose.exp.add(monsterInfo[monsterId][2]);
			if(getAttack().mul(5).gte(monsterInfo[monsterId][1]) && monsterInfo[monsterId+1][1])monsterId++;
			monsterHP=new Decimal(monsterInfo[monsterId][1]);
		}
	}
}

function attack2(){
	if(Decimal.fromDecimal(window.parent.player.energy).gte(getAttackEnergy2())){
		monsterHP=monsterHP.sub(getAttack2());
		window.parent.player.energy=window.parent.player.energy.sub(window.parent.Decimal.fromDecimal(getAttackEnergy2()));
		Attack2Time=Date.now();
		if(monsterHP.lte(0)){
			window.parent.player.sucrose.exp=window.parent.player.sucrose.exp.add(monsterInfo[monsterId][2]);
			if(getAttack().mul(5).gte(monsterInfo[monsterId][1]) && monsterInfo[monsterId+1][1])monsterId++;
			monsterHP=new Decimal(monsterInfo[monsterId][1]);
		}
	}
}

function attack3(){
	if(Decimal.fromDecimal(window.parent.player.energy).gte(getAttackEnergy3())){
		window.parent.player.energy=window.parent.player.energy.sub(window.parent.Decimal.fromDecimal(getAttackEnergy3()));
		Attack3Value=Attack3Value.add(getAttack3());
		if(monsterHP.lte(0)){
			window.parent.player.sucrose.exp=window.parent.player.sucrose.exp.add(monsterInfo[monsterId][2]);
			if(getAttack().mul(5).gte(monsterInfo[monsterId][1]) && monsterInfo[monsterId+1][1])monsterId++;
			monsterHP=new Decimal(monsterInfo[monsterId][1]);
		}
	}
}

function update(){
	document.getElementById("sucrose1").innerHTML = formatWhole(Decimal.fromDecimal(window.parent.player.sucrose.level))+" EXP:"+formatWhole(Decimal.fromDecimal(window.parent.player.sucrose.exp))+"/"+formatWhole(getSucroseLevelRequirement())+" ATK:"+formatWhole(getBaseAttack())+" 风元素伤害加成："+format(getAttackEnergy().log10().sqrt().mul(Math.sqrt(5000)).sub(100))+"%";
	document.getElementById("sucrose2").innerHTML="简式风灵攻击（消耗"+format(getAttackEnergy().div(Decimal.fromDecimal(window.parent.player.energy.add(1))).mul(100))+"%"+"能量）";
	if(window.parent.player.energy.lte(100))document.getElementById("sucrose2").innerHTML="简式风灵攻击（需要至少100能量）";
	document.getElementById("sucrose3").style.display=(getSucroseLevel().gte(20)?"":"none");
	document.getElementById("sucrose3").innerHTML="召唤小型风灵（消耗"+format(getAttackEnergy2().div(Decimal.fromDecimal(window.parent.player.energy.add(1))).mul(100))+"%"+"能量）";
	if(window.parent.player.energy.lte(1e60))document.getElementById("sucrose3").innerHTML="召唤小型风灵（需要至少1e60能量）";
	document.getElementById("sucrose4").style.display=(getSucroseLevel().gte(50)?"":"none");
	document.getElementById("sucrose4").innerHTML="召唤持续风灵（消耗"+format(getAttackEnergy3().div(Decimal.fromDecimal(window.parent.player.energy.add(1))).mul(100))+"%"+"能量）";
	if(window.parent.player.energy.lte(1e100))document.getElementById("sucrose4").innerHTML="召唤持续风灵（需要至少1e100能量）";
	document.getElementById("monster").innerHTML = monsterInfo[monsterId][0] + " HP:" + formatWhole(monsterHP) + "/" + formatWhole(monsterInfo[monsterId][1]) + " 击败获得" + formatWhole(monsterInfo[monsterId][2]) + "经验值";
	document.getElementById("b1").innerHTML=format(getSucroseBonus1());
	document.getElementById("b2").innerHTML=format(getSucroseBonus2());
	document.getElementById("b3").innerHTML=format(getSucroseBonus3());
	document.getElementById("b4").innerHTML=format(getSucroseBonus4());
	
	monsterHP=monsterHP.sub(Attack3Value.mul(0.04));
	Attack3Value=Attack3Value.mul(0.96);
		if(monsterHP.lte(0)){
			window.parent.player.sucrose.exp=window.parent.player.sucrose.exp.add(monsterInfo[monsterId][2]);
			if(getAttack().mul(5).gte(monsterInfo[monsterId][1]) && monsterInfo[monsterId+1][1])monsterId++;
			monsterHP=new Decimal(monsterInfo[monsterId][1]);
	}

	sucroseLevelUp();
}
if(window.parent==window){
	document.location.replace('./index.html');
}else{
	setInterval(update,50);
}
var monsterInfo=[
	["水史莱姆 Lv5", 131, 150, 525],
	["火史莱姆 Lv10",229, 220, 550],
	["冰史莱姆 Lv15",408, 330, 575],
	["岩史莱姆 Lv20",708, 500, 600],
	["草史莱姆 Lv25",916, 750, 625],
	["雷史莱姆 Lv30",1178,1000,650],
	
	["丘丘人 Lv35",   2089, 1250,675],
	["木盾丘丘人 Lv40",4042, 1600,700],
	["火箭丘丘人 Lv45",5750, 2000,725],
	["雷箭丘丘人 Lv50",7994,2500,750],
	["冰箭丘丘人 Lv55",14754,3200,775],
	["岩盾丘丘人 Lv60",25143,4000,800],

	["火斧丘丘暴徒 Lv65",40000,5000,825],
	["木盾丘丘暴徒 Lv70",65000,6400,850],
	["岩盾丘丘暴徒 Lv75", 1e5 ,8000,875],
	["冰盾丘丘暴徒 Lv80",1.6e5,10000,900],
	["雷斧丘丘暴徒 Lv85",2.5e5,12000,925],
	["水行丘丘游侠 Lv90", 4e5 ,14000,950],

	["遗迹守卫 Lv95", 6.5e5,17000,975],
	["遗迹猎者 Lv100", 1e6 ,20000,1000],
	["遗迹重机 Lv105",1.6e6,24000,1025],
	["丘丘霜铠王 Lv110",2.5e6,28000,1050],
	["丘丘岩盔王 Lv115", 4e6 ,34000,1075],
	["丘丘雷兜王 Lv120",6.5e6,40000,1100],
];
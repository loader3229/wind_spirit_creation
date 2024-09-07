var modInfo={};
var monsterId=0;
var monsterHP=new Decimal(100);
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
	return Decimal.floor(getAttackEnergy().log10().sqrt().mul(getBaseAttack()));
}

function getAttack2(){
	return Decimal.floor(getAttackEnergy().log10().sqrt().mul(getBaseAttack()).mul(3));
}

function getAttack3(){
	return Decimal.floor(getAttackEnergy().log10().sqrt().mul(getBaseAttack()).mul(2));
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
	document.getElementById("sucrose1").innerHTML=formatWhole(getSucroseLevel())+" EXP:"+formatWhole(Decimal.fromDecimal(window.parent.player.sucrose.exp))+"/"+formatWhole(getSucroseLevelRequirement())+" ATK:"+formatWhole(getBaseAttack());
	document.getElementById("sucrose2").innerHTML="简式风灵攻击（消耗"+format(getAttackEnergy().div(Decimal.fromDecimal(window.parent.player.energy.add(1))).mul(100))+"%"+"能量）";
	if(window.parent.player.energy.lte(100))document.getElementById("sucrose2").innerHTML="简式风灵攻击（需要至少100能量）";
	document.getElementById("sucrose3").style.display=(getSucroseLevel().gte(20)?"":"none");
	document.getElementById("sucrose3").innerHTML="召唤小型风灵（消耗"+format(getAttackEnergy2().div(Decimal.fromDecimal(window.parent.player.energy.add(1))).mul(100))+"%"+"能量）";
	if(window.parent.player.energy.lte(1e60))document.getElementById("sucrose3").innerHTML="召唤小型风灵（需要至少1e60能量）";
	document.getElementById("sucrose4").style.display=(getSucroseLevel().gte(50)?"":"none");
	document.getElementById("sucrose4").innerHTML="召唤持续风灵（消耗"+format(getAttackEnergy3().div(Decimal.fromDecimal(window.parent.player.energy.add(1))).mul(100))+"%"+"能量）";
	if(window.parent.player.energy.lte(1e100))document.getElementById("sucrose4").innerHTML="召唤持续风灵（需要至少1e100能量）";
	document.getElementById("monster").innerHTML=monsterInfo[monsterId][0]+" HP:"+formatWhole(monsterHP)+"/"+formatWhole(monsterInfo[monsterId][1]);
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
}
if(window.parent==window){
	document.location.replace('./index.html');
}else{
	setInterval(update,50);
}
var monsterInfo=[
	["水史莱姆",100,1],
	["火史莱姆",500,7],
	["冰史莱姆",2000,30],
	["岩史莱姆",5000,80],
	["草史莱姆",10000,165],
	["雷史莱姆",20000,340],
	
	["丘丘人",100000,2000],
	["打手丘丘人",200000,4400],
	["冲锋丘丘人",500000,12000],
	["木盾丘丘人",1000000,26000],
	["射手丘丘人",2000000,54000],
	["火箭丘丘人",3000000,82000],
	["雷箭丘丘人",5000000,140000],
	["冰箭丘丘人",7000000,200000],
	["爆弹丘丘人",10000000,290000],
	["岩盾丘丘人",15000000,440000],
	["冰盾丘丘人",20000000,600000],
	
	["火斧丘丘暴徒",30000000,950000],
	["木盾丘丘暴徒",50000000,1600000],
	["岩盾丘丘暴徒",70000000,2300000],
];
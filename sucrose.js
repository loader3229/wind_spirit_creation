﻿function sucroseLevelUp() {
	if (Decimal.fromDecimal(window.parent.player.sucrose.exp).gte(getSucroseLevelRequirement())) {
		window.parent.player.sucrose.level = Decimal.fromDecimal(window.parent.player.sucrose.level.add(1));
		window.parent.player.sucrose.exp = new Decimal(0);
	}
}

function getSucroseLevel() {
	return Decimal.fromDecimal(window.parent.player.sucrose.level);
}

function getSucroseLevelRequirement(){
	if (getSucroseLevel().gte(80)) return Decimal.pow(2, getSucroseLevel().add(1).div(10).pow(2).div(8)).mul(1000);
	else return Decimal.pow(2, getSucroseLevel().add(1).div(10)).mul(1000);
}

function getSucroseBonus1(){
	if(getSucroseLevel().gte(80)) return getSucroseLevel().div(80);
	return getSucroseLevel().div(100).add(0.1);
}

function getSucroseBonus2(){
	if(getSucroseLevel().gte(80))return getSucroseLevel().pow(getSucroseLevel().sub(50).div(10)).mul(window.parent.player.sucrose.weapon1.gte(20)?getWeaponBonus2():1);
	if(getSucroseLevel().gte(60))return getSucroseLevel().pow(3).mul(window.parent.player.sucrose.weapon1.gte(20)?getWeaponBonus2():1);
	if(getSucroseLevel().gte(45))return getSucroseLevel().pow(2).mul(window.parent.player.sucrose.weapon1.gte(20)?getWeaponBonus2():1);
	if(getSucroseLevel().gte(30))return getSucroseLevel().pow(1.5).mul(window.parent.player.sucrose.weapon1.gte(20)?getWeaponBonus2():1);
	if(getSucroseLevel().gte(15))return getSucroseLevel().mul(window.parent.player.sucrose.weapon1.gte(20)?getWeaponBonus2():1);
	return getSucroseLevel().sqrt().mul(window.parent.player.sucrose.weapon1.gte(20)?getWeaponBonus2():1);
}

function getSucroseBonus3(){
	if(getSucroseLevel().gte(60))return getSucroseLevel().pow(getSucroseLevel().sub(50).div(10)).mul(getWeaponBonus2());
	if(getSucroseLevel().gte(55))return getSucroseLevel().pow(0.75).mul(getWeaponBonus2());
	if(getSucroseLevel().gte(40))return getSucroseLevel().pow(0.5).mul(getWeaponBonus2());
	if(getSucroseLevel().gte(20))return getSucroseLevel().pow(0.25).mul(getWeaponBonus2());
	return getSucroseLevel().pow(0).mul(getWeaponBonus2());
}

function getSucroseBonus4(){
	if(getSucroseLevel().gte(80))return getSucroseLevel().pow(2).div(20).add(getWeaponBonus1());
	if(getSucroseLevel().gte(75))return getSucroseLevel().pow(2).div(35).add(getWeaponBonus1());
	if(getSucroseLevel().gte(70))return getSucroseLevel().pow(2).div(50).add(getWeaponBonus1());
	if(getSucroseLevel().gte(65))return getSucroseLevel().pow(2).div(100).add(getWeaponBonus1());
	if(getSucroseLevel().gte(60))return getSucroseLevel().pow(2).div(150).add(getWeaponBonus1());
	if(getSucroseLevel().gte(50))return getSucroseLevel().pow(2).div(200).add(getWeaponBonus1());
	return getSucroseLevel().add(20).div(20).add(getWeaponBonus1());
}

function getWeaponBonus1(){
	if(window.parent.player.sucrose.weapon1.gte(40))return Decimal.fromDecimal(window.parent.player.sucrose.weapon1).pow(1.7);
	if(window.parent.player.sucrose.weapon1.gte(30))return Decimal.fromDecimal(window.parent.player.sucrose.weapon1).pow(1.6);
	if(window.parent.player.sucrose.weapon1.gte(20))return Decimal.fromDecimal(window.parent.player.sucrose.weapon1).pow(1.5);
	return Decimal.fromDecimal(window.parent.player.sucrose.weapon1).pow(1.5).div(4);
}

function getWeaponBonus2(){
	if(window.parent.player.sucrose.weapon1.gte(10))return Decimal.fromDecimal(window.parent.player.sucrose.weapon1).add(1).pow(Decimal.fromDecimal(window.parent.player.sucrose.weapon1).div(10));
	return Decimal.fromDecimal(window.parent.player.sucrose.weapon1).add(1);
}

var Attack2Time=0;
function getBaseAttack(){
	let ret = getSucroseLevel().pow(1.132).add(7.568).add(Decimal.fromDecimal(window.parent.player.sucrose.weapon1).pow(1.066).mul(2).add(11.132)).mul((Date.now()-Attack2Time<2500)?1.5:1);
	if(window.parent.player.tier01.gte(1)){
		ret=ret.mul(Decimal.fromDecimal(window.parent.v.wscbaseValue.root(4).div(10).add(1)));
	}
	if(window.parent.player.tier01.gte(63)){
		ret=ret.mul(Decimal.fromDecimal(window.parent.player.tier01).log10().add(1));
	}else if(window.parent.player.tier01.gte(2)){
		ret=ret.mul(Decimal.fromDecimal(window.parent.player.tier01).log10().div(2).add(1));
	}
	if(window.parent.player.tier01.gte(25)){
		ret=ret.mul(Decimal.fromDecimal(window.parent.player.PL1pts).add(100).log10().root(6).add(1));
	}
	if(window.parent.player.tier02.gte(1)){
		ret=ret.mul(Decimal.fromDecimal(window.parent.player.tier02).add(1).log10().div(2).add(1));
	}
	return ret;
}


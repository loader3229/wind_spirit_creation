var modInfo={};
function update(){
	document.getElementById("sucrose1").innerHTML = formatWhole(Decimal.fromDecimal(window.parent.player.sucrose.level))+" EXP:"+formatWhole(Decimal.fromDecimal(window.parent.player.sucrose.exp))+"/"+formatWhole(getSucroseLevelRequirement())+" ATK:"+formatWhole(getBaseAttack());
	
	document.getElementById("wp1").innerHTML="等级"+formatWhole(Decimal.fromDecimal(window.parent.player.sucrose.weapon1))+"，升级需要"+formatWhole(weapon1cost())+"扩散点";
	document.getElementById("b1").innerHTML=format(getWeaponBonus1());
	document.getElementById("b2").innerHTML=format(getWeaponBonus2());
	document.getElementById("b2a").innerHTML=(window.parent.player.sucrose.weapon1.gte(20)?1:9);
}

function weapon1cost(){
	if(window.parent.player.sucrose.weapon1.gte(42))return new Decimal("eeeee1000");
	return Decimal.pow(1.5,Decimal.pow(1.01,Decimal.fromDecimal(window.parent.player.sucrose.weapon1)).mul(100).sub(100));
}

function upgrade_weapon1(){
	if(Decimal.fromDecimal(window.parent.player.PL1pts).gte(weapon1cost())){
		window.parent.player.PL1pts=window.parent.player.PL1pts.sub(window.parent.Decimal.fromDecimal(weapon1cost()));
		window.parent.player.sucrose.weapon1=window.parent.player.sucrose.weapon1.add(1);
	}
}

if(window.parent==window){
	document.location.replace('./index.html');
}else{
	setInterval(update,50);
}
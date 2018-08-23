/*==============================================
    DICE ROLLER FUNCTIONS     
    =============================================*/ 	
function rollDice(dicetype){
    var dies = document.getElementById("dies");
    var status = document.getElementById("status");
	var prev = document.getElementById("prev_rolls");
    var d1 = getRandom(dicetype);
	if(dies.innerHTML == d1){
		status.innerHTML ="Rolled the same!";
	}
	else if(d1 == dicetype){
		status.innerHTML = "You just rolled a Natural "+d1+"!";
	}
	else if(d1 == 1){
		status.innerHTML = "You just rolled a 1!";
	}
	else{
		status.innerHTML ="";
	}
	if(dicetype == 100 && Math.floor(d1/10) == d1%10){
		status.innerHTML ="Matched roll!";
	}
    dies.innerHTML = d1;
	previousRolls("prev_rolls_t", d1+"", "d"+dicetype)    
}

function rollDice2d6(){
    var dies = document.getElementById("dies");
    var status = document.getElementById("status");
	var prev = document.getElementById("prev_rolls");
    var dices = new Array();
	dices[0] = getRandom(6); 
	dices[1] = getRandom(6); 
    dices.sort(function(a,b){return b-a});
	if(dies.innerHTML == dices[0]+dices[1]){
		status.innerHTML ="Rolled the same!";
	}
	else if(dices[0]+dices[1] == 12){
		status.innerHTML = "You just rolled a Maximum!";
	}
	else{
		status.innerHTML ="";
	}	
    dies.innerHTML = dices[0]+dices[1];
    status.innerHTML += " [ "+dices[0]+" | "+dices[1]+" ] ";
	previousRolls("prev_rolls_t", dices[0]+dices[1]+"", "2d6")
}

function rollDice2d20(advantage){
    var dies = document.getElementById("dies");
    var status = document.getElementById("status");
	var prev = document.getElementById("prev_rolls");
	var d1 = 0;
    var dices = new Array();
	dices[0] = getRandom(20); 
	dices[1] = getRandom(20); 
    dices.sort(function(a,b){return b-a});
	if(advantage){
		d1 = dices[0];
	}
	else{
		d1 = dices[1];
	}
	if(dies.innerHTML == d1){
		status.innerHTML ="Rolled the same!";
	}
	else if(d1 == 20){
		status.innerHTML = "You just rolled a Natural "+d1+"!";
	}
	else if(d1 == 1){
		status.innerHTML = "You just failed!";
	}
	else{
		status.innerHTML ="";
	}
	dies.innerHTML = d1;
    status.innerHTML += " [ "+dices[0]+" | "+dices[1]+" ]";		
	previousRolls("prev_rolls_t", d1+"", "2d20")
}

function rollDice4d6(){
    var dies = document.getElementById("dies");
    var status = document.getElementById("status");
	var prev = document.getElementById("prev_rolls");
    var dices = new Array();
	dices[0] = getRandom(6); 
	dices[1] = getRandom(6); 
	dices[2] = getRandom(6); 
	dices[3] = getRandom(6);
    dices.sort(function(a,b){return b-a});
    dies.innerHTML = dices[0]+dices[1]+dices[2];
    status.innerHTML = " [ "+dices[0]+" |  "+dices[1]+" | "+dices[2]+" | "+dices[3]+" ]";
	previousRolls("prev_rolls_t", dices[0]+dices[1]+dices[2]+"", "4d6")
}


function previousRolls(tableId, rollValue, diceType){
	var table = document.getElementById(tableId);
	if(table.rows.length == 11){
		table.deleteRow(10);
	}	
	for(var i=1; i<=table.rows.length-1; i++){
		table.rows[i].cells[0].innerHTML = i+1;
	}
	var row = table.insertRow(1);
	row.className = getRowClass();
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	
	// Add some text to the new cells:
	cell1.innerHTML = "1";
	cell2.innerHTML = rollValue; 
	cell3.innerHTML = diceType;
}

var rowClassId = -1;
function getRowClass(){
	var className = "";
	switch(rowClassId){
		case 0:
			className = "warning";
			break;
		case 1:
			className = "info";
			break;
		case 2:
			className = "success";
			break;
		case 3:
			className = "danger";
			rowClassId = -1;
			break;
		default:
			className = "danger";
	}
	rowClassId++;
	return className;
}

/*==============================================
    FATE FUNCTIONS     
    =============================================*/ 
function Fate(){
	var dies = document.getElementById("dies");
    var status = document.getElementById("status");
	var prev = document.getElementById("prev_rolls");
    var dices = new Array();
	dices[0] = getRandom(3) - 2;
	dices[1] = getRandom(3) - 2;
	dices[2] = getRandom(3) - 2;
	dices[3] = getRandom(3) - 2;
	dices.sort(function(a,b){return b-a});
    dies.innerHTML = dices[0]+dices[1]+dices[2]+dices[3];
    status.innerHTML = FateParse(dices[0])+" "+FateParse(dices[1])+" "+FateParse(dices[2])+" "+FateParse(dices[3]);
	previousRolls("prev_rolls_t", dices[0]+dices[1]+dices[2]+dices[3]+"", FateParse(dices[0])+" "+FateParse(dices[1])+" "+FateParse(dices[2])+" "+FateParse(dices[3]));
}

function FateParse(value){
	if(value == 1){
		return "<i class=\"whhg icon-calcplus\"></i>";
		//return "+";
	}
	else if (value == -1)
	{
		return "<i class=\"whhg icon-calcminus\"></i>";
		//return "-";
	}
	else{
		return "<i class=\"whhg icon-stop\"></i>";
		//return "0";
	}
}

/*==============================================
    DIYW DICE ROLLER FUNCTIONS     
    =============================================*/ 
function rollDices(){
    var r_n = parseInt(document.getElementById("roll_num").value, 10);
	if(isNaN(r_n)){
		r_n = 1;
	}
    var d_n = parseInt(document.getElementById("dice_num").value, 10);
	if(isNaN(d_n)){
		d_n = 1;
	}
    var d_t = parseInt(document.getElementById("dice_type").value, 10);
	if(isNaN(d_t)){
		d_t = 0;
	}
    var d_m = parseInt(document.getElementById("dice_mod").value, 10);
	if(isNaN(d_m)){
		d_m = 0;
	}
    var r_m = parseInt(document.getElementById("roll_mod").value, 10);
	if(isNaN(r_m)){
		r_m = 0;
	}
    var total = 0;
    for(var i = 0;i < r_n; i++){
		for(var j= 0; j< d_n; j++){
			total += getRandom(d_t);
		}
        total += d_m;	
    } 

    total += r_m;  
	if(isNaN(total)){
		total = 0;
	}
    d_mult.innerHTML = total;
}

function rollDicesMobile(){
	var sr = document.getElementById("status_rolls");
	var d_n = parseInt(document.getElementById("dice_num").value, 10);
	if(isNaN(d_n)){
		d_n = 1;
	}
    var d_t = parseInt(document.getElementById("dice_type").value, 10);
	if(isNaN(d_t)){
		d_t = 0;
	}
    var total = 0; 
	var current_roll = 0;
	var txt = "["
	for(var j= 0; j< d_n; j++){
		if(d_t > 0) {
			current_roll = getRandom(d_t);
		}
		else if(d_t == 0){
			current_roll = 0;
		}
		else {
			current_roll = -getRandom(-d_t);
		}
		total += current_roll;
		txt += current_roll+"; "; 
	}
	if(isNaN(total)){
		total = 0;
	}	
	txt = txt.slice(0, -2);//.substring(0, txt.length - 2);
	txt += "]";
	if(d_n < 0){
		txt = "Error. Negative number of dices is surreal."
		total = 0;
		document.getElementById("dice_num").innerHTML = 0;
	}
	sr.innerHTML = txt;
    d_mob.innerHTML = total;
}

function diceNum(plus){
	var b = parseInt(document.getElementById("dice_num").value, 10);
	if(plus == 1){
		b = b+1;
	}
	else{
		b = b-1;
	}
	document.getElementById("dice_num").value = b;	
}

function diceType(plus){
	var b = parseInt(document.getElementById("dice_type").value, 10);
	if(plus == 1){
		b = b+1;
	}
	else{
		b = b-1;
	}
	document.getElementById("dice_type").value = b;	
}

function Dnd(){
    var dn = parseInt(document.getElementById("dnd_dn").value, 10);
    var dm = parseInt(document.getElementById("dnd_dm").value, 10);
    var limit = parseInt(document.getElementById("dnd_l").value, 10);
    var s2 = document.getElementById("dnd_s2");
    var s3 = document.getElementById("dnd_s3");
    s2.innerHTML="";
    s3.innerHTML=""; 	
    var current_roll = 0 ;
    var siker = 0;
    for(var i = 0;i < dn; i++){
		if(document.getElementById("dnd_norm").checked){
			current_roll = Math.floor(Math.random() * 20) + 1;
		}
		else{
			var dices = new Array();
			dices[0] = getRandom(20); 
			dices[1] = getRandom(20);
			dices.sort(function(a,b){return b-a});
			if(document.getElementById("dnd_adv").checked){
				current_roll = dices[0];
			}
			else{
				current_roll = dices[1];
			}
		}
       	s2.innerHTML += current_roll+dm+"; " 
		if(current_roll + dm >= limit){
			siker++;
		}	
    }
    s3.innerHTML = "Number of successes:    "+siker;
}

function Brust(){
    var b = parseInt(document.getElementById("brust").value, 10);
    var hatar = parseInt(document.getElementById("hatar").value, 10);
    var status2 = document.getElementById("status2");
    var status3 = document.getElementById("status3");
    status2.innerHTML="";
    status3.innerHTML=""; 	
    var current_roll = 0 ;
    var siker = 0;
    var balsiker = 0;
    for(var i = 0;i < b; i++){
		current_roll = getRandom(100);;
       	status2.innerHTML += current_roll+"; " 
		if(current_roll <= hatar){
			siker++;
		}
		if(current_roll == 100){
			balsiker ++;
		}	
    }
    status3.innerHTML = "Number of successes: "+siker+ "<br>Number of failures:    "+balsiker;
}

function SR(){
	if(document.getElementById("sr_5th").checked){
		SR_5e()
	}
	else{
		SR_3e()
	}
}

function SR_(plus){
	var b = parseInt(document.getElementById("sr").value, 10);
	if(plus == 1){
		b = b+1;
	}
	else{
		b = b-1;
	}
	document.getElementById("sr").value = b;
}

function SR_3e(){
    var b = parseInt(document.getElementById("sr").value, 10);
    var csz = parseInt(document.getElementById("celszam").value, 10);
    var status_sr1 = document.getElementById("status_sr1");
    var status_sr2 = document.getElementById("status_sr2");
    status_sr1.innerHTML="";
    status_sr2.innerHTML="";
    var current_roll = 0 ;
    var siker = 0;
    var balsiker = 0;
    var total = 0;
    for(var i = 0;i < b; i++){
		total = 0;
		do{
			current_roll = getRandom(6);
			total+=current_roll;
		}
		while(current_roll == 6)
       	status_sr1.innerHTML += total+"; "; 
		if(total >= csz){
			siker++;
		}
		if(total == 1){
			balsiker ++;
		}	
    }
    status_sr2.innerHTML = "Number of successes: "+siker;
    if(balsiker == b){
		status_sr2.innerHTML = "Total failure!";
	}    	
}

function SR_5e(){
    var b = parseInt(document.getElementById("sr").value, 10);
    var csz = parseInt(document.getElementById("celszam").value, 10);
    var status_sr1 = document.getElementById("status_sr1");
    var status_sr2 = document.getElementById("status_sr2");
    status_sr1.innerHTML="";
    status_sr2.innerHTML="";
    var current_roll = 0 ;
    var siker = 0;
    var balsiker = 0;
    var total = 0;
    for(var i = 0;i < b; i++){
		current_roll = getRandom(6);
		if(current_roll >= csz){
			siker++;
		}
		if(current_roll == 1){
			balsiker ++;
		}
		status_sr1.innerHTML += current_roll+"; ";
	} 
    status_sr2.innerHTML = "Number of hits: "+siker;
    if(balsiker >= (b/2)){
		if(siker == 0){
		status_sr2.innerHTML = "Critical Glitch!";
		}
		else{
		status_sr2.innerHTML = "Glitch!";
		}
	}    	
}

function WoD_(plus){
	var b = parseInt(document.getElementById("vp").value, 10);
	if(plus == 1){
		b = b+1;
	}
	else{
		b = b-1;
	}
	document.getElementById("vp").value = b;
}

function Vampire(){
    var b = parseInt(document.getElementById("vp").value, 10);
    var csz = parseInt(document.getElementById("vp_celszam").value, 10);
    var status_vp1 = document.getElementById("status_vp1");
    var status_vp2 = document.getElementById("status_vp2");
    status_vp1.innerHTML="";
    status_vp2.innerHTML="";
    var current_roll = 0 ;
    var siker = 0;
    var balsiker = 0;
	if(csz > 10){
		balsiker = csz-10;
		csz = 10;
	}	
    for(var i = 0;i < b; i++){
		current_roll = getRandom(10);
		if(current_roll >= csz){
			siker++;
		}
		else if(current_roll == 1){
			balsiker ++;
		}
		status_vp1.innerHTML += current_roll+"; "; 
	}       
    status_vp2.innerHTML = "Number of successes: "+(siker-balsiker);
    if(balsiker > b-1){
		status_vp2.innerHTML = "Total failure!";
	}    	
}

function getQuResult(qubits){
	return jsqubits(qubits)
		.hadamard(jsqubits.ALL)
		.measure(jsqubits.ALL)
		.result;
}

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

// Returns quantum random number between 1 and the number
function getRandom(num){
	var qubits = dec2bin(num);
	var res = 0;
	do {
		res = getQuResult(qubits) + 1;
	} while (res > num)
	return res
}
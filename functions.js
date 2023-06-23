// TODO :
// When undizzy is full damage scaling start at 0.55

function comboDamageCalculation(arrayCombo, ratio) {
    res = 0;
    i = 0;
    arrayCombo.forEach(function(item){
        console.log(item);
        res += moveDamageCalculation(item, i, ratio);
        i++;
    });
    // return Math.round(res);
    return res;
}

function moveDamageCalculation(move, position, ratio) {
    baseDamage = move.damage;
    scaling = scalingCalculation(move, position, ratio);
    damage = baseDamage * scaling;
    damage = damage * ratio;
    // damage = Math.round(damage);

    console.log(damage);
    return damage;
}

function scalingCalculation(move, position) {
    scalingTmp = theoricScaling(move, position);
    scaling = scalingTmp;
    baseDamage = move.damage;

    if (scalingTmp < 0.20) scaling = 0.20;
    if ((baseDamage >= 1000) && (scalingTmp < 0.275)){
        scaling = 0.275;
    }

    if (move.name == "Fenrir9" && scalingTmp < 0.34) {
        scaling = 0.34;
    }
    
    console.log(scaling);
        
    return scaling;
}

function theoricScaling(move, position) {
    if (position < 1) {
        return 1;
    }

    if (position < 3 && !previousMoveProperty(position).includes("isGrab")) {
        return 1;
    }

    if (move.properties.includes("isGrab")) {
        return theoricScaling(move, position-1);
    }

    if (move.properties.includes("is50%DamageScaling")) {
        return theoricScaling(move, position-1)*(0.5);
    }

    scaling = theoricScaling(move, position-1)*(0.875);

    return scaling;
}

function previousMoveProperty(position) {
    if (position < 1) {
        return [];
    }
    return COMBO[position-1].properties;
}

function computeInput() {

    let character = document.getElementById("character").value;
    let ratio = document.getElementById("ratio").value;

    let inputList = document.getElementById("input-list").value;
    inputs = inputList.split(' ');

    let combo = [];
    inputs.forEach(element => combo.push(eval(character).moves[element]));

    COMBO = combo;

    // console.log(combo);
    // console.log(comboDamageCalculation(combo, 1));

    document.getElementById('result').innerHTML = comboDamageCalculation(combo, ratio);

    // jHP jHK sHP jHP jHK jLK jHP jHK cLK sHP jLP jHP jHK
    
}

// combo = [
//     filia.moves["jHP"],
//     filia.moves["jHK"],
//     filia.moves["sHP"],
//     filia.moves["jHP"],
//     filia.moves["jHK"],
//     filia.moves["jLK"],
//     filia.moves["jHP"],
//     filia.moves["jHK"],
//     filia.moves["cLK"],
//     filia.moves["sHP"],
//     filia.moves["jLP"],
//     filia.moves["jHP"],
//     filia.moves["jHK"],
// ];

// console.log(comboDamageCalculation(combo, 1));




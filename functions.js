// TODO :
// When undizzy is full damage scaling start at 0.55

function comboDamageCalculation(arrayCombo, ratio)
{
    res = 0;
    i = 0;
    arrayCombo.forEach(function(item){
        console.log(item);
        res += moveDamageCalculation(item, i, ratio);
        i++;
    });
    return res;
}

function moveDamageCalculation(move, position, ratio)
{
    baseDamage = move.damage;
    scaling = scalingCalculation(move, position, ratio);
    damage = baseDamage * scaling;
    damage = damage * ratio;
    damage = Math.floor(damage);

    console.log(damage);
    return damage;
}

function scalingCalculation(move, position, ratio)
{
    scalingTmp = theoricScaling(move, position);
    scaling = scalingTmp;
    baseDamage = move.damage;

    if (scalingTmp < 0.20) scaling = 0.20;
    if ((baseDamage >= 1000) && (scalingTmp < 0.275)){
        scaling = 0.275;
    }
        
    return scaling;
}

function theoricScaling(move, position)
{
    if (position < 3) {
        return 1;
    } 

    return scaling = theoricScaling(move, position-1)*(0.875);
}

combo = [
    filia.moves["jHP"],
    filia.moves["jHK"],
    filia.moves["sHP"],
    filia.moves["jHP"],
    filia.moves["jHK"],
    filia.moves["jLK"],
    filia.moves["jHP"],
    filia.moves["jHK"],
    filia.moves["cLK"],
    filia.moves["sHP"],
    filia.moves["jLP"],
    filia.moves["jHP"],
    filia.moves["jHK"],
];

console.log(combo);
console.log(comboDamageCalculation(combo, 1));




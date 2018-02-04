var metalls = {isDust:true, isIngot:true, isPlate:true, isNugget:true, isSmallDust:true, isTinyDust:false, isBolt:true, isLittleOre:false, isModule:true, generateRecipes:true, isOre:false}
var metalls_non_module = {isDust:true, isIngot:true, isPlate:true, isNugget:true, isSmallDust:true, isTinyDust:false, isBolt:false, isLittleOre:false, isModule:false, generateRecipes:true, isOre:false}

var stones = {isDust:true, isIngot:false, isPlate:false, isNugget:false, isSmallDust:true, isTinyDust:false, isBolt:false, isLittleOre:true, isModule:false, generateRecipes:true, isOre:false}

var iron = {isDust:true, isIngot:false, isPlate:true, isNugget:true, isSmallDust:true, isTinyDust:false, isBolt:true, isLittleOre:true, isModule:true, generateRecipes:true, isOre:false}
var gold = {isDust:true, isIngot:false, isPlate:true, isNugget:false, isSmallDust:true, isTinyDust:false, isBolt:false, isLittleOre:true, isModule:false, generateRecipes:true, isOre:false}

ATMat.MaterialRegister("Stone", stones)
ATMat.MaterialRegister("RedGranit", stones)
ATMat.MaterialRegister("BlackGranit", stones)

ATMat.MaterialRegister("Steel", metalls, {temp:1600, long:240})
ATMat.MaterialRegister("Bronze", metalls, {temp:1000, long:30})
ATMat.MaterialRegister("Chrome", metalls, {temp:1900,  long:300})
ATMat.MaterialRegister("Aluminium", metalls, {temp:600, long:20})
ATMat.MaterialRegister("Titanium",  metalls, {temp:1600, long:240})
ATMat.MaterialRegister("Stainless", metalls, {temp:1800, long:260})
ATMat.MaterialRegister("Volfram", metalls, {temp:3400, long:400}) 

ATMat.MaterialRegister("Copper", metalls_non_module, {temp:1000, long:30})
ATMat.MaterialRegister("Tin", metalls_non_module, {temp:200, long:10})
ATMat.MaterialRegister("Nikel",  metalls_non_module, {temp:1400, long:60})
ATMat.MaterialRegister("Antimony", metalls_non_module, {temp:1600, long:30})
ATMat.MaterialRegister("Silver", metalls_non_module, {temp:900, long:30})
ATMat.MaterialRegister("Lead", metalls_non_module, {temp:300, long:10})

ATMat.MaterialRegister("Iron", iron, {temp:1000, long:100})
ATMat.MaterialRegister("Gold", gold, {temp:1000, long:30})
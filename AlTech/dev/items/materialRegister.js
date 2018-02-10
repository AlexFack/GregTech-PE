var metalls =                      {isDust:true, isIngot:true, isPlate:true, isNugget:true, isSmallDust:true, isBolt:true, isModule:true, generateRecipes:true}
var metalls_non_module = {isDust:true, isIngot:true, isPlate:true, isNugget:true, isSmallDust:true, generateRecipes:true}
var metalls_with_ore =       {isDust:true, isIngot:true, isPlate:true, isNugget:true, isSmallDust:true, isLittleOre:true, generateRecipes:true}

var stones = {isDust:true, isSmallDust:true, isLittleOre:true, generateRecipes:true}

var iron = {isDust:true, isPlate:true, isNugget:true, isSmallDust:true, isBolt:true, isLittleOre:true, isModule:true, generateRecipes:true}
var gold = {isDust:true, isPlate:true, isNugget:false, isSmallDust:true, isLittleOre:true, generateRecipes:true}

var gems = {idDust:true, isDust:true, isSmallDust:true, isGem:true, generateRecipes:true}

ATMat.MaterialRegister("Coal", {isDust:true})
ATMat.MaterialRegister("Redstone", {isDust:true})
ATMat.MaterialRegister("Lapis", {isDust:true})

ATMat.MaterialRegister("Stone", stones)
ATMat.MaterialRegister("RedGranit", stones)
ATMat.MaterialRegister("BlackGranit", stones)

ATMat.MaterialRegister("Steel", metalls, {temp:steelTemp, long:steelLong})
ATMat.MaterialRegister("Bronze", metalls, {temp:1000, long:30})
ATMat.MaterialRegister("Chrome", metalls, {temp:1900,  long:300})
ATMat.MaterialRegister("Aluminium", metalls, {temp:600, long:20})
ATMat.MaterialRegister("Titanium",  metalls, {temp:1600, long:240})
ATMat.MaterialRegister("Stainless", metalls, {temp:1800, long:260})
ATMat.MaterialRegister("Volfram", metalls, {temp:3400, long:400}) 

ATMat.MaterialRegister("Copper", metalls_with_ore, {temp:copperTemp, long:copperLong})
ATMat.MaterialRegister("Tin", metalls_with_ore, {temp:tinTemp, long:tinLong})

ATMat.MaterialRegister("Nikel",  metalls_non_module, {temp:1400, long:60})
ATMat.MaterialRegister("Antimony", metalls_non_module, {temp:1600, long:30})
ATMat.MaterialRegister("Silver", metalls_non_module, {temp:900, long:30})
ATMat.MaterialRegister("Lead", metalls_non_module, {temp:300, long:10})

ATMat.MaterialRegister("Iron", iron, {temp:ironTemp, long:ironLong})
ATMat.MaterialRegister("Gold", gold, {temp:goldTemp, long:goldLong})

ATMat.MaterialRegister("Diamond", gems, {temp:4000, long:100})
ATMat.MaterialRegister("Ruby", gems, {temp:2000, long:100})
ATMat.MaterialRegister("Saphire", gems, {temp:2300, long:100})
ATMat.MaterialRegister("Emerald", gems, {temp:1400, long:100})

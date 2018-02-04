var metalls1 = {isDust:true, isIngot:true, isPlate:true, isNugget:false, isSmallDust:true, isTinyDust:false, isBolt:true, isLittleOre:false, isModule:true, generateRecipes:true, isOre:false}
var metalls2 = {isDust:true, isIngot:true, isPlate:true, isNugget:false, isSmallDust:true, isTinyDust:false, isBolt:false, isLittleOre:false, isModule:true, generateRecipes:true, isOre:false}
var metalls3 = {isDust:true, isIngot:true, isPlate:true, isNugget:false, isSmallDust:true, isTinyDust:false, isBolt:false, isLittleOre:true, isModule:false, generateRecipes:true, isOre:false}
var stones = {isDust:true, isIngot:false, isPlate:false, isNugget:false, isSmallDust:true, isTinyDust:false, isBolt:false, isLittleOre:true, isModule:false, generateRecipes:true, isOre:false}
var iron = {isDust:true, isIngot:false, isPlate:true, isNugget:true, isSmallDust:true, isTinyDust:false, isBolt:true, isLittleOre:true, isModule:true, generateRecipes:true, isOre:false}
var gold =
var nikel =

ATMat.MaterialRegister("Stone", stones)
ATMat.MaterialRegister("RedGranit", stones)
ATMat.MaterialRegister("BlackGranit", stones)

ATMat.MaterialRegister("Steel", metalls1, 1600, 240)
ATMat.MaterialRegister("Bronze", metalls1, 1000, 30)

ATMat.MaterialRegister("Chrome", metalls2, 1900,  300)
ATMat.MaterialRegister("Aluminium", metalls2, 600, 20)
ATMat.MaterialRegister("Titanium",  metalls2, 1600, 240)
ATMat.MaterialRegister("Stainless", metalls2, 1800, 260)
ATMat.MaterialRegister("Volfram", metalls2, 3400, 400) 

ATMat.MaterialRegister("Copper", metalls3, 1000, 30)
ATMat.MaterialRegister("Tin", metalls3, 200, 10)

ATMat.MaterialRegister("Iron", iron, 1000, 100)
ATMat.MaterialRegister("Gold", {isDust:true, isIngot:false, isPlate:true, isNugget:false, isSmallDust:true, isTinyDust:false, isBolt:false, isLittleOre:true, isModule:false, generateRecipes:true, isOre:false}, 1000, 30)
ATMat.MaterialRegister("Nikel",  {isDust:true, isIngot:true, isPlate:true, isNugget:false, isSmallDust:true, isTinyDust:false, isBolt:false, isLittleOre:false, isModule:false, generateRecipes:true, isOre:false}, 1400, 60)
ModAPI.registerAPI("GTCore", {
	GT_MultiBlock: GT_MultiBlock,
    GT_Recipe : GT_Recipe,
    GT_Worldgen : GT_Worldgen,
    GT_Material : GT_Material,
    
    GT_Tool: GT_Tool,
    
    DeleteOre:DeleteOre,
    
    CreateHelmetRecipe:CreateHelmetRecipe,
    CreateChestplateRecipe:CreateChestplateRecipe,
    CreateLeggingsRecipe:CreateLeggingsRecipe,
    CreateBootsRecipe:CreateBootsRecipe,

    CreatePickaxeRecipe:CreatePickaxeRecipe,
    CreateAxeRecipe:CreateAxeRecipe,
    CreateHoeRecipe:CreateHoeRecipe,
    CreateSwordRecipe:CreateSwordRecipe,
    CreateHelmetRecipe:CreateHelmetRecipe,
    
    requireGlobal: function (command) {
        return eval(command);
    }
});
Logger.Log("GregTechAPI shared", "API");
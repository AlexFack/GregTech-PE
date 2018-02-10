//ores
var BLACK_STONE = Block.createSpecialType({
	base: 1,
	destroytime: 5,
	opaque: true,
	solid: true,
}, "ore");

var RED_STONE = Block.createSpecialType({
	base: 1,
	destroytime: 4,
	opaque: true,
	solid: true,
}, "ore");

IDRegistry.genBlockID("blackstone");
Block.createBlock("blackstone", [
	{name: "tin_ore", texture: [["black_stone", 0]], inCreative: true}
], BLACK_STONE );
ToolAPI.registerBlockMaterial(BlockID.blackstone, "stone");

IDRegistry.genBlockID("blackcobblestone");
Block.createBlock("blackcobblestone", [
	{name: "tin_ore", texture: [["black_cobblestone", 0]], inCreative: true}
], BLACK_STONE );
ToolAPI.registerBlockMaterial(BlockID.blackcobblestone, "stone");

IDRegistry.genBlockID("redstone");
Block.createBlock("redstone", [
	{name: "tin_ore", texture: [["red_stone", 0]], inCreative: true}
], RED_STONE );
ToolAPI.registerBlockMaterial(BlockID.redstone, "stone");

IDRegistry.genBlockID("redcobblestone");
Block.createBlock("redcobblestone", [
	{name: "tin_ore", texture: [["red_cobblestone", 0]], inCreative: true}
], RED_STONE );
ToolAPI.registerBlockMaterial(BlockID.redcobblestone, "stone");

    ATMat.OreRegister("Tetrahedrite", [["Copper", 1],  ["Chrome", 0], ["Nikel", 0], ["Gold", 0]], ["Stone", "RedGranite", "BlackGranite", "Nether", "End"], true)
    ATMat.OreRegister("Copper", [["Copper", 2],  ["Iron", 1], ["Nikel", 0], ["Stone", 2]], ["Stone"], true)
    ATMat.OreRegister("Tin", [["Tin", 2],  ["Nikel", 1], ["Iron", 0]], ["Stone", "RedGranite", "BlackGranite"], true)
    ATMat.OreRegister("Iron", [["Iron", 2], ["Nikel", 1], ["Stone", 2]], ["Stone"], true)
    ATMat.OreRegister("Lead", [["Lead", 2], ["Iron", 0], ["Tin", 0]], ["Stone", "End"], true)
    ATMat.OreRegister("Galena", [["Silver", 1], ["Lead", 1], ["Stone", 2]], ["Stone"], true)
    ATMat.OreRegister("Gold", [["Gold", 2], ["Silver", 1], ["Lead", 1]], ["Stone", "RedGranite", "BlackGranite", "Nether", "End"], true)
    ATMat.OreRegister("Coal", [], ["Stone"], true)
    ATMat.OreRegister("Bauxite", [["Titanium", 0], ["Aluminium", 1], ["Nikel", 1]], ["Stone"], true)    
    ATMat.OreRegister("Saphire", [["Saphire",1], ["Lapis", 2]], ["Stone", "RedGranite", "BlackGranite"], true)
    ATMat.OreRegister("Ruby", [["Ruby", 2], ["Ruby", 1], ["Chrome", 0]], ["Stone", "RedGranite", "BlackGranite"], true)
    ATMat.OreRegister("Emerald", [["Emerald", 2], ["Emerald", 1]], ["RedGranite", "BlackGranite", "End"], true)
    ATMat.OreRegister("Diamond", [["Diamond", 2], ["Diamond", 1], ["Stone", 2]], ["Stone"], true)
    ATMat.OreRegister("Redstone", [], ["Stone"], true)
    ATMat.OreRegister("Magnetite", [["Iron", 1], ["Gold", 0], ["Magnetite", 2]], ["Stone", "BlackGranite"], true)
    ATMat.OreRegister("Volfram", [["Volfram", 2], ["Silver", 1], ["Lead", 1]], ["Stone", "BlackGranite"], true)
    ATMat.OreRegister("Lapis", [["Lapis", 2], ["Saphire", 0]], ["BlackGranite", "RedGranite", "End"], true)
    
//GenerateChunk, GenerateNetherChunk, GenerateEndChunk
var generateChance = function(c){
	return c
}

ATGen.genBreed(BlockID.blackstone, 0, 16, 5, 16, 32, -1, [
[BlockID.oreMagnetiteBlackGranite, BlockID.oreVolframBlackGranite, BlockID.oreVolframBlackGranite, BlockID.oreMagnetiteBlackGranite],
[BlockID.oreTetrahedriteBlackGranite, BlockID.oreTinBlackGranite, BlockID.oreTetrahedriteBlackGranite, BlockID.oreTinBlackGranite],
[BlockID.oreTetrahedriteBlackGranite, BlockID.oreGoldBlackGranite, BlockID.oreTinBlackGranite, BlockID.oreTetrahedriteBlackGranite],
])

ATGen.genBreed(BlockID.redstone, 0, 16, 5, 16, 32, -1, [
[BlockID.oreLapisRedGranite, BlockID.oreSaphireRedGranite, BlockID.oreLapisRedGranite, BlockID.oreSaphireRedGranite],
[BlockID.oreTetrahedriteRedGranite, BlockID.oreTinRedGranite, BlockID.oreTetrahedriteRedGranite, BlockID.oreTinRedGranite],
])

var tileTemplate = [1, 14, 15, 16, 56, 73, 74, 129, 21]
//var tileTemplate = [0]

ATGen.LargeOreDeposite(BlockID.oreMagnetiteStone, BlockID.oreIronStone, BlockID.oreIronStone, BlockID.oreMagnetiteStone, (15), tileTemplate, 48, 64, "GenerateChunk", {x:25, z:25}, 25, 1)
ATGen.LargeOreDeposite(BlockID.oreMagnetiteStone, BlockID.oreCopperStone, BlockID.oreTetrahedriteStone, BlockID.oreTinStone, (15), tileTemplate, 48, 64, "GenerateChunk", {x:25, z:25}, 25, 1)
ATGen.LargeOreDeposite(BlockID.oreMagnetiteStone, BlockID.oreGoldStone, BlockID.oreGoldStone, BlockID.oreMagnetiteStone, (5), tileTemplate, 20, 40, "GenerateChunk", {x:25, z:25}, 25, 1)
ATGen.LargeOreDeposite(BlockID.oreCoalStone, BlockID.oreCoalStone, BlockID.oreCoalStone, BlockID.oreCoalStone, (15), tileTemplate, 48, 64, "GenerateChunk", {x:25, z:25}, 25, 1)
ATGen.LargeOreDeposite(BlockID.oreTinStone, BlockID.oreSilverStone, BlockID.oreLeadStone, BlockID.oreGalenaStone, (15), tileTemplate, 48, 64, "GenerateChunk", {x:25, z:25}, 25, 1)
ATGen.LargeOreDeposite(BlockID.oreBauxiteStone, BlockID.oreIronStone, BlockID.oreIronStone, BlockID.oreBauxiteStone, (10), tileTemplate, 32, 40, "GenerateChunk", {x:25, z:25}, 25, 1)

ATGen.LargeOreDeposite(BlockID.oreCoalStone, BlockID.oreDiamondStone, BlockID.oreDiamondStone, BlockID.oreCoalStone, (5), tileTemplate, 10, 20, "GenerateChunk", {x:15, z:15}, 25, 1)
ATGen.LargeOreDeposite(BlockID.oreRedstoneStone, BlockID.oreRubyStone, BlockID.oreRubyStone, BlockID.oreRedstoneStone, (5), tileTemplate, 10, 20, "GenerateChunk", {x:15, z:15}, 25, 1)
ATGen.LargeOreDeposite(BlockID.oreSaphireStone, BlockID.oreSaphireStone, BlockID.oreSaphireStone, BlockID.oreSaphireStone, (5), tileTemplate, 10, 20, "GenerateChunk", {x:5, z:5}, 25, 1)
ATGen.LargeOreDeposite(BlockID.oreRedstoneStone, BlockID.oreRedstoneStone, BlockID.oreRedstoneStone, BlockID.oreRedstoneStone, (15), tileTemplate, 10, 20, "GenerateChunk", {x:15, z:15}, 25, 1)

ATGen.LargeOreDeposite(BlockID.oreGoldNether, BlockID.oreGoldNether, BlockID.oreGoldNether, BlockID.oreGoldNether, (10), [87], 0, 128, "GenerateNetherChunk", {x:10, z:10}, 33, 2)
ATGen.LargeOreDeposite(BlockID.oreMagnetiteStone, BlockID.oreCopperStone, BlockID.oreTetrahedriteStone, BlockID.oreTinStone, (20), tileTemplate, 0, 128, "GenerateNetherChunk", {x:10, z:10}, 33, 2)

ATGen.LargeOreDeposite(BlockID.oreLapisEnd, BlockID.oreLapisEnd, BlockID.oreEmeraldEnd, BlockID.oreLapisEnd, (20), [121], 32, 64, "GenerateEndChunk", {x:20, z:20}, 25, 1)
ATGen.LargeOreDeposite(BlockID.oreLeadEnd, BlockID.oreGoldEnd, BlockID.oreGoldEnd, BlockID.oreTetrahedriteEnd, (20), [121], 32, 64, "GenerateEndChunk", {x:20, z:20}, 25, 1)

//drop ores
Block.registerDropFunctionForID(14, function(coords, id, data, level){ 
    if(level>=1){
        return [[4, 1, 0]];
    }
       return []
    });
Block.registerDropFunctionForID(15, function(coords, id, data, level){ 
    if(level>=1){
        return [[4, 1, 0]];
    }
       return []
    });
Block.registerDropFunctionForID(16, function(coords, id, data, level){ 
    if(level>=1){
        return [[4, 1, 0]];
    }
       return []
    });
Block.registerDropFunctionForID(56, function(coords, id, data, level){ 
    if(level>=1){
        return [[4, 1, 0]];
    }
       return []
    });
Block.registerDropFunctionForID(73, function(coords, id, data, level){ 
    if(level>=1){
        return [[4, 1, 0]];
    }
       return []
    });
Block.registerDropFunctionForID(74, function(coords, id, data, level){ 
    if(level>=1){
        return [[4, 1, 0]];
    }
       return []
    });
Block.registerDropFunctionForID(129, function(coords, id, data, level){ 
    if(level>=1){
        return [[4, 1, 0]];
    }
       return []
    });
Block.registerDropFunctionForID(153, function(coords, id, data, level){ 
    if(level>=1){
        return [[87, 1, 0]];
    }
       return []
    });
Block.registerDropFunctionForID(21, function(coords, id, data, level){ 
    if(level>=1){
        return [[4, 1, 0]];
    }
       return []
    });
Block.registerDropFunction("oreCopper", function(coords, id, data, level){ 
    if(level>=2){
        return [[litcopp, 1, 0], [litst, 3, 0]];
    }
       return []
    });
Block.registerDropFunction("oreTin", function(coords, id, data, level){ 
    if(level>=2){
        return [[littin, 1, 0], [litst, 3, 0]];
    }
       return []
    });
Block.registerDropFunction("blackstone", function(coords, id, data, level){ 
    if(level>=4){
        return [[BlockID.blackcobblestone, 1, 0]];
    }
       return []
    });
Block.registerDropFunction("redstone", function(coords, id, data, level){ 
    if(level>=3){
        return [[BlockID.redcobblestone, 1, 0]];
    }
       return []
    });
Block.registerDropFunctionForID(17, function(coords, id, data, level){ 
        return [[5, 2, data]];
    });
Block.registerDropFunctionForID(162, function(coords, id, data, level){ 
        return [[5, 2, data+4]];
    })
Block.registerDropFunction("oreCoalStone", function(coords, id, data, level){ 
    if(level>=1){
        return [[263, 1, 0], [litst, 3, 0]];
    }
       return []
    })
Block.registerDropFunction("oreRedstoneStone", function(coords, id, data, level){ 
    if(level>=1){
        return [[331, random(3, 5), 0], [ItemID.smallDustRuby, 1, 0], [litst, 1, 0]];
    }
       return []
    })
Block.registerDropFunction(1, function(coords, id, data, level){ 
    if(level>=1&&data==0&&rollPercentage(5)){
        return [[litst, 4, 0]];
    }else if(level>=1&&data==0){
    	//Game.message(data)
    	return[[4, 1, 0]]
    }
    if(level>=1){
    	//Game.message(data)
    	return[[id, 1, data]]
    }
    return []
    })
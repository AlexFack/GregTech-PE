//ores
var BLOCK_TYPE_ORE = Block.createSpecialType({
	base: 1,
	destroytime: 2,
	opaque: true,
}, "ore");

var BLACK_STONE = Block.createSpecialType({
	base: 1,
	destroytime: 3,
	opaque: true,
}, "stone");

var RED_STONE = Block.createSpecialType({
	base: 1,
	destroytime: 2,
	opaque: true,
}, "stone");

IDRegistry.genBlockID("oreCopper");
Block.createBlock("oreCopper", [
	{name: "copper_ore", texture: [["ore_copper", 0]], inCreative: true}
], BLOCK_TYPE_ORE );
ToolAPI.registerBlockMaterial(BlockID.oreCopper, "stone");

IDRegistry.genBlockID("oreTin");
Block.createBlock("oreTin", [
	{name: "tin_ore", texture: [["ore_tin", 0]], inCreative: true}
], BLOCK_TYPE_ORE );
ToolAPI.registerBlockMaterial(BlockID.oreTin, "stone");

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

//drop ores
Callback.addCallback("PostLoaded", function(){
    Block.registerDropFunctionForID(14, function(coords, id, data, level){ 
    if(level>2){
        return [[litg, 1, 0], [litst, 3, 0]];
    }
       return []
    });

Block.registerDropFunctionForID(15, function(coords, id, data, level){ 
    if(level>1){
        return [[litir, 1, 0], [litst, 3, 0]];
    }
       return []
    });
Block.registerDropFunctionForID(16, function(coords, id, data, level){ 
    if(level>=1){
        return [[litst, 3, 0], [263, 1, 0]];
    }
       return []
    });
Block.registerDropFunction("oreCopper", function(coords, id, data, level){ 
    if(level>1){
        return [[litcopp, 1, 0], [litst, 3, 0]];
    }
       return []
    });
Block.registerDropFunction("oreTin", function(coords, id, data, level){ 
    if(level>1){
        return [[littin, 1, 0], [litst, 3, 0]];
    }
       return []
    });
Block.registerDropFunction("blackstone", function(coords, id, data, level){ 
    if(level>2){
        return [[BlockID.blackcobblestone, 1, 0]];
    }
       return []
    });
Block.registerDropFunction("redstone", function(coords, id, data, level){ 
    if(level>1){
        return [[BlockID.redcobblestone, 1, 0]];
    }
       return []
    });
Block.registerDropFunctionForID(17, function(coords, id, data, level){ 
        return [[5, 2, data]];
    });
Block.registerDropFunctionForID(162, function(coords, id, data, level){ 
        return [[5, 2, data+4]];
    });
});

if(industrial_craft){
ATGen.StandartOreDeposite(BlockID.oreCopper, 0, 3, 24, 64, 100, 16);
ATGen.StandartOreDeposite(BlockID.oreTin, 0, 3, 18, 52, 100, 16);
}

ATGen.StandartOreDeposite(BlockID.blackstone, 0, 256, 48, 64, 2, 1);
ATGen.StandartOreDeposite(BlockID.redstone, 0, 256, 48, 64, 2, 1);
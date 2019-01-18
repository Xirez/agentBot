class building{
    constructor() {
        this.maxLevel = 0;
        this.levels = [
            { level: 0, wood: 0, clay: 0, iron: 0, crop: 0, upkeep: 0, constructionTime: '00:00:00', culturePoint: 0}
        ];
    }
    getCostForBuildingLevel(level) {
            var levelItem = this.levels.find(a => a.level == level);
            return levelItem.wood + levelItem.clay + levelItem.iron + levelItem.crop;        
    }
    getTotalCostForBuildingLevel(level) {
        return 0;
    }
    getCulturePointForLevel(level) {
        return this.levels.find(a => a.level == level).culturePoints;        
    }
    getProductionTimeForLevel(level, mainBuildingLevel){
        return 0;
    }
    validateLevel(level) {
        if (!isNaN(level)) {
            throw new Error("Level need to be integer");
        }
        else if (level >= this.maxLevel) {
            throw new Error("Input level higher then maxlevel!");
        }
        else if (level <= 0) {
            throw new Error("Input level zero or lower!");
        }
        else {
            return true;
        }
    }
}
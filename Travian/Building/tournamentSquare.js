class tournamentSquare extends building{
    constructor() {
        super();
        this.maxLevel = 20;
        this.name = "Tournament square";
        this.levels  = [
            { level: 1, wood: 1750, clay: 2250, iron: 1530, crop: 240, upkeep: 1, constructionTime: '00:58:20', culturePoint: 1, speedBonus: 110 },
            { level: 2, wood: 2240, clay: 2880, iron: 1960, crop: 305, upkeep: 1, constructionTime: '01:12:40',culturePoint: 1, speedBonus: 120  },
            { level: 3, wood: 2865, clay: 3685, iron: 2505, crop: 395, upkeep: 1, constructionTime: '01:29:20',culturePoint: 2, speedBonus: 130  },
            { level: 4, wood: 3670, clay: 4720, iron: 3210, crop: 505, upkeep: 1, constructionTime: '01:48:30',culturePoint: 2, speedBonus: 140  },
            { level: 5, wood: 4700, clay: 6040, iron: 4105, crop: 645, upkeep: 1, constructionTime: '02:11:00',culturePoint: 2, speedBonus: 150  },
            { level: 6, wood: 6015, clay: 7730, iron: 5255, crop: 825, upkeep: 1, constructionTime: '02:36:50', culturePoint: 3, speedBonus: 160 } 
            { level: 7, wood: 6015, clay: 7730, iron: 5255, crop: 825, upkeep: 1, constructionTime: '02:36:50', culturePoint: 3, speedBonus: 170 } 
            { level: 8, wood: 6015, clay: 7730, iron: 5255, crop: 825, upkeep: 1, constructionTime: '02:36:50', culturePoint: 3, speedBonus: 180 } 
            { level: 9, wood: 6015, clay: 7730, iron: 5255, crop: 825, upkeep: 1, constructionTime: '02:36:50', culturePoint: 3, speedBonus: 190 } 
            { level: 10, wood: 6015, clay: 7730, iron: 5255, crop: 825, upkeep: 1, constructionTime: '02:36:50', culturePoint: 3, speedBonus: 200 } 
            { level: 11, wood: 6015, clay: 7730, iron: 5255, crop: 825, upkeep: 1, constructionTime: '02:36:50', culturePoint: 3, speedBonus: 210 } 
            { level: 12, wood: 6015, clay: 7730, iron: 5255, crop: 825, upkeep: 1, constructionTime: '02:36:50', culturePoint: 3, speedBonus: 220 } 
            { level: 13, wood: 6015, clay: 7730, iron: 5255, crop: 825, upkeep: 1, constructionTime: '02:36:50', culturePoint: 3, speedBonus: 230 } 
            { level: 14, wood: 6015, clay: 7730, iron: 5255, crop: 825, upkeep: 1, constructionTime: '02:36:50', culturePoint: 3, speedBonus: 240 } 
            { level: 15, wood: 6015, clay: 7730, iron: 5255, crop: 825, upkeep: 1, constructionTime: '02:36:50', culturePoint: 3, speedBonus: 250 } 
            { level: 16, wood: 6015, clay: 7730, iron: 5255, crop: 825, upkeep: 1, constructionTime: '02:36:50', culturePoint: 3, speedBonus: 260 } 
            { level: 17, wood: 6015, clay: 7730, iron: 5255, crop: 825, upkeep: 1, constructionTime: '02:36:50', culturePoint: 3, speedBonus: 270 } 
            { level: 18, wood: 6015, clay: 7730, iron: 5255, crop: 825, upkeep: 1, constructionTime: '02:36:50', culturePoint: 3, speedBonus: 280 } 
            { level: 19, wood: 6015, clay: 7730, iron: 5255, crop: 825, upkeep: 1, constructionTime: '02:36:50', culturePoint: 3, speedBonus: 290 } 
            { level: 20, wood: 6015, clay: 7730, iron: 5255, crop: 825, upkeep: 1, constructionTime: '02:36:50', culturePoint: 3, speedBonus: 300 } 
            ]
    }
    getSpeedBonusProcentageForLevel(level) {
        if (!isNaN(level))
        {
            throw new Error("Level need to be integer");
        }
        else if (level>=this.maxLevel) {
            throw new Error("Input level higher then maxlevel!");
        }
        else if (level<=0)
            {
                throw new Error("Input level zero or lower!");
            }
        else {
            return this.levels.find(a => a.level == level).speedBonus;            
        }
    }
}
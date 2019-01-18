class speedBoots extends equipment {
    constructor() {
        super();
        this.tiers = [
            { tier: 1, name: "Legosoldatens stövlar", speedBonus: 25 },
            { tier: 2, name: "Krigarens stövlar", speedBonus: 50 },
            { tier: 3, name: "Ämbetsmannens stövlar", speedBonus: 75 }
        ];
    }
    getSpeedBonusForLevel(level) {
        return this.tiers.find(a => a.tier == level).speedBonus;
    }
}
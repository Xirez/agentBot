class speedBoots extends equipment {
    constructor() {
        super();
        this.tiers = [
            { tier: 1, name: "Legosoldatens st�vlar", speedBonus: 25 },
            { tier: 2, name: "Krigarens st�vlar", speedBonus: 50 },
            { tier: 3, name: "�mbetsmannens st�vlar", speedBonus: 75 }
        ];
    }
    getSpeedBonusForLevel(level) {
        return this.tiers.find(a => a.tier == level).speedBonus;
    }
}
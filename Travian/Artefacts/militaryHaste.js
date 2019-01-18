class militaryHaste extends artefact {
    constructor() {
        super();
        this.levels = [
            { level: 1, name: "Small", bonus: 50 },
            { level: 2, name: "Big", bonus: 25 },
            { level: 3, name: "Unique", bonus: 50 },
        ];
    }
    /**
     * @param {integer} level   1=small 2=big 3=unique
     */
    getSpeedBonusForLevel(level) {
        return this.levels.find(a => a.level == 1).bonus;
    }
}
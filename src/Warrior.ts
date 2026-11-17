import { Character } from './Character';
import type { Weapon } from './Weapon';


export class Warrior extends Character {

    public static readonly RAGE_MULTIPLIER: number = 1.5; // Rôle : Le multiplicateur d'attaque du guerrier en rage.

    public constructor(name: string, health: number, baseAttack: number, baseDefense: number) {
        super(name, health, baseAttack, baseDefense);
    }

    public isEnraged(): boolean {
        return this.health < this.maxHealth / 2;
    }

    public override getAttack(): number {
        return Math.floor(this.baseAttack * (this.isEnraged() ? Warrior.RAGE_MULTIPLIER : 1) + this.getWeaponAttackBonus());
    }

    public override canEquip(weapon: Weapon): boolean {
        return weapon.kind === 'sword' || weapon.kind === 'axe';
    }

    public override describe(): string {
        return "[Warrior] " + super.describe() + (this.isEnraged() ? ' - enraged' : '');
    }

}
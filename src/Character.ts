import { Weapon } from './Weapon';

export abstract class Character {
    
    public readonly name : string; // Rôle : Le nom du personnage.
    public readonly maxHealth : number; // Rôle : Les points de vie maximum.
    public readonly baseAttack : number; // Rôle : L'attaque de base, sans arme.
    public readonly baseDefense : number; // Rôle : La défense du personnage.
    private _health : number; //Rôle : Les points de vie actuels.
    private _weapon : Weapon | null; //Rôle : L'arme tenue, `null` au départ.

    public constructor(name: string, health: number, baseAttack: number, baseDefense: number) {
        this.name = name;
        this.baseAttack = baseAttack;
        this.baseDefense = baseDefense;
        if (health <= 0) {
            throw new Error(`The health of ${name} must be strictly positive.`);
        }
        this._health = health;
        this.maxHealth = health;
    }

    public get health(): number {
        return this._health;
    }

    public abstract getAttack(): number

    public abstract canEquip(weapon: Weapon): boolean

    protected getWeaponAttackBonus(): number {
        return this._weapon ? this._weapon.attackBonus : 0;
    }

    public isAlive(): boolean {
        return this._health > 0;
    }

    public describe(): string {
        return `${this.name} - health ${this._health}/${this.maxHealth} - attack ${this.getAttack()} - defense ${this.baseDefense}` + (this._weapon ? ` - weapon: ${this._weapon.name}` : ' - weapon: none');
    }

    public equip(weapon: Weapon): void {
        if (this.canEquip(weapon)) {
            this._weapon = weapon;
        } else {
            throw new Error(`${this.name} cannot equip ${weapon.name}.`);
        }
    }

    // public takeDamage(amount: number): void {
    //     this._health = Math.max(this._health - Math.max(amount - this.baseDefense, 0), 0);
    // }

    public takeDamage(amount: number): void {
        this._health = Math.max(this._health - Math.max(amount, 0), 0);
    }


    public heal(amount: number): void {
        this._health = Math.min(this._health + Math.min(amount, this.maxHealth), this.maxHealth);
    }

    protected computeDamage(target: Character): number {
        return Math.max(this.baseAttack - target.baseDefense, 0) + this.getWeaponAttackBonus();
    }

    public attack(target: Character): number {
        if (this.isAlive()) {
            if (target !== this) {
                if (target.isAlive()) {
                    const damage = this.computeDamage(target);
                    target.takeDamage(damage);
                    console.log(`${this.name} hits ${target.name} for ${damage} damage (${target.name}: ${target.health}/${target.maxHealth}).`);
                    if (!target.isAlive()) {
                        console.log(`${target.name} is KO!`);
                    }
                    return damage;
                } else {
                    throw new Error(`${target.name} is already KO.`);
                }
            } else {
                throw new Error(`${this.name} cannot attack themselves.`);
            }
        } else {
            throw new Error(`${this.name} is KO and cannot attack.`);
        }
    }
}
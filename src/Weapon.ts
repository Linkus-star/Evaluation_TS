export type WeaponKind = 'sword' | 'axe' | 'staff' | 'dagger';

export class Weapon {
    public readonly name : string; // Rôle : Le nom de l'arme.
    public readonly kind : WeaponKind; // Rôle : Le type d'arme.
    public readonly attackBonus : number; // Rôle : Le bonus d'attaque apporté par l'arme.

    public constructor(name: string, kind: WeaponKind, attackBonus: number) {
        this.name = name;
        this.kind = kind;
        if (attackBonus < 0) {
            throw new Error(`The attack bonus of ${name} cannot be negative.`);
        }
        this.attackBonus = attackBonus;
    }

    public describe(): string {
        return `${this.name} (${this.kind}, +${this.attackBonus} attack)`;
    }
}
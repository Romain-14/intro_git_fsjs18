import { getRandomInteger } from "../utils.js";

export default class Character {

    constructor(name, hp, mp, attack, armor){
        this.name   = name;
        this.hp     = hp;
        this.mp     = mp;
        this.attack = attack;
        this.armor  = armor;

        this.dmg    = null;

        // on récupère l'élément qui va recevoir la mise à jour du log
        this.logDOM = document.querySelector("#log");

    }

    // méthodes lié au boutons (actions)
    setAttack(opponent){
        // calcul des dégats qui seront infligés 
        this.dmg = this.attack - opponent.armor;

        // on peut calculer un montant de dégat minimum pour éviter l'invincibilité d'un combattants
        if (this.dmg < 10) this.dmg = 10;

        // mise à jour des points de vie de l'adversaire
        opponent.hp -= this.dmg;

        // log l'info du tour
        this.log("cac", opponent);
    }

    setArmorUp(){
        let ratio = Math.round(this.armor * Math.random());
        this.armor += ratio / 2;
        this.log("def");
    }
    setCastSpell(opponent){
        if(this.mp > 0 ){
            this.dmg     = getRandomInteger(1, this.mp);
            opponent.hp -= this.dmg;
            this.mp     -= this.dmg;
            this.log("spell", opponent);
            return true;
        } else {
            if(opponent.name !== "Squall")
                this.logDOM
                    .innerHTML = `<p>Plus assez de magie pour lancer un sort !!</p>`;
            return false;
            
        }
    }
    
    log(type, opponent){
        if(opponent){
            this.logDOM
                .innerHTML += `
                    <p>${this.name} inflige ${this.dmg} à ${opponent.name} avec ${type === "cac" ? "une attaque au corps à corps !" : "une boule de feu"}</p>
                `;
            if(opponent.hp <= 0) opponent.hp = 0;
            this.logDOM
                .innerHTML += `
                    <p>Il reste ${opponent.hp}hp à ${opponent.name}</p>
                `;
        }
        if(type === "def"){
            this.logDOM
                .innerHTML += `
                    <p>${this.name} augmente son armure à : ${this.armor}</p>
                `;
        }

    }

}

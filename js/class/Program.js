import Character from "./Character.js";
import {getRandomInteger} from '../utils.js';

export default class Program {

    constructor(){

        // instancié les personnages 
        this.squall  = new Character("Squall", 180, 115, 20, 10);
        this.bahamut = new Character("bahamut", 220, 15, 25, 12);

        // on récupère l'élément qui va recevoir la mise à jour du log
        this.logDOM = document.querySelector("#log");

        document.querySelector("#atkBtn").addEventListener("click", () => this.onClickAtkBtn());
        document.querySelector("#defBtn").addEventListener("click", () => this.onClickDefBtn());
        document.querySelector("#spellBtn").addEventListener("click", () => this.onClickCastBtn());

        this.render();
    }

    render(){
        // affichage des barres d'états de combattants si les 2 sont en vie
        // placer une structure de contrôle pour vérifier si les combattants sont en vie
        if(this.squall.hp > 0 && this.bahamut.hp > 0){
            document.querySelector("#charac1")
                .textContent = `
                        ${this.squall.name} : ${this.squall.hp}Hp | atk : ${this.squall.attack} | armor:${this.squall.armor} | ${this.squall.mp}Mp 
                    `;
            document.querySelector("#charac2")
                .textContent = `
                        ${this.bahamut.name} : ${this.bahamut.hp}Hp | atk : ${this.bahamut.attack} | armor:${this.bahamut.armor} | ${this.bahamut.mp}Mp 
                    `;
        } else {
            // sinon cacher les barres d'états de combattants et afficher le nom du vainqueur
            document.querySelector("#btn").style.display = "none";
            document.querySelector("#state")
                .innerHTML = `
                    <li>Victoire de ${this.squall.hp > 0 ? this.squall.name : this.bahamut.name}</li>
                `;
        }
    }

    onClickAtkBtn() {
        // au clic définir les grandes lignes algorithmique de l'événement bouton
        // 1 - je nettoie mon journal de combat (log -> info de ce qu'il s'est passé durant ce tour)
        this.logDOM.innerHTML = "";
        // 2 - le joueur déclenche une attaque au corps à corps sur l'adversaire
        this.squall.setAttack(this.bahamut);
        // 3 - L'adversaire contre-attaque
        if(this.bahamut.hp > 0) this.counter();
        // 4 - Mise à jour de l'affichage des barres d'informations des combattants
        this.render();
    }

    onClickDefBtn(){
        this.logDOM.innerHTML = "";
        this.squall.setArmorUp();
        this.counter();
        this.render();
    }
    
    onClickCastBtn(){
        this.logDOM.innerHTML = "";
        if(this.squall.setCastSpell(this.bahamut)){
            if(this.bahamut.hp > 0) this.counter();
            this.render();
        }
    }

    counter(min = 1, max = 3){
        let random = getRandomInteger(min, max);
        console.log(random);
        if(random === 1) this.bahamut.setAttack(this.squall);
        if(random === 2) this.bahamut.setArmorUp();
        if(random === 3 && !this.bahamut.setCastSpell(this.squall)) this.counter(1, 2);

    }


}
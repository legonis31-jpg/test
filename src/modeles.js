/**
 * Étape 1 : les modèles.
 *
 * Les objets du jeu : une commande, un coursier, et deux types de coursiers.
 * Rien ici ne connaît la carte ni l'écran.
 *
 * Vocabulaire :
 *   une position  un objet {x, y}, x = colonne, y = ligne, depuis 0
 *   un chemin     une liste de positions à parcourir
 *
 * Les détails sont en section 7 du sujet. Les tests qui vont avec :
 * tests/test_1_modeles.js
 */

/** Vrai si `position` est bien un {x, y} avec deux entiers positifs. Fournie. */
export function estUnePosition(position) {
  return (
    position !== null &&
    typeof position === "object" &&
    Number.isInteger(position.x) &&
    Number.isInteger(position.y) &&
    position.x >= 0 &&
    position.y >= 0
  );
}

export class Commande {
  /**
   * id           entier strictement positif
   * destination  une position {x, y}, COPIÉE
   * pizzas       tableau non vide de noms de pizzas, COPIÉ
   * creeeAu      le tour d'arrivée de la commande, 0 par défaut
   *
   * Range aussi this.livreeAu à null : elle n'est pas encore livrée.
   * Lève une Error si l'id, la destination ou la liste de pizzas ne va pas.
   */

  constructor(id, destination, pizzas, creeeAu = 0) {
    // TODO etape 1 : ecrire le constructeur de Commande
    this.id = id ;
         if (this.id <= 0) {
       throw new Error("l'id n'est pas un entier positif") ;
     }
     if (Number.isInteger(this.id) == false) { 
       throw new Error("l'id n'est pas un entier") ;
     }

     if (estUnePosition(destination)) {
      this.destination = { ...destination };
     }
     else {
      throw new Error("la position ne peut pas être nulle") ;
     }

    //  if (this.destination.x < 0) {
    //   throw new Error("la position ne peut pas être négative") ;
    //  }
    //  if (this.destination.y < 0) {
    //   throw new Error("la position ne peut pas être négative") ;
    //  }

     this.pizzas = [ ...pizzas ];
     if (this.pizzas.length === 0) {
      throw new Error("le nombre de pizzas ne peut pes être négatif");
    }
     this.creeeAu = creeeAu ; 
     this.livreeAu = null ; 

    //throw new Error("etape 1 : le constructeur de Commande"); 
  }

  /** Le nombre de pizzas de la commande. */
  get nbPizzas() {
    // TODO etape 1 : ecrire Commande.nbPizzas
    // Prendre le nombre d'éléments du tableau de pizzas 
    return this.pizzas.length ;

    //throw new Error("etape 1 : Commande.nbPizzas");
  }

  /** Exactement : "Commande #3 : 2 pizzas pour (4, 7)", et "1 pizza" au singulier. */
  toString() {
    // TODO etape 1 : ecrire Commande.toString
    //test du pluriel de pizzas 
    if (this.nbPizzas == 1) {
      return `Commande #${this.id} : ${this.nbPizzas} pizza pour (${this.destination.x}, ${this.destination.y})` ;
      // Pour la position, il faut prendre les coordonées dans la liste et pas les affichier comme ça
    } else {
      return `Commande #${this.id} : ${this.nbPizzas} pizzas pour (${this.destination.x}, ${this.destination.y})` ;
      // Pour la position, il faut prendre les coordonées dans la liste et pas les affichier comme ça
    }
    throw new Error("etape 1 : Commande.toString");
  }
}

export class Coursier {
  /**
   * nom       chaîne non vide 
   * position  une position {x, y}, COPIÉE
   *
   * Au départ, this.commande vaut null et this.chemin vaut [].
   * Lève une Error si le nom ou la position ne va pas.
   */
  constructor(nom, position) {
    // TODO etape 1 : ecrire le constructeur de Coursier
   if (nom.trim() === "") {
    throw new Error("ce nom est invalide")
  // La chaîne est vide ou ne contient que des espaces
    }
    else {  
      this.nom = nom ;
    }

    if (estUnePosition(position)) {
      this.position = { ...position};
    }
    else {
      throw new Error("la position est invalide")
    }

    this.commande = null
    this.chemin = []

    //throw new Error("etape 1 : le constructeur de Coursier");
  }

  // Les trois valeurs que les sous-classes redéfinissent.
  get type() {
    return "coursier";
  }
  /** Nombre de cases parcourues par tour. */
  get vitesse() {
    return 1;
  }
  /** La lettre affichée sur la carte. */
  get symbole() {
    return "C";
  }

  /** Vrai s'il n'a pas de commande en cours. */
  get estLibre() {
    // TODO etape 1 : ecrire Coursier.estLibre
    if (this.commande === null){
      return true
    }
    else {
      return false
    }

    //throw new Error("etape 1 : Coursier.estLibre");
  }

  /**
   * Confie une commande et le chemin à suivre, COPIÉ.
   * Lève une Error si le coursier livre déjà, message contenant "deja".
   */
  charger(commande, chemin) {
    // TODO etape 1 : ecrire Coursier.charger
    
    if (this.estLibre ) {
      this.commande = commande
      this.chemin = structuredClone(chemin)
    }
    else {
      throw new Error ("deja")
    }
    //throw new Error("etape 1 : Coursier.charger");
  }

  /**
   * Avance d'au plus `vitesse` cases le long du chemin. Chaque case parcourue
   * devient la nouvelle position et sort du chemin.
   * Renvoie vrai si le chemin est vide après ce déplacement, faux sinon.
   * Un coursier libre ne bouge pas et renvoie faux.
   */
  avancer() {
    // TODO etape 1 : ecrire Coursier.avancer
  if (this.estLibre === true) {
   return false;
  }
  else {

  const nb = Math.min(this.vitesse, this.chemin.length);
  const casesParcourues = this.chemin.slice(0, nb);
  this.chemin = this.chemin.slice(nb);
  this.position = { ...casesParcourues[casesParcourues.length - 1] };
  return this.chemin.length === 0;

  }


    throw new Error("etape 1 : Coursier.avancer");
  }

  /**
   * Rend la commande au client, redevient libre, et renvoie cette commande.
   * Lève une Error s'il n'y a rien à livrer, message contenant "rien", ou si
   * le chemin n'est pas terminé, message contenant "arrive".
   */
  livrer() {
    // TODO etape 1 : ecrire Coursier.livrer
  if (this.chemin.length !== 0) {
    throw new Error("pas encore arrive");
  }
  if (this.commande === null) {
    throw new Error("rien a livrer");
  }

    const commandeLivree = this.commande;
  this.commande = null;
  return commandeLivree;
}

  /** Exactement : "Ana (velo) en (1, 1)". */
  toString() {
    // TODO etape 1 : ecrire Coursier.toString
    return `${this.nom} (${this.type}) en (${this.position.x}, ${this.position.y})`
    //throw new Error("etape 1 : Coursier.toString");
  }
}

export class Velo extends Coursier {
  // TODO etape 1 : type "velo", vitesse 2, symbole "V".
    get type() {
    return "velo";
  }
  /** Nombre de cases parcourues par tour. */
  get vitesse() {
    return 2;
  }
  /** La lettre affichée sur la carte. */
  get symbole() {
    return "V";
  }

}

export class Scooter extends Coursier {
  // TODO etape 1 : type "scooter", vitesse 3, symbole "S".
    get type() {
    return "scooter";
  }
  /** Nombre de cases parcourues par tour. */
  get vitesse() {
    return 3;
  }
  /** La lettre affichée sur la carte. */
  get symbole() {
    return "S";
  }
}

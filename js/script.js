async function init() {
    // Définir l'emplacement du SVG
    let canva = Snap("#compteur");
    let group = canva.group();

    // Variables
    let bleu;
    let jaune;
    let texte;

    // Créer une promesse pour le chargement de l'image SVG
    const loadSVG = () => {
        return new Promise((resolve, reject) => {
            Snap.load("images/compteur.svg", function (loadedFragment) {
                if (loadedFragment) {
                    group.append(loadedFragment);
                    resolve(loadedFragment); // Résoudre la promesse
                } else {
                    reject("Erreur lors du chargement du SVG");
                }
            });
        });
    };

    // Attendre que l'image soit chargée
    try {
        await loadSVG();

        // Sélectionner les éléments après le chargement
        bleu = canva.select("#bleu");
        jaune = canva.select("#jaune");
        texte = canva.select("#texte"); 

        // Ajouter un événement 'hover' (survol)
        bleu.hover(
            function () { inHover(this); },  // Fonction quand on survole
            function () { offHover(this); }  // Fonction quand on quitte le survol
        );
        jaune.hover(
            function () { avant(this); },  
            function () { apres(this); }  
        );
        texte.hover(
            function () { texteHover(this); }, 
            function () { texteOut(this); }  
        );

        // Ajouter un événement de clic au bouton
        document.getElementById("bouton1").addEventListener("click", function() {
            changerCouleurTexte(texte);
        });

        document.getElementById("bouton2").addEventListener("click", function() {
            changerTailleSVG(group);
        });

    } catch (error) {
        console.error(error);
    }
}

function inHover(element) {
    element.animate({ transform: 's2r360,150,150' }, 1000, mina.bounce);
}

function offHover(element) {
    element.animate({ transform: 's1r0,150,150' }, 1000, mina.bounce);
}

function avant(element) {
    element.animate({ transform: 's1r45,150,150' }, 1000, mina.bounce);
}

function apres(element) {
    element.animate({ transform: 's1r0,150,150' }, 1000, mina.bounce);
}

function texteHover(element) {
    element.animate({ opacity: 0 }, 1000, mina.easein);
}

function texteOut(element) {
    element.animate({ opacity: 1 }, 1000, mina.easeout);
}

// Fonction pour changer la couleur du texte
function changerCouleurTexte(texte) {
    const couleurs = ["red", "blue", "green", "orange", "purple"];
    const couleurAleatoire = couleurs[Math.floor(Math.random() * couleurs.length)];
    texte.animate({ fill: couleurAleatoire }, 1000, mina.easeinout);
}

function changerTailleSVG(group) {
    // Appliquer une transformation de mise à l'échelle
    group.animate({ transform: 's0.5' }, 500, mina.easeinout); // Réduit la taille à 50%
}
document.addEventListener("DOMContentLoaded", init);

// Fichier JS partagé (générique)
// Contient uniquement le code qui peut être exécuté sur toutes les pages sans effets de bord.

// Met à jour l'année dans le footer si présent
(function updateYear(){
    try{
        const yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    } catch(e) {
        // silencieux
        console.warn('updateYear error', e);
    }
})();

// Respect de la préférence utilisateur "réduire les animations"
(function reducedMotion(){
    try{
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Remplace la méthode scrollTo pour éviter l'animation
            window.scrollTo = (opts) => {
                if (typeof opts === 'object') window.scroll(0, opts.top ?? 0);
            };
            // Désactivation possible d'autres animations peut être gérée côté CSS via prefers-reduced-motion
        }
    } catch(e){
        console.warn('reducedMotion error', e);
    }
})();


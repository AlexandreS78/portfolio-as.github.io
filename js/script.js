/**
 * @file js/script.js
 * @module shared/script
 * @description Code partagé exécuté sur toutes les pages (sans effets de bord).
 */

/**
 * Met à jour dynamiquement l'année dans l'élément `#year` si présent.
 * @private
 */
(function updateYear() {
    try {
        const yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    } catch (e) {
        // erreur non critique
        console.warn('updateYear error', e);
    }
})();

/**
 * Adapte le comportement pour les utilisateurs ayant activé « prefers-reduced-motion ».
 * Si activé, remplace `window.scrollTo` par une version non animée.
 * @private
 */
(function reducedMotion() {
    try {
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Remplacer scrollTo par une version non animée
            window.scrollTo = (opts) => {
                if (typeof opts === 'object') window.scroll(0, opts.top ?? 0);
            };
        }
    } catch (e) {
        console.warn('reducedMotion error', e);
    }
})();

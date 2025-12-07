// JS spécifique à index.html
// Contrôle de la vidéo de fond et interactions spécifiques à index
(function indexPage(){
    // Activer le scroll lisse pour de meilleures transitions de focus, sauf si l'utilisateur demande reduced-motion
    try{
        if (!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.scrollBehavior = 'smooth';
        } else {
            document.documentElement.style.scrollBehavior = 'auto';
        }
    } catch (e) {
        console.warn('scrollBehavior error', e);
    }

    // Vérifier que l'élément vidéo existe
    try{
        const video = document.getElementById('bgVideo');
        const ctrl = document.getElementById('bgPlay');
        const status = document.getElementById('videoStatus');
        if(!video || !ctrl) return;

        function showControl(){
            ctrl.hidden = false;
            ctrl.setAttribute('aria-expanded', 'false');
            ctrl.setAttribute('aria-hidden', 'false');
        }
        function hideControl(){
            ctrl.hidden = true;
            ctrl.setAttribute('aria-expanded', 'true');
            ctrl.setAttribute('aria-hidden', 'true');
        }

        // Tentative d'autoplay muet
        const p = video.play();
        if(p !== undefined){
            p.then(() => {
                // autoplay OK -> masquer le contrôle
                hideControl();
                if(status) status.textContent = 'Vidéo de fond lancée automatiquement.';
            }).catch((err) => {
                // autoplay bloqué -> afficher le contrôle accessible
                showControl();
                if(status) status.textContent = 'Autoplay bloqué. Appuyez sur le bouton pour lancer la vidéo.';
                console.log('Autoplay bloqué:', err);
            });
        } else {
            // anciens navigateurs -> si la vidéo est en pause, montrer le contrôle
            if(video.paused) showControl(); else hideControl();
        }

        // Au clic sur le bouton : activer le son et lancer la lecture
        ctrl.addEventListener('click', function(){
            try{ video.muted = false; }catch(e){}
            const play2 = video.play();
            if(play2 && play2.then){
                play2.then(() => { hideControl(); if(status) status.textContent = 'Vidéo lancée.'; }).catch(e => { if(status) status.textContent = 'Impossible de lancer la vidéo.'; console.warn(e); });
            } else {
                hideControl();
                if(status) status.textContent = 'Vidéo lancée.';
            }
        });

        // Essayer de relancer la vidéo après la 1ère interaction utilisateur (scroll/click/keydown)
        function tryAfterInteraction(){
            const p2 = video.play();
            if(p2 && p2.then) {
                p2.then(() => { hideControl(); if(status) status.textContent = 'Vidéo lancée après interaction.'; }).catch(()=>{});
            }
            window.removeEventListener('click', tryAfterInteraction);
            window.removeEventListener('touchstart', tryAfterInteraction);
            window.removeEventListener('keydown', tryAfterInteraction);
        }
        window.addEventListener('click', tryAfterInteraction, { passive: true });
        window.addEventListener('touchstart', tryAfterInteraction, { passive: true });
        window.addEventListener('keydown', tryAfterInteraction, { passive: true });
    } catch(e){
        console.warn('index.js error', e);
    }
})();

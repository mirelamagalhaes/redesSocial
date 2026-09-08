document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // ELEMENTOS
    // =========================================

    const likeBtn = document.querySelector(".like-btn");
    const likesCountSpan = document.querySelector(".likes-count");
    const othersCount = document.querySelector(".others-count");
    const postMedia = document.querySelector(".post-media");
    const bookmarkBtn = document.querySelector(".bookmark-btn");

    if (!likeBtn) {
        console.error("Botão de curtida não encontrado.");
        return;
    }

    // =========================================
    // ESTADO DA CURTIDA E CONTADORES ZERADOS
    // =========================================

    let isLiked = false;
    let totalLikes = 0;   // Inicia em 0
    let othersLikes = 0;  // Inicia em 0

    // =========================================
    // FORMATAÇÃO DE NÚMEROS
    // =========================================

    function formatLikes(number) {
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1).replace(".0", "") + "M";
        }
        if (number >= 1000) {
            return (number / 1000).toFixed(1).replace(".0", "") + "K";
        }
        return number.toString();
    }

    // =========================================
    // ATUALIZA A TELA
    // =========================================

    function updateLikesDisplay() {
        if (likesCountSpan) {
            likesCountSpan.textContent = formatLikes(totalLikes);
        }

        if (othersCount) {
            othersCount.textContent = `${othersLikes} outros`;
        }
    }

    // =========================================
    // ANIMAÇÃO DO CORAÇÃO
    // =========================================

    function animateHeart() {
        const svg = likeBtn.querySelector("svg");
        if (!svg) return;

        svg.style.transform = "scale(1.35)";
        setTimeout(() => {
            svg.style.transform = "scale(1)";
        }, 150);
    }

    // =========================================
    // CURTIR
    // =========================================

    function likePost() {
        if (isLiked) return;

        isLiked = true;
        totalLikes++;
        othersLikes++;

        likeBtn.classList.add("liked");
        updateLikesDisplay();
        animateHeart();
        likeBtn.setAttribute("aria-label", "Descurtir");
    }

    // =========================================
    // DESCURTIR
    // =========================================

    function unlikePost() {
        if (!isLiked) return;

        isLiked = false;
        totalLikes = Math.max(0, totalLikes - 1);
        othersLikes = Math.max(0, othersLikes - 1);

        likeBtn.classList.remove("liked");
        updateLikesDisplay();
        animateHeart();
        likeBtn.setAttribute("aria-label", "Curtir");
    }

    // =========================================
    // EVENTOS DE CLIQUE
    // =========================================

    // Clique no botão de coração
    likeBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        if (isLiked) {
            unlikePost();
        } else {
            likePost();
        }
    });

    // Duplo clique na imagem do post
    if (postMedia) {
        postMedia.addEventListener("dblclick", (event) => {
            event.stopPropagation();
            likePost();
        });
    }

    // Botão Salvar
    if (bookmarkBtn) {
        let isBookmarked = false;

        bookmarkBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            isBookmarked = !isBookmarked;

            bookmarkBtn.classList.toggle("bookmarked", isBookmarked);

            const svg = bookmarkBtn.querySelector("svg");
            if (svg) {
                svg.style.transform = "scale(1.2)";
                setTimeout(() => {
                    svg.style.transform = "scale(1)";
                }, 150);
            }

            bookmarkBtn.setAttribute("aria-label", isBookmarked ? "Remover dos salvos" : "Salvar");
        });
    }

    // Inicializa o display zerado na montagem da tela
    updateLikesDisplay();
});
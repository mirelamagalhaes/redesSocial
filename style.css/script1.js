document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // ELEMENTOS
    // =========================================

    const likeBtn = document.querySelector(".like-btn");
    const likesCountSpan = document.querySelector(".likes-count");
    const othersCount = document.querySelector(".others-count");

    const postMedia = document.querySelector(".post-media");

    const bookmarkBtn = document.querySelector(".bookmark-btn");


    // =========================================
    // VERIFICAÇÃO
    // =========================================

    if (!likeBtn) {
        console.error("Botão de curtida não encontrado.");
        return;
    }


    // =========================================
    // ESTADO DA CURTIDA
    // =========================================

    let isLiked = false;


    // Valor inicial mostrado no botão
    let totalLikes = 1200;


    // Valor inicial mostrado no texto inferior
    let othersLikes = 235;


    // =========================================
    // FORMATAÇÃO DE NÚMEROS
    // =========================================

    function formatLikes(number) {

        if (number >= 1000000) {

            return (
                (number / 1000000)
                    .toFixed(1)
                    .replace(".0", "")
                + "M"
            );
        }


        if (number >= 1000) {

            return (
                (number / 1000)
                    .toFixed(1)
                    .replace(".0", "")
                + "K"
            );
        }


        return number.toString();
    }


    // =========================================
    // ATUALIZA A TELA
    // =========================================

    function updateLikesDisplay() {

        // Atualiza o número ao lado do coração
        if (likesCountSpan) {

            likesCountSpan.textContent =
                formatLikes(totalLikes);
        }


        // Atualiza o "235 others"
        if (othersCount) {

            othersCount.textContent =
                `${othersLikes} others`;
        }

    }


    // =========================================
    // ANIMAÇÃO DO CORAÇÃO
    // =========================================

    function animateHeart() {

        const svg = likeBtn.querySelector("svg");

        if (!svg) {
            return;
        }


        svg.style.transform = "scale(1.35)";


        setTimeout(() => {

            svg.style.transform = "scale(1)";

        }, 150);

    }


    // =========================================
    // CURTIR
    // =========================================

    function likePost() {

        // Evita adicionar várias curtidas
        // enquanto já estiver curtido
        if (isLiked) {
            return;
        }


        isLiked = true;


        totalLikes++;
        othersLikes++;


        // Adiciona a classe visual
        likeBtn.classList.add("liked");


        // Atualiza números
        updateLikesDisplay();


        // Anima coração
        animateHeart();


        // Atualiza acessibilidade
        likeBtn.setAttribute(
            "aria-label",
            "Descurtir"
        );

    }


    // =========================================
    // DESCURTIR
    // =========================================

    function unlikePost() {

        // Só executa se estiver curtido
        if (!isLiked) {
            return;
        }


        isLiked = false;


        totalLikes =
            Math.max(0, totalLikes - 1);


        othersLikes =
            Math.max(0, othersLikes - 1);


        // Remove estado visual
        likeBtn.classList.remove("liked");


        // Atualiza números
        updateLikesDisplay();


        // Anima coração
        animateHeart();


        // Atualiza acessibilidade
        likeBtn.setAttribute(
            "aria-label",
            "Curtir"
        );

    }


    // =========================================
    // CLIQUE NO CORAÇÃO
    // =========================================

    likeBtn.addEventListener("click", (event) => {

        event.stopPropagation();


        if (isLiked) {

            unlikePost();

        } else {

            likePost();

        }

    });


    // =========================================
    // DUPLO CLIQUE NA FOTO
    // =========================================

    if (postMedia) {

        postMedia.addEventListener(
            "dblclick",
            (event) => {

                event.stopPropagation();

                likePost();

            }
        );

    }


    // =========================================
    // BOTÃO SALVAR
    // =========================================

    if (bookmarkBtn) {

        let isBookmarked = false;


        bookmarkBtn.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();


                isBookmarked =
                    !isBookmarked;


                bookmarkBtn.classList.toggle(
                    "bookmarked",
                    isBookmarked
                );


                // Animação do bookmark
                const svg =
                    bookmarkBtn.querySelector("svg");


                if (svg) {

                    svg.style.transform =
                        "scale(1.2)";


                    setTimeout(() => {

                        svg.style.transform =
                            "scale(1)";

                    }, 150);

                }


                // Acessibilidade
                bookmarkBtn.setAttribute(
                    "aria-label",
                    isBookmarked
                        ? "Remover dos salvos"
                        : "Salvar"
                );

            }
        );

    }


    // =========================================
    // ESTADO INICIAL
    // =========================================

    updateLikesDisplay();

});
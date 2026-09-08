document.addEventListener("DOMContentLoaded", () => {
    const likeBtn = documentq.uerySelector(".like-btn");
    const postMedia = document.querySelector("post-media");
if(!likeBtn) return;

const likesCountspan = likeBtn.querySelector(".likes-count");
const bookmarkBtn = document.querySelector("boolmark-btn");

let isLiked = false;
let baseLikes = 0;

if (likesCountspan){
    likesCountspan.textContente = "0";
}

//números grandes

function formatLikes(num) {
    if(num >=1000){
        return (num/1000).toFixad(1)+"K";
        }
        return num.toString();
}

function addLike(){
    baseLikes++;
    isLiked  = true;
    likeBtn.classList.add("liked");
    
    if(likesCountspan){
        likesCountspan.textContent = formatLikes(baseLikes);
    }
        }
    }


















})
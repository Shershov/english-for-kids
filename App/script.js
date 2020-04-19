function renderMenu() {
    const mainDiv = document.getElementById('main_menu');
    cards[0].forEach((title, index) => {
        let div = document.createElement('div');
        div.innerHTML = `<li><a class="menu__item" href="#">${title}</a></li>`;

        div.getElementsByTagName('a')[0].onclick = (evt => {
            renderCards(index + 1);
            evt.preventDefault();
        });

        mainDiv.appendChild(div);
    });
    window.onclick = ((evt) => {
        if (
            (evt.target.id !== 'menu__toggle' && evt.target.className !== 'menu__btn') &&
            (evt.target.parentNode.id !== 'menu__toggle' && evt.target.parentNode.className !== 'menu__btn')
        ) {
            document.getElementById('menu__toggle').checked = false;
        }
    });

}

function renderCategrories() {
    resetPage();
    const mainDiv = document.getElementById('categories');
    cards[0].forEach((title, index) => {
        let div = document.createElement('div');
        div.className = 'col-xs-12 col-sm-6 col-md-4 col-lg-3';
        let image = cards[index + 1][0].image;
        div.innerHTML = `<div class="card">
                        <div class="card-body">
                            <a href="#">
                                <img src="App/${image}" class="card-img-top" alt="...">
                                <p>${title}</p>
                            </a>
                        </div>
                    </div>`;
        div.querySelector('a').onclick = (evt => {
            renderCards(index + 1);
            evt.preventDefault();
        });
        mainDiv.appendChild(div);
    });
}


function renderCards(categoryIndex) {
    currentCategoryIndex = categoryIndex;
    resetPage();
    const mainDiv = document.getElementById('cards');
    cards[categoryIndex].forEach(card => {
        let div = document.createElement('div');
        div.className = 'col-xs-12 col-sm-6 col-md-4 col-lg-3';
        div.innerHTML = `<div class="flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <div class="card">
                                <div class="card-body">
                                    <a href="#">
                                        <img src="App/${card.image}"
                                        class="card-img-top"
                                        alt="..." >
                                        <p>${card.word}</p>
                                        <div class="rotate"></div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="flip-card-back">
                            <div class="card">
                                <div class="card-body">
                                    <a href="#">
                                        <img src="App/${card.image}"
                                        class="card-img-top"
                                        alt="..." >
                                        <p>${card.translation}</p>
                                        <div class="rotate"></div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

        div.onclick = (evt) => {
            new Audio('App/' + card.audioSrc).play();
            evt.preventDefault();
        }

        let flipCard = div.querySelector('.flip-card');
        const rotateDiv = flipCard.querySelector('.rotate');
        rotateDiv.onclick = function(evt) {
            flipCard.className = 'flip-card flip-card__hovered';
            evt.preventDefault();
        };
        flipCard.onmouseleave = function(evt) {
            flipCard.className = 'flip-card';
        }

        mainDiv.appendChild(div);
    });

    let div = document.createElement('div');
    div.className = 'play';
    div.innerHTML = `<button>Start game</button>`;
    mainDiv.appendChild(div);
}

function resetPage() {
    document.getElementById('categories').innerHTML = '';
    document.getElementById('cards').innerHTML = '';
    window.scrollTo(0, 0);
    document.getElementById('menu__toggle').checked = false;
}

function initButtons() {
    document.getElementById('playbtn').onchange = function() {
        document.body.className = !document.getElementById('playbtn').checked ? 'is_play' : '';
    }

}

initButtons();
renderMenu();
resetPage();
renderCategrories();
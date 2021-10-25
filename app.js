// Selectorit etsivät käytettävät objektit
const tehtavaInput = document.querySelector('.tehtava-input');
const tehtavaButton = document.querySelector('.tehtava-button');
const tehtavaList = document.querySelector('.tehtava-list');
const suodataVaihtoehdot = document.querySelector('.suodata-tehtava');

// Event Listenerit lisäävät mahdollisuuden toteuttaa toimintoja
document.addEventListener("DOMContentLoaded", getTehtavat);
tehtavaButton.addEventListener('click', lisaaTehtava);
tehtavaList.addEventListener('click', poistaValittu);
suodataVaihtoehdot.addEventListener('change', suodataTehtavat);

// Funktioiden avulla toteutetaan halutut toiminnot
function lisaaTehtava(event){
    // Estää sivun päivittämisen
    event.preventDefault();

    // Luo uusi tehtävälistan osa
    const tehtavaDiv = document.createElement("div");
    tehtavaDiv.classList.add("tehtava");

    // Luo uuden listan 
    const uusiTehtava = document.createElement('li');
    uusiTehtava.innerText = tehtavaInput.value;
    tarkistaPituus(tehtavaInput.value.length);
    uusiTehtava.classList.add('tehtava-item');
    tehtavaDiv.appendChild(uusiTehtava);
 
    // Valitse painike
    const valitseBtn = document.createElement('button');
    valitseBtn.innerHTML = '<i class="fas fa-clipboard-check"></i>';
    valitseBtn.classList.add("valitse-btn");
    tehtavaDiv.appendChild(valitseBtn);

    // Poista painike
    const poistaBtn = document.createElement('button');
    poistaBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    poistaBtn.classList.add("poista-btn");
    tehtavaDiv.appendChild(poistaBtn);

    // Tallentaa tehtävät localstorageen
    tallennaTehtavat(tehtavaInput.value);

    // Lisää listaan
    tehtavaList.appendChild(tehtavaDiv);

    // Tyhjentää input kentän listaan lisäämisen jälkeen
    tehtavaInput.value = "";
}

function poistaValittu(e) {
    // Poistaa halutun tehtävän listasta
    const item = e.target;
    if(item.classList[0] === "poista-btn"){
        const tehtava = item.parentElement;

        // Putoamisanimaatio
        tehtava.classList.add("putous");
        poistaTehtavatStoragesta(tehtava);
        tehtava.addEventListener("transitionend", function(){
            tehtava.remove();
        });
    }
    // Valinnan merkintä
    if(item.classList[0] === "valitse-btn"){
        const tehtava = item.parentElement;
        tehtava.classList.toggle("valitse");
    }
}

function suodataTehtavat(e){
    // Etsii tehtävä muuttujan ja sen perusteella suodattaa tehtävät eri luokkiin
    const tehtavat = tehtavaList.childNodes;
    tehtavat.forEach(function (tehtava) { 
        const mStyle = tehtava.style;  
        if(mStyle != undefined && mStyle != null){
            switch (e.target.value) {
                case "kaikki":
                    mStyle.display = "flex";
                    break;
                case "tehty":
                    if (tehtava.classList.contains('valitse')) {
                        mStyle.display = 'flex';
                    } else {
                        mStyle.display = "none";
                    }
                    break;
                case "kesken":
                    if (tehtava.classList.contains('valitse')){
                        mStyle.display = 'none';
                    }
                    else{
                        mStyle.display = "flex";
                    }
                    break;
            }
        }
    })
}


function tallennaTehtavat(tehtava) {
    // Varmistaa ettei tehtäviä ole etukäteen
    let tehtavas;
    // Hakee tehtävät ja tallentaa ne localstorageen
    if(localStorage.getItem('tehtavat') === null){
        tehtavat = [];
    } else {
        tehtavat = JSON.parse(localStorage.getItem('tehtavat'));
    }
    tehtavat.push(tehtava);
    localStorage.setItem("tehtavat", JSON.stringify(tehtavat));
}

function getTehtavat() {
    // Hakee tehtävät localstoragesta
    let tehtavas;
    if(localStorage.getItem('tehtavat') === null){
        tehtavat = [];
    } else {
        tehtavat = JSON.parse(localStorage.getItem('tehtavat'));
    }
    tehtavat.forEach(function(tehtava) {

     // Luo uusi tehtävälistan osa
        const tehtavaDiv = document.createElement("div");
        tehtavaDiv.classList.add("tehtava");

     // Luo uuden listan
        const uusiTehtava = document.createElement('li');
        uusiTehtava.innerText = tehtava;
        uusiTehtava.classList.add('tehtava-item');
        tehtavaDiv.appendChild(uusiTehtava);
  
     // Valitse painike
        const valitseBtn = document.createElement('button');
        valitseBtn.innerHTML = '<i class="fas fa-clipboard-check"></i>';
        valitseBtn.classList.add("valitse-btn");
        tehtavaDiv.appendChild(valitseBtn);

     // Poista painike
        const poistaBtn = document.createElement('button');
        poistaBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        poistaBtn.classList.add("poista-btn");
        tehtavaDiv.appendChild(poistaBtn);

     // Lisää listaan
        tehtavaList.appendChild(tehtavaDiv);
    });
}


function poistaTehtavatStoragesta(tehtava) {
    // Poistaa tehtävät localstoragesta
    let tehtavas;
    if(localStorage.getItem("tehtavat") === null){
        tehtavat = [];
    } else {
        tehtavat = JSON.parse(localStorage.getItem("tehtavat"));
    }
    const tehtavaIndex = tehtava.children[0].innerText;
    tehtavat.splice(tehtavat.indexOf(tehtavaIndex), 1);
    localStorage.setItem("tehtavat", JSON.stringify(tehtavat));
}

function tarkistaPituus(pituus){
    // Tarkistaa, että annettu syöte on vähintään 3 ja enintään 100 merkkiä
    if(pituus <= 3){
        alert("Mahdoton tehtävä! Liian lyhyt syöte. Syötä yli kolme merkkiä");
        tehtavaInput.style.backgroundColor = "#f630302f";
        tehtava.remove();

    } else if (pituus >= 100){
        alert("Liian pitkä syöte. Syötä vähemmän kuin sata merkkiä. Nykyiset merkit: " + tehtavaInput.value.length);
        tehtavaInput.style.backgroundColor = "#f630302f";
        tehtava.remove();
    } else {
        tehtavaInput.style.backgroundColor = "whitesmoke";
    }
}





// DOMContentLoaded nos indica que el documento/pagina ya cargo
document.addEventListener('DOMContentLoaded', () => {
    // En caso de que el documento este cargado, entonces hacemos el fetch
    fetchData()
})


const fetchData = async () => {
    try {
        loadingData(true);

        const res = await fetch('https://rickandmortyapi.com/api/character');
        const data = await res.json();

        showCards(data);
        
    }
    catch (err) {
        console.log(err);
    }
    finally {
        loadingData(false);

    }
}

const showCards = (data) => {

    const cards = document.querySelector('#cards-dinamicas');
    const templateCards = document.querySelector('#card-template').content;
    const fragment = document.createDocumentFragment()

    data.results.forEach(element => {
        const clone = templateCards.cloneNode(true);
        clone.querySelector('.card-title').textContent = element.name;
        clone.querySelector('.p1').textContent = element.gender
        clone.querySelector('.p2').textContent = element.species
        clone.querySelector('.card-img').setAttribute('src', element.image);

        // Fragment para evitar reflow
        fragment.appendChild(clone);
    });

    cards.appendChild(fragment);
}






const loadingData = status => {
    const loading = document.getElementById('loading')
    if(status === true){
        loading.classList.remove('hidden');
    } else {
        loading.classList.add('hidden');
    }
}
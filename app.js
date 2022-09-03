// console.log('app.js');


const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}


const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.innerHTML = '';
    const showAll = document.getElementById('show-field');
    const noPhone = document.getElementById('no-phone');


    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
        noPhone.classList.add('d-none');
    }
    else if (phones.length === 0) {
        noPhone.classList.remove('d-none');
        showAll.classList.add('d-none');
    }
    else {
        noPhone.classList.add('d-none');
        showAll.classList.add('d-none');
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
    <div class="card p-3 h-400">
        <img src="${phone.image}" class="card-img-top w-80" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.</p>
                <button class="btn btn-primary btn-outline-secondary text-light" onclick="loadPhoneDetails('${phone.slug}')"data-bs-toggle="modal" data-bs-target="#phoneDetails">Show Details</button>
        </div>
    </div>
`;
        phoneContainer.appendChild(phoneDiv);

    })
    toggleSpinner(false);
}

// spinner/loader
const toggleSpinner = isLoading => {

    const loadSpinner = document.getElementById('loader');
    if (isLoading) {
        loadSpinner.classList.remove('d-none');
    }
    else {
        loadSpinner.classList.add('d-none');
    }
}


// search system
const processSearch = dataLimit => {
    toggleSpinner(true);
    setTimeout(() => {
        const searchField = document.getElementById('input-field');
        const searchText = searchField.value;
        loadPhones(searchText, dataLimit);
    }, 2000)
}
document.getElementById('show-all').addEventListener('click', function () {
    processSearch();

})

document.getElementById('btn-search').addEventListener('click', function () {
    processSearch(10);

})


document.getElementById('input-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);

    }
})


// phone-details

const loadPhoneDetails = async (id) => {

    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = details => {

    const phoneTitle = document.getElementById('phoneDetailsLabel');
    phoneTitle.innerText = details.name;
    const phonebrand = document.getElementById('phone-brand');
    phonebrand.innerText = 'Brand : ' + details.brand;
    const phoneStorage = document.getElementById('phone-storage');
    phoneStorage.innerText = 'Storage : ' + details.mainFeatures.storage;
    const phonereleaseDate = document.getElementById('phone-releaseDate');
    phonereleaseDate.innerText = 'ReleaseDate : ' + details.releaseDate;
    const phoneChipSet = document.getElementById('phone-chipset');
    phoneChipSet.innerText = 'ChipSet : ' + details.mainFeatures.chipSet;
    const phoneMemory = document.getElementById('phone-memory');
    phoneChipSet.innerText = 'Memory : ' + details.mainFeatures.memory;
    const phoneDisplaySize = document.getElementById('phone-displaysize');
    phoneDisplaySize.innerText = 'Displaysize : ' + details.mainFeatures.displaySize;
    const phoneBluetooth = document.getElementById('phone-bluetooth');
    phoneBluetooth.innerText = 'Bluetooth : ' + details.others.Bluetooth;

}



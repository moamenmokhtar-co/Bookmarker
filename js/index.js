var siteNameInput = document.getElementById('siteName');
var siteUrlInput = document.getElementById('siteUrl');

var submitInput = document.getElementById('submit');

var inputsContainer = [siteNameInput, siteUrlInput];

var siteArray;


if (localStorage.getItem('site') == null) {
    siteArray = [];
}

else {
    siteArray = JSON.parse(localStorage.getItem('site'));
    display(siteArray);
}

function submitAdd() {

    if (validationName() && validationSite()) {

        // submitInput.removeAttribute('data-bs-toggle', 'modal');
        // submitInput.removeAttribute('data-bs-target', '#exampleModal');
        var site = {
            name: siteNameInput.value,
            url: siteUrlInput.value
        }


        siteArray.push(site);

        afterAction()

        resetForm(inputsContainer);


    }

    else {
        submitInput.setAttribute('data-bs-toggle', 'modal');
        submitInput.setAttribute('data-bs-target', '#exampleModal');
    }



}



function display(arr) {
    var cartona = '';

    for (var i = 0; i < arr.length; i++) {
        cartona += `
        <tr>
        <td valign="middle">${i}</td>
        <td valign="middle">${siteArray[i].name}</td>
        <td valign="middle">
            <a href="https://${siteArray[i].url}" class="btn view text-white" target="_blank">
            <i class="fa-solid fa-eye me-2"></i><span class="fw-bold">Visit</span>
            </a>
        </td>
        <td valign="middle">
            <button onclick="deleteSite(${i})" href="#" class="btn delete text-white">
            <i class="fa-solid fa-trash-can me-2"></i><span class="fw-bold">Delete</span>
            </button>
        </td>
        </tr>`
    }

    document.getElementById('bookMarkers').innerHTML = cartona;

}


function afterAction() {
    localStorage.setItem('site', JSON.stringify(siteArray))
    display(siteArray);
}


function deleteSite(deletedIndex) {
    siteArray.splice(deletedIndex, 1)
    afterAction()
}


function resetForm(inputs) {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = null;
    }

    siteNameInput.classList.remove('is-valid')
    siteUrlInput.classList.remove('is-valid')

}

function validationName() {
    var regex = /^\w{3,}$/;


    if (regex.test(siteNameInput.value)) {
        siteNameInput.classList.add('is-valid')
        siteNameInput.classList.remove('is-invalid')
        submitInput.removeAttribute('data-bs-toggle', 'modal');
        submitInput.removeAttribute('data-bs-target', '#exampleModal');
        return true;
    }
    else {
        siteNameInput.classList.add('is-invalid')
        siteNameInput.classList.remove('is-valid')
        submitInput.setAttribute('data-bs-toggle', 'modal');
        submitInput.setAttribute('data-bs-target', '#exampleModal');


        return false;
    }



}
function validationSite() {
    var regex = /^\w{1,}\.\w{2,}$/;


    if (regex.test(siteUrlInput.value)) {
        siteUrlInput.classList.add('is-valid')
        siteUrlInput.classList.remove('is-invalid')
        submitInput.removeAttribute('data-bs-toggle', 'modal');
        submitInput.removeAttribute('data-bs-target', '#exampleModal');
        return true;
    }
    else {
        siteUrlInput.classList.add('is-invalid')
        siteUrlInput.classList.remove('is-valid')
        // submitInput.setAttribute('data-bs-toggle', 'modal');
        // submitInput.setAttribute('data-bs-target', '#exampleModal');
        return false;
    }

}
/**
 * Displays the given error field with the given message.
 * @param {HTMLElement} field 
 * @param {string} message 
 * @param {boolean} innerHTML
 */
 function showError(field, message, innerHTML=false) {
    if (innerHTML)
        field.innerHTML = message;
    else
        field.textContent = message;

    field.style.display = "initial";
}

/**
 * Hides the given error field.
 * @param {HTMLElement} field 
 */
function hideError(field) {
    field.style.display = "none";
}
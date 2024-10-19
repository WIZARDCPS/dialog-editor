function codeEditor() {
    let
        textarea = document.getElementById('code'),
        lines = textarea.value.split('\n'),
    
    dialog = document.getElementById('dialog');
    
    dialog.innerHTML = textarea.value;

    /*for (let i = 0; i < lines; i++) {
        dialog.innerHTML = textarea.value;
    }*/
}
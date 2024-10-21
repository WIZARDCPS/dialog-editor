let livePreview = false;

function toggle() {
    livePreview = !livePreview;
}

function codeEditor(force = true) {
    if (!livePreview && force) return;
    
    let
    input = (document.getElementById('code').value).replace(/<CR>/g, "<br>"),
    line = input.split("\n")
    preview = document.getElementById('dialog');
    
    // Reset
    dialog.propt.style.setProperty("--quick-exit-opacity", 0);
    dialog.value = "";
    preview.innerHTML = dialog.value;
    
    line.forEach(item => {
        item = item.split("|");
        dialog.insert(item[0], item);
    });
    
    preview.innerHTML = dialog.value;

    /*for (let i = 0; i < lines; i++) {
        dialog.innerHTML = textarea.value;
    }*/
}

function run() {
    codeEditor(false);
}

function copy() {
    const input = document.getElementById('code');
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand('copy');
}
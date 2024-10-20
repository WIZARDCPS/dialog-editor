const dialog = {
    commands: {},
    propt: document.documentElement,
    value: "",
    add(command, handler) {
        this.commands[command] = handler;
    },
    insert(command, data) {
        if (this.commands[command]) {
            this.commands[command](data);
        }
    }
};
dialog.add("set_default_color", (data) => {
    console.log(data);
    dialog.propt.style.setProperty("--default-color", getColor(data[1] ? data[1] : "`o"));
});


function codeEditor() {
    let
    input = document.getElementById('code').value,
    line = input.split("\n")
    preview = document.getElementById('dialog');
    
    // Reset preview
    preview.innerHTML += 'a';
    
    line.forEach(item => {
        item = item.split("|");
        dialog.insert(item[0], item);
    });

    /*for (let i = 0; i < lines; i++) {
        dialog.innerHTML = textarea.value;
    }*/
}

function getColor(type) {
    switch(type) {
        case "`1":
            return "adf4ff";
        case "`2":
            return "#49fc00";
        case "`3":
            return "#bfdaff";
        case "`4":
            return "#ff271d";
        case "`5":
            return "#ebb7ff";
        case "`6":
            return "#ffca6f";
        case "`7":
            return "#e6e6e6";
        case "`8":
            return "#ff9445";
        case "`9":
            return "#ffee7d";
        case "`0": case "`w":
            return "#ffffff"
        
        case "`!":
            return "#d1fff9";
        case "`@":
            return "#ffcdc9";
        case "`#":
            return "#ff8ff3";
        case "`$":
            return "#fffcc5";
        case "`^":
            return "#b5ff97";
        case "`&":
            return "#feebff";
            
        case "`o":
            return "#fce6ba";
        case "`p":
            return "#ffdff1";
        case "`b":
            return "#000000";
        case "`q":
            return "#0c60a4";
        case "`e":
            return "#19b9ff";
        case "`r":
            return "#6fd357";
        case "`t":
            return "#2f830d";
        case "`a":
            return "#515151";
        case "`s":
            return "#9e9e9e";
        case "`c":
            return "#50ffff";
        
        case "`ì":
            return "#ffe119";
            
        default:
            return "#ffffff";
    }
}
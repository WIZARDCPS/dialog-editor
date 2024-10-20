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
    dialog.propt.style.setProperty("--default-color", getColor(data[1] ? data[1] : "`o"));
});
dialog.add("add_quick_exit", (data) => {
    dialog.propt.style.setProperty("--quick-exit-opacity", 1);
});
dialog.add("add_label_with_icon", (data) => {
    if (data.length < 5) return;
    const small = (data[1] == "small" ? true : false),
    itemID = data[4];
    
    let text = data[2];
    
    if (text.match("`")) {
        text = coloringText(text);
    }
    
    console.log(text)
    
    dialog.value += `<div style="font-size: ${small ? "1" : "1.5"}rem;" class="title"><img style="width: ${small ? "20" : "30"}px; height: auto;" src="https://gtpshax.github.io/DialogGTPS/src/assets/items/${itemID}.png" alt="${itemID}"><p>${text}</p></div>`;
});
dialog.add ("add", (data)=> {
    if (!data[1]) return;
    dialog.value += data[1];
})

function getColor(type) {
    switch(type) {
        case "`1":
            return "#adf4ff";
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
            return "var(--default_color)";
    }
}

function explode(text) {
    let parts = text.match(/(?:`[^\s]*\s*[^`]+|^[^`]+)/g);
    
    let result = parts.map(part => {
        let colorMatch = part.match(/`[^\s]/);
        let color = colorMatch ? colorMatch[0] : '';
        let text = part.replace(/`[^\s]\s*/, '');
        
        return {
            color: color,
            text: text.trim()
        };
    });
    
    return result;
}


function coloringText(text) {
    const parts = explode(text);
    console.log(parts)
    let result = '';

    for (let i = 0; i < parts.length; i++) {
        result += `<span style="color: ${getColor(parts[i].color)}">${parts[i].text} </span>`;
        if (i == parts.length - 1) return result;
    }
}
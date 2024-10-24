let dialog = {
    commands: {},
    propt: document.documentElement,
    value: "",
    temp: {
        obj: {},
        css: ""
    },
    add(command, handler) {
        this.commands[command] = handler;
    },
    insert(command, data) {
        if (this.commands[command]) {
            this.commands[command](data);
        }
    }
};

let sudah = {
    margin: 0
}

function saveImage() {
    dialog.propt.style.setProperty("--toggle-render", "visible");
    dialog.propt.style.setProperty("--render-width", "700px");
    dialog.propt.style.setProperty("--render-height", "unset");
    setTimeout(()=>{
        domtoimage.toPng(document.getElementById("preview"))
        .then((dataUrl) => {
            let link = document.createElement('a');
            link.download = 'dialog.png';
            link.href = dataUrl;
            link.click();
            
            dialog.propt.style.setProperty("--toggle-render", "auto");
            dialog.propt.style.setProperty("--render-width", "100%");
            dialog.propt.style.setProperty("--render-height", "40vh");
        });
        }, 300);
}

dialog.add("set_default_color", (data) => {
    if (data.length < 2) return;
    dialog.propt.style.setProperty("--default-color", getColor(data[1] ? data[1] : "`o"));
});
dialog.add("add_quick_exit", (data) => {
    if (data.length < 2) return;
    dialog.propt.style.setProperty("--quick-exit-opacity", 1);
});
dialog.add("set_border_color", (data) => {
    if (data.length < 2) return;
    let color = data[1].split(',');
    color[3] = color[3] / 255;
    data[1] = color.join(',');
    
    dialog.propt.style.setProperty("--dialog-border", `rgba(${data[1]})`);
});
dialog.add("set_bg_color", (data) => {
    if (data.length < 2) return;
    let color = data[1].split(',');
    color[3] = color[3] / 255;
    data[1] = color.join(',');
    console.log(data[1])
    
    dialog.propt.style.setProperty("--dialog-bg", `rgba(${data[1]})`);
});


dialog.add("add_custom_margin", (data) => {
    if (data.length < 3) return;
    if (sudah.margin) {
        dialog.value += "</div>";
        dialog.temp.css = "";
        dialog.temp.obj = {};
        toggle.margin = 0;
    }
    else sudah.margin = 1;
    dialog.temp.obj["margin"] = parseObj(data[1]);
    dialog.temp.css += parseCSS(dialog.temp.obj);
    dialog.value += `<div style="${dialog.temp.css}">`;
    dialog.temp.css = "";
    dialog.temp.obj = {};
});
dialog.add("reset_placement_x", (data) => {
    if (data.length < 2) return;
    dialog.value += "</div>";
    dialog.temp.css = "";
    dialog.temp.obj = {};
});


dialog.add("add_spacer", (data) => {
    if (data.length < 3) return;
    if (data[1] == "small") dialog.value += "<br>";
    else dialog.value += "<br><br>";
});
dialog.add("add_textbox", (data) => {
    if (data.length < 3) return;
    let text = data[1];
    
    if (text.match("`")) {
        text = coloringText(text);
    }
    
    dialog.value += `<p style="font-size: 1rem;${dialog.temp.css}">${text}<p>`
})

dialog.add("add_label", (data) => {
    if (data.length < 5) return;
    const small = (data[1] == "small" ? true : false);
    
    let text = data[2];
    
    if (text.match("`")) {
        text = coloringText(text);
    }
    
    dialog.value += `<div style="font-size: ${small ? "1" : "1.3"}rem;${dialog.temp.css}" class="title"><p>${text}</p></div>`;
});
dialog.add("add_label_with_icon", (data) => {
    if (data.length < 6) return;
    const small = (data[1] == "small" ? true : false),
    itemID = data[4];
    
    let text = data[2];
    
    if (text.match("`")) {
        text = coloringText(text);
    }
    
    dialog.value += `<div style="font-size: ${small ? "1" : "1.3"}rem;${dialog.temp.css}" class="title"><img style="width: ${small ? "15" : "20"}px; height: auto;" src="https://gtpshax.github.io/DialogGTPS/src/assets/items/${itemID}.png" alt="${itemID}"><p>${text}</p></div>`;
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

function parseObj(input) {
    return Object.fromEntries(
        input.split(';').map(param => {
            const [key, value] = param.split(':');
            return [key, value !== undefined ? (isNaN(value) ? value : parseInt(value, 10)) : 0];
        })
    );
}

function parseCSS(styles) {
    if (!styles) return "";
    return Object.entries(styles).map(([property, values]) => {
        const { x = 0, y = 0 } = values;

        switch (property) {
            case 'margin':
                return `margin-top: ${y/150}in; margin-left: ${x/150}in;`;
            case 'padding':
                return `padding-top: ${y/150}in; padding-left: ${x/150}in;`;
            case 'border':
            case 'borderWidth':
                return `border-width: ${y/150}in ${x/150}in;`;
            case 'borderRadius':
            case 'outlineWidth':
                return `${property}: ${x}cm;`;
            case 'top':
                return `top: ${y};`;
            case 'left':
                return `left: ${x};`;
            case 'width':
            case 'height':
            case 'fontSize':
            case 'lineHeight':
            case 'letterSpacing':
                return `${property}: ${x}cm;`;
            case 'color':
            case 'backgroundColor':
            case 'borderColor':
                return `${property}: rgba(${x}, ${y}, 255, 1);`;
            case 'display':
            case 'position':
            case 'overflow':
            case 'visibility':
            case 'float':
                return `${property}: ${x};`;
            case 'opacity':
                return `${property}: ${x};`;
            case 'textAlign':
            case 'verticalAlign':
                return `${property}: ${x};`;
            case 'flex':
            case 'flexGrow':
            case 'flexShrink':
                return `${property}: ${x};`;
            case 'boxShadow':
                return `${property}: 0 0 ${x}px rgba(0, 0, 0, 0.5);`;
            case 'textShadow':
                return `${property}: ${x}px ${y}px rgba(0, 0, 0, 0.5);`;
            default:
                return `${property}: ${x}px;`;
        }
    }).join(' ');
}
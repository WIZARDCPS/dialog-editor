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
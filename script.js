class Circle {
    constructor(radius) {
        this._radius = radius;
    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        if (value >= 0) {
            this._radius = value;
        }
    }

    get diameter() {
        return this._radius * 2;
    }

    getArea() {
        return Math.PI * this._radius * this._radius;
    }

    getCircumference() {
        return 2 * Math.PI * this._radius;
    }
}

const circle = new Circle(5);

document.write("<h2>Завдання 1. Коло</h2>");
document.write("<p>Радіус: " + circle.radius + "</p>");
document.write("<p>Діаметр: " + circle.diameter + "</p>");
document.write("<p>Площа: " + circle.getArea().toFixed(2) + "</p>");
document.write("<p>Довжина кола: " + circle.getCircumference().toFixed(2) + "</p>");

circle.radius = 7;
document.write("<p>Новий радіус: " + circle.radius + "</p>");
document.write("<p>Новий діаметр: " + circle.diameter + "</p>");

class HtmlElement {
    constructor(tagName, isSelfClosing = false, textContent = "") {
        this.tagName = tagName;
        this.isSelfClosing = isSelfClosing;
        this.textContent = textContent;
        this.attributes = [];
        this.styles = [];
        this.children = [];
    }

    setAttribute(name, value) {
        this.attributes.push({ name: name, value: value });
    }

    setStyle(name, value) {
        this.styles.push({ name: name, value: value });
    }

    appendChild(element) {
        this.children.push(element);
    }

    prependChild(element) {
        this.children.unshift(element);
    }

    getHtml() {
        let result = "<" + this.tagName;

        for (let attribute of this.attributes) {
            result += " " + attribute.name + '="' + attribute.value + '"';
        }

        if (this.styles.length > 0) {
            result += ' style="';
            for (let i = 0; i < this.styles.length; i++) {
                result += this.styles[i].name + ":" + this.styles[i].value;
                if (i < this.styles.length - 1) {
                    result += ";";
                }
            }
            result += '"';
        }

        if (this.isSelfClosing) {
            return result + " />";
        }

        result += ">";
        result += this.textContent;

        for (let child of this.children) {
            result += child.getHtml();
        }

        result += "</" + this.tagName + ">";
        return result;
    }
}

const wrapper = new HtmlElement("div");
wrapper.setAttribute("id", "wrapper");
wrapper.setStyle("width", "500px");
wrapper.setStyle("margin", "20px auto");
wrapper.setStyle("padding", "15px");
wrapper.setStyle("border", "1px solid #888");

const heading = new HtmlElement("h2", false, "HTML-елементи");
heading.setStyle("color", "darkblue");

const paragraph = new HtmlElement("p", false, "Цей блок створено за допомогою класу HtmlElement.");
const list = new HtmlElement("ul");

const item1 = new HtmlElement("li", false, "Перший елемент списку");
const item2 = new HtmlElement("li", false, "Другий елемент списку");
const item3 = new HtmlElement("li", false, "Третій елемент списку");

list.appendChild(item1);
list.appendChild(item2);
list.appendChild(item3);

const image = new HtmlElement("img", true);
image.setAttribute("src", "https://placehold.co/200x100");
image.setAttribute("alt", "Приклад зображення");

wrapper.appendChild(heading);
wrapper.appendChild(paragraph);
wrapper.appendChild(list);
wrapper.appendChild(image);

document.write("<h2>Завдання 2. Клас HtmlElement</h2>");
document.write(wrapper.getHtml());

class CssClass {
    constructor(name) {
        this.name = name;
        this.styles = [];
    }

    setStyle(name, value) {
        const existing = this.styles.find(style => style.name === name);

        if (existing) {
            existing.value = value;
        } else {
            this.styles.push({ name: name, value: value });
        }
    }

    removeStyle(name) {
        this.styles = this.styles.filter(style => style.name !== name);
    }

    getCss() {
        let result = "." + this.name + " {\n";

        for (let style of this.styles) {
            result += "    " + style.name + ": " + style.value + ";\n";
        }

        result += "}";
        return result;
    }
}

const cardClass = new CssClass("card");
cardClass.setStyle("width", "300px");
cardClass.setStyle("padding", "15px");
cardClass.setStyle("border", "1px solid #555");
cardClass.setStyle("border-radius", "8px");
cardClass.setStyle("background-color", "#f2f2f2");

document.write("<h2>Завдання 3. Клас CssClass</h2>");
document.write("<pre>" + cardClass.getCss() + "</pre>");

class HtmlBlock {
    constructor(styles, rootElement) {
        this.styles = styles;
        this.rootElement = rootElement;
    }

    getCode() {
        let result = "<style>\n";

        for (let style of this.styles) {
            result += style.getCss() + "\n";
        }

        result += "</style>\n";
        result += this.rootElement.getHtml();
        return result;
    }
}

const titleStyle = new CssClass("block-title");
titleStyle.setStyle("color", "#17365d");
titleStyle.setStyle("font-family", "Arial, sans-serif");
titleStyle.setStyle("margin-bottom", "10px");

const textStyle = new CssClass("block-text");
textStyle.setStyle("font-family", "Arial, sans-serif");
textStyle.setStyle("line-height", "1.5");

const panelStyle = new CssClass("panel");
panelStyle.setStyle("max-width", "500px");
panelStyle.setStyle("margin", "20px auto");
panelStyle.setStyle("padding", "20px");
panelStyle.setStyle("border", "1px solid #999");
panelStyle.setStyle("border-radius", "10px");
panelStyle.setStyle("background-color", "#f7f9fc");

const root = new HtmlElement("div");
root.setAttribute("class", "panel");

const blockTitle = new HtmlElement("h2", false, "Приклад HTML-блоку");
blockTitle.setAttribute("class", "block-title");

const blockText = new HtmlElement("p", false, "Цей блок сформовано за допомогою класів HtmlBlock, HtmlElement і CssClass.");
blockText.setAttribute("class", "block-text");

const blockList = new HtmlElement("ul");
blockList.setAttribute("class", "block-text");
blockList.appendChild(new HtmlElement("li", false, "Стилі зберігаються в об'єктах CssClass."));
blockList.appendChild(new HtmlElement("li", false, "HTML-елементи можуть містити вкладені елементи."));
blockList.appendChild(new HtmlElement("li", false, "Метод getCode() формує весь код блоку."));

root.appendChild(blockTitle);
root.appendChild(blockText);
root.appendChild(blockList);

const htmlBlock = new HtmlBlock([panelStyle, titleStyle, textStyle], root);

document.write("<h2>Завдання 4. Клас HtmlBlock</h2>");
document.write(htmlBlock.getCode());

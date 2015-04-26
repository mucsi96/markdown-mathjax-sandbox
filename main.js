marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false, // IMPORTANT, because we do MathJax before markdown,
    //            however we do escaping in 'CreatePreview'.
    smartLists: true,
    smartypants: false
});

function escape(html, encode) {
    return html
        .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function runMathJax() {
    var container = document.getElementById('markdown-mathjax');

    container.innerHTML = escape(container.innerHTML);
    MathJax.Hub.Queue(
        ["Typeset", MathJax.Hub, container], [mathJaxReady]
    );

    function mathJaxReady() {
        var text = container.innerHTML;

        text = text.replace(/^&gt;/mg, '>');
        container.innerHTML = marked(text);
        container.classList.add('ready');
    }
}

runMathJax();

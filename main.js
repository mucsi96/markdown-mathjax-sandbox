(function() {
    'use strict';

    var container = document.getElementById('markdown-mathjax');

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false, // IMPORTANT, because we do MathJax before markdown
        smartLists: true,
        smartypants: false
    });

    function escape() {
        container.innerHTML = container.innerHTML
            .replace(/&(?!#?\w+;)/g)
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function runMarkDown() {
        var text = container.innerHTML;

        text = text.replace(/^&gt;/mg, '>');
        container.innerHTML = marked(text);
    }

    function markReady() {
        container.classList.add('ready');
    }

    MathJax.Hub.Queue([escape], ["Typeset", MathJax.Hub, container], [runMarkDown], [markReady]);
})();

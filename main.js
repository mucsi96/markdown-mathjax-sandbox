(function() {
    'use strict';

    function getSections() {
        var sections = [];

         [].forEach.call(document.querySelectorAll('.markdown-mathjax'), function (section) {
            sections.push(section);
         });

         return sections;
    }

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

    function escape(section) {
        section.innerHTML = section.innerHTML
            .replace(/&(?!#?\w+;)/g)
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function runMarkDown(section) {
        var text = section.innerHTML;

        text = text.replace(/^&gt;/mg, '>');
        section.innerHTML = marked(text);
    }

    function markReady(section) {
        section.classList.add('ready');
    }

    getSections().forEach(function(section) {
        console.log()
        MathJax.Hub.Queue(
            [escape, section],
            ["Typeset", MathJax.Hub, section],
            [runMarkDown, section],
            [markReady, section]);
    });
})();

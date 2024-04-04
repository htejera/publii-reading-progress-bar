class ReadingProgressBarPlugin {
    constructor(API, name, config) {
        this.API = API;
        this.name = name;
        this.config = config;
    }

    addInsertions() {
        this.API.addInsertion('publiiHead', this.injectCSS.bind(this), 1, this);
        this.API.addInsertion('publiiFooter', this.injectReadingProgressBar.bind(this), 1, this);
    }

    injectCSS() {
        let barColor = this.config.barColor || '#FFFFFF';
        let barHeight = this.config.barHeight || '4';

        return `
            <style>
                #progress {
                    background: ${barColor};
                    position: fixed;
                    top: 0;
                    bottom: auto;
                    left: 0;
                    width: 0%;
                    height: ${barHeight}px;
                    z-index: 1000;
                }
            </style>
        `;
    }

    injectReadingProgressBar() {
        // Código JavaScript de la barra de progreso, como una cadena de texto
        const readingProgressScript = `
        document.addEventListener("DOMContentLoaded", function() {
            if (window.location.pathname !== '/') {
            const progressBar = document.createElement('div');
            progressBar.id = 'progress';
            document.body.prepend(progressBar);
    
            let body = document.body,
                html = document.documentElement;
    
            let height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    
            const setProgress = () => {
                let scrollFromTop = (document.documentElement.scrollTop || body.scrollTop) + html.clientHeight;
                let width = scrollFromTop / height * 100 + '%';
                progressBar.style.width = width;
            };
    
            window.addEventListener('scroll', setProgress);
            setProgress();
            }
        });        
    `;
        return `<script type="text/javascript">${readingProgressScript}</script>`;
    }

}

module.exports = ReadingProgressBarPlugin;
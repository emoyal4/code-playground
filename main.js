'use strict'
let gCode = {}
const gCodeOpen = {
    html: true,
    css: true,
    js: true
}
let isNoChange = true

function init() {
    initCode()
    render()
}

function initCode() {
    gCode = JSON.parse(localStorage.getItem('code')) || {}
    if (!gCode || !gCode.html || !gCode.css) {
        gCode.html = `<div class="box"></div>`
        gCode.js = `console.log('hello world')`
        gCode.css = `.user-html{
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
            
.box{
    height: 150px;
    width: 150px;
    background: red;
    margin-inline-start: 15px;
}`
    }
}

function render() {
    const elResult = document.querySelector('.user-html')
    elResult.innerHTML = gCode.html

    const elUserCss = document.querySelector('.user-css')
    elUserCss.innerText = gCode.css

    const elUserJs = document.querySelector('.user-js')
    console.log(elUserJs);
    elUserJs.innerText = gCode.js

    const elHtml = document.querySelector('.html')
    elHtml.innerText = gCode.html

    const elCss = document.querySelector('.css')
    elCss.innerText = gCode.css

    const elJs = document.querySelector('.js')
    elJs.innerText = gCode.js

    document.querySelector('.save-btn').style.color = '#fff';
}

function handleKeys(ev) {
    if (!ev.ctrlKey) return
    switch (ev.key) {
        case 's':
            ev.preventDefault()
            saveCode()
            break;
        case 'd':
            ev.preventDefault()
            downloadCode()
            break;
        default:
            break;
    }
}

function saveCode() {
    if (isNoChange) {
        setUserMsg('No Changes')
        return
    }
    gCode.html = _getHtmlFromString(document.querySelector('.html').innerText)
    gCode.css = _getHtmlFromString(document.querySelector('.css').innerText)
    gCode.js = _getHtmlFromString(document.querySelector('.js').innerText)
    localStorage.setItem('code', JSON.stringify(gCode))
    isNoChange = true
    setUserMsg('Code Saved')
    render()
    location.reload(true);
}

function resizeCode(ev) {
    let codeLng = null
    switch (ev.target.dataset.code) {
        case 'html':
            codeLng = 'html'
            break;
        case 'css':
            codeLng = 'css'
            break;
        case 'js':
            codeLng = 'js'
            break;
        default:
            break;
    }
    gCodeOpen[codeLng] = !gCodeOpen[codeLng]
    const elCode = document.querySelector(`.${codeLng}-container`)
    if (!gCodeOpen[codeLng]) {
        elCode.classList.remove('open')
    } else {
        elCode.classList.add('open')
    }
}

function setFirstChang() {
    isNoChange = false
    document.querySelector('.save-btn').style.color = 'green';
}

function toggleInfoModal() {
    const elBody = document.querySelector('body')
    if (elBody.classList.contains('info-open')) elBody.classList.remove('info-open')
    else elBody.classList.add('info-open')
}

function setUserMsg(msg) {
    const elUserMsg = document.querySelector('.user-msg')
    elUserMsg.innerText = msg

    const elBody = document.querySelector('body')
    elBody.classList.add('user-msg-open')
    setTimeout(() => { elBody.classList.remove('user-msg-open') }, 2000)
}

function downloadCode() {
    const lngs = Object.keys(gCode)
    let fileName
    for (var i = 0; i < lngs.length; i++) {
        switch (lngs[i]) {
            case 'html':
                fileName = 'index.html'
                break;
            case 'css':
                fileName = 'style.css'
                break;
            case 'js':
                fileName = 'main.js'
                break;
            default:
                break;
        }
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(gCode[lngs[i]]));
        element.setAttribute('download', fileName);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}

function _getHtmlFromString(string) {
    var res = string.replace(/&gt;/g, '>');
    res = res.replace(/&lt;/g, '<');
    res = res.replace(/&quot;/g, '"');
    res = res.replace(/&apos;/g, "'");
    res = res.replace(/&amp;/g, '&');
    return res;
}


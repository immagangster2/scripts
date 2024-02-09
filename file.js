// ==UserScript==
// @name         Custom Material Loader
// @version      3.0
// @description  Custom Material Loader
// @author       official_troller
// @match        https://starblast.io/
// @grant        none
// ==/UserScript==

const log = (msg) => console.log(`%c[Client] ${msg}`, "color: #293449");
const modlog = (msg) => console.log(`%c[Mod] ${msg}`, "color: #FF00A6");
console.clear()
document.open();
document.write(`<html><head><title>Loading...</title></head><body style="background-color:#293449;"><div style="margin: auto; width: 50%;"><h1 style="text-align: center;padding: 170px 0;">Loading mods</h1><h1 style="text-align: center;">Please wait</h1></div></body></html>`);
document.close();
log(`Started`)

function Loader() {
    if (window.location.pathname != "/") {
        log(`Injection not needed`);
        return
    }
    var url = "https://starblast.io";
    var xhr = new XMLHttpRequest();
    log("Fetching starblast src...");
    xhr.open("GET", url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            var src = xhr.responseText;
            if (src != undefined) {
                log(`Src fetched successfully`)
            } else {
                log(`Src fetch failed`)
            }
            const start_time = performance.now();
            log("Patching src...");
            //Material Stufff...
            function darkenColor(t, a) {
                const r = t.slice(1),
                    n = parseInt(r, 16);
                let e = (n >> 16) / 255,
                    o = (n >> 8 & 255) / 255,
                    s = (255 & n) / 255;
                const c = Math.max(e, o, s),
                    h = Math.min(e, o, s);
                let i, d, M = (c + h) / 2;
                if (c === h) i = d = 0;
                else {
                    const t = c - h;
                    switch (d = M > .5 ? t / (2 - c - h) : t / (c + h), c) {
                        case e:
                            i = (o - s) / t + (o < s ? 6 : 0);
                            break;
                        case o:
                            i = (s - e) / t + 2;
                            break;
                        case s:
                            i = (e - o) / t + 4
                    }
                    i /= 6
                }
                M *= 1 - a / 100;
                let l, S, u, b = (1 - Math.abs(2 * M - 1)) * d,
                    p = b * (1 - Math.abs(6 * i % 2 - 1)),
                    g = M - b / 2;
                return 0 <= i && i < 1 / 6 ? (l = b, S = p, u = 0) : 1 / 6 <= i && i < 2 / 6 ? (l = p, S = b, u = 0) : 2 / 6 <= i && i < .5 ? (l = 0, S = b, u = p) : .5 <= i && i < 4 / 6 ? (l = 0, S = p, u = b) : 4 / 6 <= i && i < 5 / 6 ? (l = p, S = 0, u = b) : (l = b, S = 0, u = p), l = Math.round(255 * (l + g)), S = Math.round(255 * (S + g)), u = Math.round(255 * (u + g)), `#${l.toString(16).padStart(2,"0")}${S.toString(16).padStart(2,"0")}${u.toString(16).padStart(2,"0")}`
            }
            const carbonMatch = src.match(/t\.prototype\.buildCarbonMaterial.*?emissiveMap:([iI10OlL]{5})/);
            const carbonEmissiveMap = carbonMatch[0].match(/emissiveMap\:[iI10OlL]{5}/);
            const alloyMatch = src.match(/t\.prototype\.buildAlloyMaterial.*?emissiveMap\:[iI10OlL]{5}/);
            const alloyEmissiveMap = alloyMatch[0].match(/emissiveMap\:[iI10OlL]{5}/);
            const mapregex = src.match(/t\.prototype\.buildCarbonMaterial.*?map\:[iI10OlL]{5}/);
            const mapvalue = mapregex[0].match(/[iI10OlL]{5}/);
            const emissiveregex = src.match(/emissive\:[iI10OlL]{5}/);
            const addregex = /carbon\:"Carbon"/i;
            const malaor = localStorage.getItem("malaor");
            //--//Material Cases
            const materialcase = `
            case "custom":this.buildcustomMaterial();break;
            `;
            const materialself = `
            t.prototype.buildcustomMaterial = function () { return this.material = new THREE.MeshPhongMaterial({ map:${mapvalue}, bumpMap:${mapvalue}, specularMap:${mapvalue}, specular: 1052688, shininess: 10, bumpScale: .1, color:"${malaor}", ${emissiveregex}.hsvToRgbHex(this.hue, .5, 1), ${carbonEmissiveMap}})},
            `;
            const ecpcolor = `
            case"custom":s=t.createLinearGradient(0,0,0,i),s.addColorStop(0,"` + darkenColor(malaor, 70) + `"),s.addColorStop(.5,"` + malaor + `"),s.addColorStop(.5,"` + darkenColor(malaor, 60) + `"),s.addColorStop(1,"` + darkenColor(malaor, 10) + `");break;
           `;
            const addmaterial = `,
            custom:"Custom Material"
            `;

            src = src.replace(/case\s*"carbon"\s*:\s*this\.buildCarbonMaterial\(\);break;\n?/, '$&' + materialcase)
                .replace(/t\.prototype\.buildCarbonMaterial\s*=\s*function\s*\([^)]*\)\s*{[^}]*}\)},/, '$&' + materialself)
                .replace(/case\s*"titanium"\s*:(s=t.createLinearGradient\(0,0,0,i\),[\s\S]*?);break;/, '$&' + ecpcolor)
                .replace(/carbon\:"Carbon"/i, '$&' + addmaterial);
            document.open();
            document.write(src);
            document.close();
        }
    };
    xhr.send();
}
setTimeout(Loader, 1);

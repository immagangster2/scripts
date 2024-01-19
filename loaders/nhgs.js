// ==UserScript==
// @name         Troll Client
// @version      2.0.5
// @description  Troll Client
// @author       official_troller
// @license      GPL-3.0
// @match        https://starblast.io/
// @run-at       document-end
// @grant        none
// ==/UserScript==
const log = (msg) => console.log(`%c[Troll Client] ${msg}`, "color: #ffff00");
const modlog = (msg) => console.log(`%c[Mod] ${msg}`, "color: #FF00A6");
const stylelog = (msg) => console.log(`%c[Style] ${msg}`, "color: #06c26d");
const updtaelog = (msg) =>
    console.log(`%c[Troll Client] ${msg}`, "color: #00ff00");
const updatelog = (msg) =>
    console.log(`%c[Troll Client] ${msg}`, "color: #ff0000");
console.clear();
document.open();
document.write(
    `<html><head><title>Loading...</title></head><body style="background-color:#a9a90f;"><div style="margin: auto; width: 50%;"><h1 style="text-align: center;padding: 170px 0;font-family:Play,Verdana;">Loading Troll Client...</h1><h1 style="text-align: center;font-family:Play,Verdana;">Please wait</h1></div></body></html>`
);
document.close();
log(`Started`);

function injectLoader() {
    if (window.location.pathname !== "/") {
        log(`Injection not needed`);
        return;
    }

    var url = "https://raw.githubusercontent.com/immagangster2/justsomething/main/test%20thing.html";
    var xhr = new XMLHttpRequest();
    log("Fetching starblast src...");
    xhr.open("GET", url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            var starSRC = xhr.responseText;
            if (starSRC !== undefined) {
                log(`Src fetched successfully`);
            }
            if (localStorage.getItem("malaor") === null) {
                localStorage.setItem("malaor", "#ff0000");
            }

            if (localStorage.getItem("gemindeed") === null) {
                localStorage.setItem("gemindeed", "#ff0000");
            }

            if (localStorage.getItem("gemindeed1") === null) {
                localStorage.setItem("gemindeed1", "#ff0000");
            }
            const start_time = performance.now();
            function darkenColor(color, percent) {
                const hex = color.slice(1);
                const num = parseInt(hex, 16);

                let r = (num >> 16) / 255;
                let g = ((num >> 8) & 0xFF) / 255;
                let b = (num & 0xFF) / 255;

                const max = Math.max(r, g, b);
                const min = Math.min(r, g, b);

                let h, s, l = (max + min) / 2;

                if (max === min) {
                    h = s = 0;
                } else {
                    const d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

                    switch (max) {
                        case r:
                            h = (g - b) / d + (g < b ? 6 : 0);
                            break;
                        case g:
                            h = (b - r) / d + 2;
                            break;
                        case b:
                            h = (r - g) / d + 4;
                            break;
                    }

                    h /= 6;
                }

                l *= 1 - percent / 100;

                let c = (1 - Math.abs(2 * l - 1)) * s;
                let x = c * (1 - Math.abs((h * 6) % 2 - 1));
                let m = l - c / 2;

                let newR, newG, newB;

                if (0 <= h && h < 1 / 6) {
                    newR = c;
                    newG = x;
                    newB = 0;
                } else if (1 / 6 <= h && h < 2 / 6) {
                    newR = x;
                    newG = c;
                    newB = 0;
                } else if (2 / 6 <= h && h < 3 / 6) {
                    newR = 0;
                    newG = c;
                    newB = x;
                } else if (3 / 6 <= h && h < 4 / 6) {
                    newR = 0;
                    newG = x;
                    newB = c;
                } else if (4 / 6 <= h && h < 5 / 6) {
                    newR = x;
                    newG = 0;
                    newB = c;
                } else {
                    newR = c;
                    newG = 0;
                    newB = x;
                }

                newR = Math.round((newR + m) * 255);
                newG = Math.round((newG + m) * 255);
                newB = Math.round((newB + m) * 255);

                return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
            }

            log("Loading Mods...");
            //Materials
            const substrings = [
               'case"carbon":this.buildCarbonMaterial();break;'
                , "t.prototype.buildCarbonMaterial=function(){return this.material=new THREE.MeshPhongMaterial({map:AlloyMaterialMap,bumpMap:AlloyMaterialMap,specular:6316128,shininess:5,bumpScale:.1,color:1052688,emissive:AlloyEmissiveMaterial.hsvToRgbHex(this.hue,.5,1),emissiveMap:CarbonEmissiveMap})},"
               , 'case"titanium":s=t.createLinearGradient(0,0,0,i),s.addColorStop(0,"#444"),s.addColorStop(.5,"#AAA"),s.addColorStop(.5,"#444"),s.addColorStop(1,"#111");break;'
               , 'carbon:"Carbon"'
            , ];
            const malaor = localStorage.getItem("malaor");
            const additions = [
               'case"fx27":this.buildfX27Material();break;'
               , `t.prototype.buildfX27Material=function(){return this.material=new THREE.MeshPhongMaterial({map:AlloyMaterialMap,bumpMap:AlloyMaterialMap,specularMap:AlloyMaterialMap,specular:1052688,shininess:10,bumpScale:.1,color:"${malaor}",emissive:AlloyEmissiveMaterial.hsvToRgbHex(this.hue,.5,1),emissiveMap:CarbonEmissiveMap})},`
               , 'case"fx27":s=t.createLinearGradient(0,0,0,i),s.addColorStop(0,"' + darkenColor(malaor, 70) + '"),s.addColorStop(.5,"' + malaor + '"),s.addColorStop(.5,"' + darkenColor(malaor, 60) + '"),s.addColorStop(1,"' + darkenColor(malaor, 10) + '");break;'
               , ',fx27:"Custom Material"'
            , ];
            for (let i = 0; i < substrings.length; i++) {
                const index = starSRC.indexOf(substrings[i]);
                if (index !== -1) {
                    starSRC =
                        starSRC.slice(0, index + substrings[i].length) +
                        additions[i] +
                        starSRC.slice(index + substrings[i].length);
                } else {
                    throw new Error(`Could not find substring ${i + 1}`);
                }
            }
            modlog("Materials added");
            //Badges
            const localStorageKey = "badgergers";
            const localStorageData = localStorage.getItem(localStorageKey);

            if (!localStorageData) {
                console.warn(
                    `Local storage key "${localStorageKey}" not found or empty. Nothing will be loaded.`
                );
            } else {
                const badgegersData = JSON.parse(localStorageData);

                if (Array.isArray(badgegersData) && badgegersData.length > 0) {
                    const newCaseTemplate = `case "{name}": this.icon = "{url}"; break;`;
                    let newCases = "";
                    let newBadges = "";

                    badgegersData.forEach(({
                        name,
                        url
                    }) => {
                        const sanitizedCaseName = name.replace(/\s/g, "");
                        newCases += newCaseTemplate
                            .replace("{name}", sanitizedCaseName)
                            .replace("{url}", url);
                        newBadges += `"${sanitizedCaseName}":"${name}",`;
                    });

                    const seasonalIndex = starSRC.indexOf('case "seasonal":');
                    if (seasonalIndex !== -1) {
                        starSRC =
                            starSRC.slice(0, seasonalIndex) +
                            newCases +
                            starSRC.slice(seasonalIndex);
                    }

                    const blankIndex = starSRC.indexOf('blank: "Blank"');
                    if (blankIndex !== -1) {
                        newBadges = newBadges.replace(/,\s*$/, "");
                        starSRC =
                            starSRC.slice(0, blankIndex + 'blank: "Blank"'.length) +
                            "," +
                            newBadges +
                            starSRC.slice(blankIndex + 'blank: "Blank"'.length);
                    }
                }
            }
            modlog("Badges added");
            const timDel = localStorage.getItem("timdel");
            const leaderunde = localStorage.getItem("leaderunde");
            const get = localStorage.getItem("emopacity");
            const gemslol = localStorage.getItem("gemindeed");
            const gemslol1 = localStorage.getItem("gemindeed1");
            const blurdes = localStorage.getItem("blurdes");
            const stationisten = localStorage.getItem("stationisten");
            const weaponisten = localStorage.getItem("weaponisten");
            const oiceat = localStorage.getItem("oiceat");
            const agugg = localStorage.getItem("agugg");
            const abugg = localStorage.getItem("abugg");
            //main settings
            let trollClientScript = document.createElement('script');
            trollClientScript.textContent = `
            class trollclient {
                guidetect() {
                    return "im here!";
                }
                troller() {
    if (window.troller == true) {
      window.troller = false;
      console.log("Troller Simulator disabled");
    } else {
      window.troller = true;
      if (Object.values(Object.values(window.module.exports.settings).find(_0x568bd9 => _0x568bd9.mode)).find(_0x218be2 => _0x218be2.status).status.shield != 0 && Object.values(Object.values(window.module.exports.settings).find(_0x4e3e9e => _0x4e3e9e.mode)).find(_0x3a15de => _0x3a15de.status).status.generator != 0) {
        var number = 0;
        var objval = Object.values(Object.values(window.module.exports.settings).find(_0x4ae68f => _0x4ae68f.mode)).find(_0x3cbdf0 => _0x3cbdf0.socket).socket;
        console.log("Troller Simulator enabled");
        function onnoff() {
          function sayemote(_0x5dfe35) {
            var saythng = {
              name: "say",
              data: _0x5dfe35
            };
            objval.send(JSON.stringify(saythng));
          }
          var onofffunc = false;
          if (onofffunc == false && number == 0) {
            number = 1;
            sayemote("OGOYO");
            onofffunc = true;
          }
          if (onofffunc == false && number == 1) {
            sayemote("OOGOY");
            number = 2;
            onofffunc = true;
          }
          if (onofffunc == false && number == 2) {
            sayemote("YOOGO");
            number = 3;
            onofffunc = true;
          }
          if (onofffunc == false && number == 3) {
            sayemote("OYOOG");
            number = 4;
            onofffunc = true;
          }
          if (onofffunc == false && number == 4) {
            sayemote("GOYOO");
            number = 0;
            onofffunc = true;
          }
          if (window.troller == true) {
            setTimeout(onnoff, 600);
          }
        }
        onnoff();
      }
    }
  }

  blank() {
    if (window.blank == true) {
      window.blank = false;
      console.log("Troller Simulator disabled");
    } else {
      window.blank = true;
      if (Object.values(Object.values(window.module.exports.settings).find(_0x568bd9 => _0x568bd9.mode)).find(_0x218be2 => _0x218be2.status).status.shield != 0 && Object.values(Object.values(window.module.exports.settings).find(_0x4e3e9e => _0x4e3e9e.mode)).find(_0x3a15de => _0x3a15de.status).status.generator != 0) {
        var number = 0;
        var objval = Object.values(Object.values(window.module.exports.settings).find(_0x4ae68f => _0x4ae68f.mode)).find(_0x3cbdf0 => _0x3cbdf0.socket).socket;
        console.log("Troller Simulator enabled");
        function onnoff() {
          function sayemote(_0x5dfe35) {
            var saythng = {
              name: "say",
              data: _0x5dfe35
            };
            objval.send(JSON.stringify(saythng));
          }
          var onofffunc = false;
          if (onofffunc == false && number == 0) {
            number = 1;
            sayemote("ooooo");
            onofffunc = true;
          }
          if (onofffunc == false && number == 1) {
            sayemote("ooooo");
            number = 2;
            onofffunc = true;
          }
          if (onofffunc == false && number == 2) {
            sayemote("ooooo");
            number = 3;
            onofffunc = true;
          }
          if (onofffunc == false && number == 3) {
            sayemote("ooooo");
            number = 4;
            onofffunc = true;
          }
          if (onofffunc == false && number == 4) {
            sayemote("ooooo");
            number = 0;
            onofffunc = true;
          }
          if (window.blank == true) {
            setTimeout(onnoff, 600);
          }
        }
        onnoff();
      }
    }
  }
    notnnd() {
    if (window.notnnd == true) {
      window.notnnd = false;
      console.log("Troller Simulator disabled");
    } else {
      window.notnnd = true;
      if (Object.values(Object.values(window.module.exports.settings).find(_0x568bd9 => _0x568bd9.mode)).find(_0x218be2 => _0x218be2.status).status.shield != 0 && Object.values(Object.values(window.module.exports.settings).find(_0x4e3e9e => _0x4e3e9e.mode)).find(_0x3a15de => _0x3a15de.status).status.generator != 0) {
        var number = 0;
        var objval = Object.values(Object.values(window.module.exports.settings).find(_0x4ae68f => _0x4ae68f.mode)).find(_0x3cbdf0 => _0x3cbdf0.socket).socket;
        console.log("Troller Simulator enabled");
        function onnoff() {
          function sayemote(_0x5dfe35) {
            var saythng = {
              name: "say",
              data: _0x5dfe35
            };
            objval.send(JSON.stringify(saythng));
          }
          var onofffunc = false;
          if (onofffunc == false && number == 0) {
            number = 1;
            sayemote("DIIII");
            onofffunc = true;
          }
          if (onofffunc == false && number == 1) {
            sayemote("IDIII");
            number = 2;
            onofffunc = true;
          }
          if (onofffunc == false && number == 2) {
            sayemote("IIDII");
            number = 3;
            onofffunc = true;
          }
          if (onofffunc == false && number == 3) {
            sayemote("IIIDI");
            number = 4;
            onofffunc = true;
          }
          if (onofffunc == false && number == 4) {
            sayemote("IIIID");
            number = 0;
            onofffunc = true;
          }
          if (window.notnnd == true) {
            setTimeout(onnoff, 600);
          }
        }
        onnoff();
      }
    }
  }

      devrim() {
    if (window.devrim == true) {
      window.devrim = false;
      console.log("Troller Simulator disabled");
    } else {
      window.devrim = true;
      if (Object.values(Object.values(window.module.exports.settings).find(_0x568bd9 => _0x568bd9.mode)).find(_0x218be2 => _0x218be2.status).status.shield != 0 && Object.values(Object.values(window.module.exports.settings).find(_0x4e3e9e => _0x4e3e9e.mode)).find(_0x3a15de => _0x3a15de.status).status.generator != 0) {
        var number = 0;
        var objval = Object.values(Object.values(window.module.exports.settings).find(_0x4ae68f => _0x4ae68f.mode)).find(_0x3cbdf0 => _0x3cbdf0.socket).socket;
        console.log("Troller Simulator enabled");
        function onnoff() {
          function sayemote(_0x5dfe35) {
            var saythng = {
              name: "say",
              data: _0x5dfe35
            };
            objval.send(JSON.stringify(saythng));
          }
          var onofffunc = false;
          if (onofffunc == false && number == 0) {
            number = 1;
            sayemote("QXQXQ");
            onofffunc = true;
          }
          if (onofffunc == false && number == 1) {
            sayemote("QAQAQ");
            number = 2;
            onofffunc = true;
          }
          if (onofffunc == false && number == 2) {
            sayemote("QSQSQ");
            number = 0;
            onofffunc = true;
          }
          if (window.devrim == true) {
            setTimeout(onnoff, 600);
          }
        }
        onnoff();
      }
    }
  }
      rithy() {
    if (window.rithy == true) {
      window.rithy = false;
      console.log("Troller Simulator disabled");
    } else {
      window.rithy = true;
      if (Object.values(Object.values(window.module.exports.settings).find(_0x568bd9 => _0x568bd9.mode)).find(_0x218be2 => _0x218be2.status).status.shield != 0 && Object.values(Object.values(window.module.exports.settings).find(_0x4e3e9e => _0x4e3e9e.mode)).find(_0x3a15de => _0x3a15de.status).status.generator != 0) {
        var number = 0;
        var objval = Object.values(Object.values(window.module.exports.settings).find(_0x4ae68f => _0x4ae68f.mode)).find(_0x3cbdf0 => _0x3cbdf0.socket).socket;
        console.log("Troller Simulator enabled");
        function onnoff() {
          function sayemote(_0x5dfe35) {
            var saythng = {
              name: "say",
              data: _0x5dfe35
            };
            objval.send(JSON.stringify(saythng));
          }
          var onofffunc = false;
          if (onofffunc == false && number == 0) {
            number = 1;
            sayemote("JOOOO");
            onofffunc = true;
          }
          if (onofffunc == false && number == 1) {
            sayemote("OJOOO");
            number = 2;
            onofffunc = true;
          }
          if (onofffunc == false && number == 2) {
            sayemote("OOJOO");
            number = 3;
            onofffunc = true;
          }
          if (onofffunc == false && number == 3) {
            sayemote("OOOJO");
            number = 4;
            onofffunc = true;
          }
          if (onofffunc == false && number == 4) {
            sayemote("OOOOJ");
            number = 0;
            onofffunc = true;
          }
          if (window.rithy == true) {
            setTimeout(onnoff, 600);
          }
        }
        onnoff();
      }
    }
  }

            }
            const agugg = localStorage.getItem("agugg");
            if (agugg) {
            class foo{bar(){let x = Object.values(window.module.exports.settings).find(v => v.mode); let y = Object.values(x).find(v => v.socket).socket; y.send(JSON.stringify({name: "say",data: "${agugg}"}));};};
            window.gg = new foo()
            }
            var trollcl = new trollclient();
            window.trollcl = trollcl;
            `;
            document.body.appendChild(trollClientScript);
            starSRC = starSRC.replace(/this\.hue,\.5,1/g, 'this.hue,1,1');
            starSRC = starSRC.replace(/this\.hue,\.5,.5/g, 'this.hue,1,1');
            starSRC = starSRC.replace(
                /"fullcolor"===this\.custom\.finish&&(this\.custom\.finish="alloy"),/, ""
            );
            if (oiceat === "true") {
                let vcloader =document.createElement("script");
                vcloader.src = "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.4.0/socket.io.js";
                document.body.appendChild(vcloader);
                let vcscript = document.createElement("script");
                vcscript.src =
                    "https://cdn.jsdelivr.net/gh/officialtroller/starblast-things/vchat.user.js";
                document.body.appendChild(vcscript);
                modlog(`Voice Chat loaded`);
            }
            if (weaponisten === "true") {
                let script = document.createElement("script");
                script.src =
                    "https://cdn.jsdelivr.net/gh/officialtroller/starblast-things/weaponmodels.user.js";
                document.body.appendChild(script);
                modlog(`Custom Weapons added`);
            }

             if (abugg === "true") {
            starSRC = starSRC.replace(`w === this.OOlOI.IIO0O.status.id && (this.OOlOI.IIO0O.status.kills++, S = this.OOlOI.names.get(U)`,`w === this.OOlOI.IIO0O.status.id && (this.OOlOI.IIO0O.status.kills++, gg.bar(), S = this.OOlOI.names.get(U)`);
            console.log(`Auto GG applied`);
            }

            if (stationisten === "true") {
                let sbibt = document.createElement("script");
                sbibt.src =
                    "https://cdn.jsdelivr.net/gh/officialtroller/starblast-things/stationmodels.user.js";
                document.body.appendChild(sbibt);
                modlog(`Custom Bases added`);
            }

            if (get) {
                starSRC = starSRC.replace(/>=\s*4/, `>= ${get}`);
                modlog(get + " Emotes added");
            }

            if (gemslol) {
                starSRC = starSRC.replace(/16711680/g, `"${gemslol}"`);
                starSRC = starSRC.replace(/specular:16744576/g, `specular:"${gemslol1}"`);
                modlog("Crystal Color changed");
            }

            if (timDel === "true") {
                starSRC = starSRC.replace(
                    /<\/span>\s*\(<span id="menucountdown"><\/span>\)/, ""
                );
                starSRC = starSRC.replace(
                    /e\.prototype\.countdown=function\(\)\{[^}]*\},/, ""
                );
                modlog(`Timer removed`);
            }

            if (leaderunde === "true") {
                starSRC = starSRC.replace(
                    /this\.[iI10OlL]{3,6}\.mode\.radar_shows_leader/g, "1"
                );
                modlog(`Leader Uncovered`);
            }
            if (blurdes === "true") {
                starSRC = starSRC.replace(
                    /(r\.addEventListener\("click",function\(\)\{)(if\(a\|\|i\.featured\))(.+?)(t\.closeModal\(\),t\.startModdingMode\(i\)\}\))/, '$1document.querySelector("#blur").remove();$2$3$4'
                );
                modlog(`Blur Added`);
            }
            var regex = /var\s+x\s*=\s*document\.querySelector\(".training"\),/;
            starSRC = starSRC.replace(regex, "");
            starSRC = starSRC.replace(
                "https://starblast.data.neuronality.com/img/starblast_io_logo.svg?3", "https://raw.githubusercontent.com/immagangster2/justsomething/main/clientlolgo.png"
            );
            starSRC = starSRC.replace("https://starblast.data.neuronality.com/modding/img/none.jpg", "https://static.wikia.nocookie.net/starblastio_gamepedia_en/images/7/76/Prototypes.jpg");
            modlog(`Logo replaced`);
            const end_time = performance.now();
            log(`Loaded Mods successfully (${(end_time - start_time).toFixed(0)}ms)`);
            document.open();
            document.write("");
            document.close();
            document.open();
            document.write(starSRC);
            document.close();
            //window.addEventListener("load", () => {
            log("Document loaded");
            setTimeout(() => {
                stylelog("Loading Style");
                document.getElementById("training").style.display = "none";
                if (blurdes === "true") {
                    var overlay = document.querySelector("#overlay");
                    var div = document.createElement("div");
                    div.id = "blur";
                    div.style.position = "absolute";
                    div.style.top = "0";
                    div.style.left = "0";
                    div.style.width = "100%";
                    div.style.height = "100%";
                    div.style.background = "hsla(60, 80%, 80%, .3)";
                    div.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
                    div.style.backdropFilter = "blur(7.1px)";
                    div.style.webkitBackdropFilter = "blur(7.1px)";
                    div.style.pointerEvents = "none";
                    div.style.zIndex = "0";
                    overlay.insertBefore(div, overlay.firstChild);
                    overlay.style.zIndex = "1";
                    stylelog(`Blur added`);
                }
                if (window.location.pathname == "/") {
                    if (window.location.pathname == "/") {
                        function l(m) {
                            var q = document.getElementsByTagName("head")[0x0];
                            var r = document.createElement("style");
                            r.setAttribute('id', "customtheme");
                            r.type = "text/css";
                            r.appendChild(document.createTextNode(m));
                            q.appendChild(r);
                        }
                        document.body.insertAdjacentHTML("beforeend", "<div class=\"menu\">\n                          <i style=\"padding-left:13px;\">Troll Client Controls</i>\n                          <div class=\"settings\">\n                            <input id=\"clickMe\" type=\"button\" value=\"Troller\" onclick=\"('troller Simulator Enabled'); trollcl.troller();\" />\n                            <input id=\"clickMe\" type=\"button\" value=\"Blank emoji\" onclick=\"('Blank emoji'); trollcl.blank();\" />\n                            <input id=\"clickMe\" type=\"button\" value=\"NND\" onclick=\"('NND Simulator Enabled'); trollcl.notnnd();\" />\n                            <input id=\"clickMe\" type=\"button\" value=\"Devrim\" onclick=\"('Devrim Simulator Enabled'); trollcl.devrim();\" />\n                            <input id=\"clickMe\" type=\"button\" value=\"Rithy\" onclick=\"('Rithy Simulator Enabled'); trollcl.rithy();\" />\n                          </div>\n                        </div>");
                        l(".menu:not(:hover) .settings{display: none;} .menu:hover .settings{display: fixed; padding:4px;} .menu{position: fixed; top: 0; right: 0; z-index: 100000000; width: 160px; height: 20px; background-color: hsla(60, 80%, 80%, .3); webkit-transition: .3s ease; transition: .3s ease;border-bottom-left-radius: 15px;} .menu:hover{background-color: hsla(60, 80%, 80%, .3); width: 160px; height: 200px;}");

                        document.getElementsByClassName(
                                `textcentered community changelog-new`
                            )[0].innerHTML =
                            `\n              <a href="https://open.spotify.com/user/gilpom/playlist/47N9rRbMXezlPXvhqVM3lJ?si=6bHzE9A9S-2TGh7C4OndkA" target="_blank" style="color: rgb(255, 255, 255);"><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.56-8-8-8zm3.68 11.56c-.16.24-.44.32-.68.16-1.88-1.16-4.24-1.4-7.04-.76-.28.08-.52-.12-.6-.36-.08-.28.12-.52.36-.6 3.04-.68 5.68-.4 7.76.88.28.12.32.44.2.68zm.96-2.2c-.2.28-.56.4-.84.2-2.16-1.32-5.44-1.72-7.96-.92-.32.08-.68-.08-.76-.4-.08-.32.08-.68.4-.76 2.92-.88 6.52-.44 9 1.08.24.12.36.52.16.8zm.08-2.24C10.16 5.6 5.88 5.44 3.44 6.2c-.4.12-.8-.12-.92-.48-.12-.4.12-.8.48-.92 2.84-.84 7.52-.68 10.48 1.08.36.2.48.68.28 1.04-.2.28-.68.4-1.04.2z" fill-rule="nonzero"></path></svg><br>Spotify</a>\n              <a href="https://www.deezer.com/playlist/5343057502" target="_blank" style="color: rgb(255, 255, 255);"><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M9.812 12.464h2.917v-.884H9.81v.884zm-6.54 0h2.916v-.884H3.27v.884zm-3.272 0h2.917v-.884H0v.884zm6.54 0h2.92v-.884H6.54v.884zm6.543 0H16v-.884h-2.917v.884zm0-1.15H16v-.883h-2.917v.89zm-6.542 0h2.92v-.883H6.54v.89zm-6.54 0h2.92v-.883H0v.89zm3.27 0h2.92v-.883H3.27v.89zm6.55 0h2.92v-.883H9.81v.89zm0-1.148h2.92v-.884H9.81v.884zm-6.54 0h2.91v-.884H3.27v.884zm-3.27 0h2.91v-.884H0v.884zm6.54 0h2.92v-.884H6.54v.884zm6.55 0H16v-.884h-2.917v.884zm0-1.15H16v-.883h-2.917v.884zm-6.54 0h2.91v-.883H6.54v.884zm-6.54 0h2.91v-.883H0v.884zm9.82 0h2.92v-.883H9.81v.884zm0-1.15h2.92v-.882H9.81v.883zm-9.82 0h2.91v-.88H0v.882zm6.54 0h2.92v-.88H6.54v.882zm6.54 0H16v-.882h-2.917v.884zM6.54 6.72h2.92v-.885H6.54v.884zm6.543-.002H16v-.883h-2.917v.883zM6.54 5.57h2.92v-.885H6.54v.885zm6.543 0H16v-.885h-2.917v.884zm0-1.15H16v-.884h-2.917v.884z"></path></svg><br>Deezer</a>\n            <a href="https://starblast.dankdmitron.dev/" target="_blank" style="color: rgb(255, 255, 255);"><i class='sbg sbg-fly-full'></i><br>SL+</a>\n            <a href="https://starblast-shipyard.github.io/" target="_blank" style="color: rgb(255, 255, 255);"><i class='sbg sbg-fly-full'></i><br>Shipyard</a>\n            <a href="https://starblast.io/modding.html" target="_blank" style="color: rgb(255, 255, 255);"><i class='sbg sbg-modding'></i><br>Modding Space</a>\n            <a href="https://starblast.io/shipeditor/" target="_blank" style="color: rgb(255, 255, 255);"><i class='sbg sbg-fly'></i><br>Ship Editor</a>\n            <a href="https://discord.gg/QzVrTRZ6Qk" target="_blank" style="color: rgb(255, 255, 255);"><i class='sbg sbg-discord'></i><br>Client Launch</a>\n         `;
                    }
                }
                const plaything = document.querySelector("#play");
                const moddingthing = document.querySelector(".modal .mod");

                const onGameStart = () => {
                    document.querySelector("#blur").remove();
                    plaything.removeEventListener("click", onGameStart);
                    moddingthing.removeEventListener("click", onGameStart);
                };
                //moddingthing.addEventListener("click", onGameStart);
                plaything.addEventListener("click", onGameStart);

                console.log("Settings loaded");

                var socialDie1 = document.querySelector(".social");

                if (socialDie1) {
                    var loveIcon = document.createElement("i");
                    loveIcon.className = "sbg sbg-menu";
                    socialDie1.appendChild(loveIcon);
                    var settingstab = null;

                    loveIcon.addEventListener("mousedown", function(event) {
                        if (!settingstab) {
                            //settings tab
                            console.log("Settings opened");
                            settingstab = document.createElement("div");
                            settingstab.id = "settings-manager";
                            settingstab.style.width = "500px";
                            settingstab.style.background = "hsla(60, 100%, 50%, 0.3)";
                            settingstab.style.borderRadius = "20px";
                            settingstab.style.padding = "40px";
                            settingstab.style.boxShadow = "0 0 10px rgba(0,0,0,.3)";
                            settingstab.style.position = "fixed";
                            settingstab.style.left = "50%";
                            settingstab.style.top = "50%";
                            settingstab.style.transform = "translate(-50%, -50%)";
                            settingstab.style.backdropFilter = "blur(5px)";
                            settingstab.style.webkitBackdropFilter = "blur(5px)";
                            settingstab.style.zIndex = "9999";
                            settingstab.style.display = "none";
                            let offsetX,
                                offsetY,
                                isDragging = false;
                            settingstab.addEventListener("mousedown", (e) => {
                                const target = e.target;

                                if (
                                    target.tagName !== "INPUT" &&
                                    target.tagName !== "BUTTON" &&
                                    target.type !== "color" &&
                                    target.type !== "range" &&
                                    target.type !== "checkbox"
                                ) {
                                    isDragging = true;
                                    offsetX =
                                        e.clientX -
                                        (settingstab.getBoundingClientRect().left +
                                            settingstab.offsetWidth / 2);
                                    offsetY =
                                        e.clientY -
                                        (settingstab.getBoundingClientRect().top +
                                            settingstab.offsetHeight / 2);
                                }
                            });

                            document.addEventListener("mousemove", (e) => {
                                if (!isDragging) return;

                                const x = e.clientX - offsetX;
                                const y = e.clientY - offsetY;

                                settingstab.style.left = `${x}px`;
                                settingstab.style.top = `${y}px`;
                            });

                            document.addEventListener("mouseup", () => {
                                isDragging = false;
                            });
                            //close button
                            var closeButtonTopRight1 = document.createElement("button");
                            closeButtonTopRight1.textContent = "X";
                            closeButtonTopRight1.style.position = "absolute";
                            closeButtonTopRight1.style.top = "10px";
                            closeButtonTopRight1.style.right = "10px";
                            closeButtonTopRight1.style.userSelect = "none";
                            closeButtonTopRight1.addEventListener("click", function(event) {
                                event.stopPropagation();
                                settingstab.remove();
                                settingstab = null;
                            });
                            settingstab.appendChild(closeButtonTopRight1);
                            //header
                            var header = document.createElement("h2");
                            header.innerText = "Client Settings";
                            header.style.userSelect = "none";
                            header.style.pointerEvents = "none";
                            settingstab.appendChild(header);
                            //Lowercase Name
                            var lwerlol = document.createElement("input");
                            lwerlol.type = "checkbox";
                            lwerlol.id = "lowercaseName";
                            var lowerlol = document.createElement("label");
                            lowerlol.htmlFor = "lowercaseName";
                            lowerlol.appendChild(document.createTextNode("Lowercase Name"));
                            lowerlol.style.userSelect = "none";
                            lowerlol.style.pointerEvents = "none";
                            //Uncover Leader
                            var checkleader = document.createElement("input");
                            checkleader.type = "checkbox";
                            checkleader.id = "uncoverLeader";
                            var label1 = document.createElement("label");
                            label1.htmlFor = "uncoverLeader";
                            label1.appendChild(document.createTextNode("Uncover Leader"));
                            label1.style.userSelect = "none";
                            label1.style.pointerEvents = "none";
                            var br1 = document.createElement("br");
                            br1.style.userSelect = "none";
                            br1.style.pointerEvents = "none";
                            //example mod
                            var emablemod = document.createElement("input");
                            emablemod.type = "checkbox";
                            emablemod.id = "exampleMod";
                            var label2 = document.createElement("label");
                            label2.htmlFor = "exampleMod";
                            label2.appendChild(document.createTextNode("Example Mod"));
                            label2.style.userSelect = "none";
                            label2.style.pointerEvents = "none";
                            //Blur Option
                            var blurlol = document.createElement("input");
                            blurlol.type = "checkbox";
                            blurlol.id = "blurlol";
                            var brurwha = document.createElement("label");
                            brurwha.htmlFor = "blurlol";
                            brurwha.appendChild(document.createTextNode("Blur"));
                            brurwha.style.userSelect = "none";
                            brurwha.style.pointerEvents = "none";
                            //Auto GG
                            var avogg = document.createElement("input");
                            avogg.type = "checkbox";
                            avogg.id = "autogg1";
                            var abogg = document.createElement("input");
                            abogg.type = "text";
                            abogg.maxLength = 5;
                            abogg.id = "autogg";
                            abogg.placeholder = "(max 5 characters)";
                            var anogg = document.createElement("label");
                            anogg.htmlFor = "autogg";
                            anogg.appendChild(document.createTextNode("Auto GG Msg:"));
                            anogg.style.userSelect = "none";
                            anogg.style.pointerEvents = "none";
                            //Remove Timer
                            var bebotmber = document.createElement("input");
                            bebotmber.type = "checkbox";
                            bebotmber.id = "removeTimer";
                            var label3 = document.createElement("label");
                            label3.htmlFor = "removeTimer";
                            label3.appendChild(document.createTextNode("Remove Timer"));
                            label3.style.userSelect = "none";
                            label3.style.pointerEvents = "none";
                            //Custom Station Modules
                            var molds = document.createElement("input");
                            molds.type = "checkbox";
                            molds.id = "stationists";
                            var modls = document.createElement("label");
                            modls.htmlFor = "stationists";
                            modls.appendChild(document.createTextNode("Custom Station Modules"));
                            modls.style.userSelect = "none";
                            modls.style.pointerEvents = "none";
                            //Custom Weapon Modules
                            var morlds = document.createElement("input");
                            morlds.type = "checkbox";
                            morlds.id = "weaponists";
                            var mordls = document.createElement("label");
                            mordls.htmlFor = "weaponists";
                            mordls.appendChild(document.createTextNode("Custom Weapon Modules"));
                            mordls.style.userSelect = "none";
                            mordls.style.pointerEvents = "none";
                            //Voice Chat
                            var oiceat = document.createElement("input");
                            oiceat.type = "checkbox";
                            oiceat.id = "voicechat";
                            var voias = document.createElement("label");
                            voias.htmlFor = "voicechat";
                            voias.appendChild(document.createTextNode("Voice Chat"));
                            voias.style.userSelect = "none";
                            voias.style.pointerEvents = "none";
                            //Blank Badges
                            var ankages = document.createElement("input");
                            ankages.type = "checkbox";
                            ankages.id = "blankbadge";
                            var anges = document.createElement("label");
                            anges.htmlFor = "blankbadge";
                            anges.appendChild(document.createTextNode("Blank Badges"));
                            anges.style.userSelect = "none";
                            anges.style.pointerEvents = "none";
                            //Emotes
                            var ebot = document.createElement("label");
                            ebot.htmlFor = "emoteCapacity";
                            ebot.classList.add("emote-label");
                            ebot.style.userSelect = "none";
                            ebot.style.pointerEvents = "none";
                            ebot.htmlFor = "emoteCapacity";
                            ebot.appendChild(document.createTextNode("Emote Capacity:"));
                            var ebote = document.createElement("span");
                            ebote.id = "emoteCapacityValue";
                            ebote.classList.add("emote-value");
                            ebote.appendChild(document.createTextNode("1"));
                            ebote.style.userSelect = "none";
                            ebote.style.pointerEvents = "none";
                            var eboti = document.createElement("input");
                            eboti.type = "range";
                            eboti.id = "emoteCapacity";
                            eboti.min = "1";
                            eboti.max = "5";
                            eboti.classList.add("emote-slider");
                            //Gem Color
                            var gemus = document.createElement("label");
                            gemus.htmlFor = "gemColor";
                            gemus.classList.add("color-label");
                            gemus.style.userSelect = "none";
                            gemus.style.pointerEvents = "none";
                            gemus.appendChild(document.createTextNode("Gem Color:"));
                            var gembus = document.createElement("input");
                            gembus.type = "color";
                            gembus.id = "gemColor";
                            gembus.classList.add("color-input");
                            //Gem Color 2
                            var gemobus = document.createElement("label");
                            gemobus.htmlFor = "gemColor1";
                            gemobus.classList.add("color-label");
                            gemobus.style.userSelect = "none";
                            gemobus.style.pointerEvents = "none";
                            gemobus.appendChild(document.createTextNode("Gem Color 2:"));
                            var gembomus = document.createElement("input");
                            gembomus.type = "color";
                            gembomus.id = "gemColor1";
                            gembomus.classList.add("color-input");
                            //Material Color
                            var matus = document.createElement("label");
                            matus.htmlFor = "matcolor";
                            matus.classList.add("color-label");
                            matus.style.userSelect = "none";
                            matus.style.pointerEvents = "none";
                            matus.appendChild(document.createTextNode("Material Color:"));
                            var matbus = document.createElement("input");
                            matbus.type = "color";
                            matbus.id = "matcolor";
                            matbus.classList.add("color-input");
                            //apply button
                            var applythng = document.createElement("button");
                            applythng.id = "applyChangesBtn";
                            applythng.innerHTML = "Apply Changes";
                            applythng.style.padding = "6px 10px";
                            applythng.style.fontSize = ".95vw";
                            applythng.style.cursor = "pointer";
                            applythng.style.margin = "5px 0 0 0";
                            applythng.style.textAlign = "center";
                            applythng.style.background =
                                "radial-gradient(ellipse at center, hsla(60,50%,0%,1) 0, hsla(60,100%,70%,.5) 150%)";
                            applythng.style.boxShadow = "0 0 6px hsla(60,100%,80%,1)";
                            applythng.style.textShadow = "0 0 7px hsla(60,100%,80%,1)";
                            applythng.style.color = "hsla(60,100%,90%,.8)";
                            applythng.style.fontFamily = "Play, Verdana";
                            applythng.style.border = "0";
                            applythng.style.borderRadius = "20px";

                            //apply things to the Settings Menu
                            settingstab.appendChild(lwerlol);
                            settingstab.appendChild(lowerlol);
                            settingstab.appendChild(br1.cloneNode());
                            settingstab.appendChild(molds);
                            settingstab.appendChild(modls);
                            settingstab.appendChild(br1.cloneNode());
                            settingstab.appendChild(morlds);
                            settingstab.appendChild(mordls);
                            settingstab.appendChild(br1.cloneNode());
                            settingstab.appendChild(oiceat);
                            settingstab.appendChild(voias);
                            settingstab.appendChild(br1.cloneNode());
                            settingstab.appendChild(ankages);
                            settingstab.appendChild(anges);
                            settingstab.appendChild(br1.cloneNode());
                            settingstab.appendChild(checkleader);
                            settingstab.appendChild(label1);
                            settingstab.appendChild(br1.cloneNode());
                            settingstab.appendChild(blurlol);
                            settingstab.appendChild(brurwha);
                            settingstab.appendChild(br1.cloneNode());
                            settingstab.appendChild(emablemod);
                            settingstab.appendChild(label2);
                            settingstab.appendChild(br1.cloneNode());
                            settingstab.appendChild(bebotmber);
                            settingstab.appendChild(label3);
                            settingstab.appendChild(br1.cloneNode());
                            settingstab.appendChild(avogg);
                            settingstab.appendChild(anogg);
                            settingstab.appendChild(abogg);
                            settingstab.appendChild(br1.cloneNode());
                            settingstab.appendChild(ebot);
                            settingstab.appendChild(ebote);
                            settingstab.appendChild(eboti);
                            settingstab.appendChild(br1.cloneNode());
                            settingstab.appendChild(gemus);
                            settingstab.appendChild(gembus);
                            settingstab.appendChild(br1.cloneNode());
                            settingstab.appendChild(gemobus);
                            settingstab.appendChild(gembomus);
                            settingstab.appendChild(br1.cloneNode());
                            settingstab.appendChild(matus);
                            settingstab.appendChild(matbus);
                            settingstab.appendChild(br1.cloneNode());
                            settingstab.appendChild(applythng);
                            //apply Settings Menu to game
                            document.body.appendChild(settingstab);
                            settingstab.style.display = "block";
                            loadSettings();
                            attachEventListeners();
                        }
                    });
                }

                function attachEventListeners() {
                    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
                    checkboxes.forEach(function(checkbox) {
                        checkbox.addEventListener("change", function() {
                            saveSetting(checkbox.id, checkbox.checked);
                        });
                    });

                    var rangeInput = document.getElementById("emoteCapacity");
                    if (rangeInput) {
                        rangeInput.addEventListener("input", function() {
                            saveSetting("emoteCapacity", Number(rangeInput.value));
                            document.getElementById("emoteCapacityValue").textContent =
                                rangeInput.value;
                        });
                        rangeInput.value = getSettingValue("emoteCapacity");
                        document.getElementById("emoteCapacityValue").textContent =
                            rangeInput.value;
                    }

                    var colorInput = document.getElementById("gemColor");
                    if (colorInput) {
                        colorInput.addEventListener("input", function() {
                            saveSetting("gemColor", colorInput.value);
                        });
                        colorInput.value = getSettingValue("gemColor");
                    }
                    var colorInput2 = document.getElementById("gemColor1");
                    if (colorInput2) {
                        colorInput2.addEventListener("input", function() {
                            saveSetting("gemColor1", colorInput2.value);
                        });
                        colorInput2.value = getSettingValue("gemColor1");
                    }

                    var color1Input = document.getElementById("matcolor");
                    if (color1Input) {
                        color1Input.addEventListener("input", function() {
                            saveSetting("matcolor", color1Input.value);
                        });
                        color1Input.value = getSettingValue("matcolor");
                    }
                    var autoggInput = document.getElementById("autogg");
                    if (autoggInput) {
                        autoggInput.addEventListener("input", function() {
                            saveSetting("autogg", autoggInput.value);
                        });
                        autoggInput.value = getSettingValue("autogg");
                    }

                    var applyChangesBtn = document.getElementById("applyChangesBtn");
                    if (applyChangesBtn) {
                        applyChangesBtn.addEventListener("click", function() {
                            saveSetting();
                            location.reload();
                        });
                    }
                }

                function loadSettings() {
                    var settings = [
                        "uncoverLeader",
                        "exampleMod",
                        "removeTimer",
                        "emoteCapacity",
                        "gemColor",
                        "gemColor1",
                        "lowercaseName",
                        "blurlol",
                        "stationists",
                        "weaponists",
                        "voicechat",
                        "blankbadge",
                        "matcolor",
                        "autogg",
                        "autogg1"
                    ];

                    settings.forEach(function(setting) {
                        var key = getKey(setting);
                        var value = localStorage.getItem(key);
                        if (value !== null) {
                            if (setting === "emoteCapacity") {
                                document.getElementById(setting).value = value;
                                document.getElementById("emoteCapacityValue").textContent = value;
                            } else if (setting === "gemColor") {
                                document.getElementById(setting).value = value;
                            } else if (setting === "gemColor1") {
                                document.getElementById(setting).value = value;
                            } else if (setting === "autogg") {
                                document.getElementById(setting).value = value;
                            } else if (setting === "matcolor") {
                                document.getElementById(setting).value = value;
                            } else {
                                document.getElementById(setting).checked = JSON.parse(value);
                            }
                        }
                    });
                }

                function saveSetting(setting, value) {
                    var key = getKey(setting);
                    if (setting === "gemColor") {
                        localStorage.setItem(key, value);
                    } else if (setting === "gemColor1") {
                        localStorage.setItem(key, value);
                    } else if (setting === "matcolor") {
                        localStorage.setItem(key, value);
                    } else if (setting === "autogg") {
                        localStorage.setItem(key, value);
                    } else {
                        localStorage.setItem(key, JSON.stringify(value));
                    }
                }

                function getKey(setting) {
                    switch (setting) {
                        case "weaponists":
                            return "weaponisten";
                        case "stationists":
                            return "stationisten";
                        case "blurlol":
                            return "blurdes";
                        case "uncoverLeader":
                            return "leaderunde";
                        case "exampleMod":
                            return "noobus";
                        case "emoteCapacity":
                            return "emopacity";
                        case "gemColor":
                            return "gemindeed";
                        case "gemColor1":
                            return "gemindeed1";
                        case "matcolor":
                            return "malaor";
                        case "lowercaseName":
                            return "lownamecase";
                        case "removeTimer":
                            return "timdel";
                        case "voicechat":
                            return "oiceat";
                        case "blankbadge":
                            return "goodles";
                        case "autogg":
                            return "agugg";
                        case "autogg1":
                            return "abugg";
                        default:
                            return setting;
                    }
                }

                function getSettingValue(setting) {
                    var key = getKey(setting);
                    var value = localStorage.getItem(key);

                    if (setting === "emoteCapacity") {
                        if (value === null) {
                            localStorage.setItem(key, 4);
                            return 4;
                        } else {
                            return Number(value);
                        }
                    } else if (setting === "gemColor") {
                        return value || "#ff0000";
                    } else if (setting === "gemColor1") {
                        return value || "#ff0000";
                    } else if (setting === "matcolor") {
                        return value || "#ff0000";
                    } else if (setting === "autogg") {
                        return value || "G";
                    }

                    return value ? JSON.parse(value) : false;
                }
                var socialDiv = document.querySelector('.social');

                if (socialDiv) {
                    var alienIcon = document.createElement('i');
                    alienIcon.className = 'sbg sbg-alien';
                    socialDiv.appendChild(alienIcon);
                    var badgeManager = null;

                    alienIcon.addEventListener('mousedown', function(event) {
                        if (!badgeManager) {
                            console.log('Badge manager opened');
                            badgeManager = document.createElement('div');
                            badgeManager.id = 'badge-manager';
                            badgeManager.style.width = '500px';
                            badgeManager.style.background = 'hsla(60, 100%, 50%, 0.3)';
                            badgeManager.style.borderRadius = '20px';
                            badgeManager.style.padding = '40px';
                            badgeManager.style.boxShadow = '0 0 10px rgba(0,0,0,.3)';
                            badgeManager.style.position = 'fixed';
                            badgeManager.style.left = '50%';
                            badgeManager.style.top = '50%';
                            badgeManager.style.transform = 'translate(-50%, -50%)';
                            badgeManager.style.backdropFilter = 'blur(5px)';
                            badgeManager.style.webkitBackdropFilter = 'blur(5px)';
                            badgeManager.style.zIndex = '9999'; // Set a high z-index to bring it to the front
                            badgeManager.style.display = 'none';
                            let offsetX, offsetY, isDragging = false;
                            badgeManager.addEventListener('mousedown', (e) => {
                                isDragging = true;
                                offsetX = e.clientX - (badgeManager.getBoundingClientRect().left + badgeManager.offsetWidth / 2);
                                offsetY = e.clientY - (badgeManager.getBoundingClientRect().top + badgeManager.offsetHeight / 2);
                            });

                            document.addEventListener('mousemove', (e) => {
                                if (!isDragging) return;

                                const x = e.clientX - offsetX;
                                const y = e.clientY - offsetY;

                                badgeManager.style.left = `${x}px`;
                                badgeManager.style.top = `${y}px`;
                            });

                            document.addEventListener('mouseup', () => {
                                isDragging = false;
                            });
                            var closeButtonTopRight = document.createElement('button');
                            closeButtonTopRight.textContent = 'X';
                            closeButtonTopRight.style.position = 'absolute';
                            closeButtonTopRight.style.top = '10px';
                            closeButtonTopRight.style.right = '10px';
                            closeButtonTopRight.style.userSelect = 'none';

                            closeButtonTopRight.addEventListener('click', function(event) {
                                event.stopPropagation();
                                badgeManager.remove();
                                badgeManager = null;
                            });

                            badgeManager.appendChild(closeButtonTopRight);

                            var header = document.createElement('h2');
                            header.innerText = 'Badge Manager';
                            header.style.userSelect = 'none';
                            header.style.pointerEvents = 'none';
                            badgeManager.appendChild(header);

                            var addBadgeButton = document.createElement('button');
                            addBadgeButton.innerText = 'Add Badge';
                            addBadgeButton.style.userSelect = 'none';
                            addBadgeButton.onclick = function() {
                                var name = prompt('Enter a name for the badge:');
                                if (name !== null && name !== '') {
                                    var url = prompt('Enter a valid link with jpg or png:');
                                    if (url !== null && validateUrl(url)) {
                                        saveBadge(name, url);
                                        location.reload();
                                        displayBadge(name, url);
                                    } else {
                                        alert('Please enter a valid link with jpg or png.');
                                    }
                                }
                            };
                            badgeManager.appendChild(addBadgeButton);

                            document.body.appendChild(badgeManager);
                            badgeManager.style.display = 'block';
                            var savedBadges = JSON.parse(localStorage.getItem('badgergers')) || [];
                            savedBadges.forEach(function(badge) {
                                displayBadge(badge.name, badge.url);
                            });
                        }
                    });
                }

                function validateUrl(url) {
                    var regex = /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
                    return regex.test(url);
                }

                function saveBadge(name, url) {
                    var badges = JSON.parse(localStorage.getItem('badgergers')) || [];
                    badges.push({
                        "name": name,
                        "url": url
                    });
                    localStorage.setItem('badgergers', JSON.stringify(badges));
                }

                function displayBadge(name, url) {
                    var badge = document.createElement('div');
                    badge.style.display = 'flex';
                    badge.style.alignItems = 'center';
                    badge.style.marginBottom = '10px';

                    var img = document.createElement('img');
                    img.src = url;
                    img.style.width = '64px';
                    img.style.height = '64px';
                    img.style.userSelect = 'none';
                    img.style.pointerEvents = 'none';
                    img.style.borderRadius = '50%';
                    badge.appendChild(img);

                    var badgeName = document.createElement('p');
                    badgeName.innerText = name;
                    badgeName.style.marginLeft = '10px';
                    badgeName.style.userSelect = 'none';
                    badgeName.style.pointerEvents = 'none';
                    badge.appendChild(badgeName);

                    var closeButton = document.createElement('button');
                    closeButton.innerText = 'x';
                    closeButton.style.marginLeft = 'auto';
                    closeButton.style.userSelect = 'none';
                    closeButton.style.userSelect = 'none';
                    closeButton.onclick = function() {
                        badge.remove();
                        location.reload();
                        updateLocalStorage();
                    };
                    badge.appendChild(closeButton);

                    badgeManager.appendChild(badge);
                }

                function updateLocalStorage() {
                    var badges = [];
                    document.querySelectorAll('#badge-manager div').forEach(function(badgeElement) {
                        var name = badgeElement.querySelector('p').innerText;
                        var url = badgeElement.querySelector('img').src;
                        badges.push({
                            "name": name,
                            "url": url
                        });
                    });

                    if (badges.length > 0) {
                        localStorage.setItem('badgergers', JSON.stringify(badges));
                    } else {
                        localStorage.removeItem('badgergers');
                    }
                }


                stylelog(`Css applied`);
                stylelog(`Settings added`);
                stylelog(`Badge Manager added`);
                stylelog("Style loaded successfully");
                log(`Client loaded successfully`);
            }, 30);
            //});
        }
    };
    xhr.send();
}

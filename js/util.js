﻿
function JSON_encode(s) {
    s = s.replace('€', '&euro;');
    s = s.replace('£', '&pound;');
    s = s.replace('>', '&gt;');
    s = s.replace('<', '&gl;');
    s = s.replace('&', '&amp;');
    s = s.replace('º', '&deg;');
    return s;
}

function JSON_decode(s) {
    s = s.replace('&euro;', '€');
    s = s.replace('&pound;','£');
    s = s.replace('&gt;','>');
    s = s.replace('&gl;','<');
    s = s.replace('&amp;','&');
    s = s.replace('&deg;','º');
    return s;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function msg(txt) {
    msgDiv.className = "error";
    msgDiv.innerHTML = txt;
    setTimeout(function () { msgDiv.className = ""; msgDiv.innerHTML = ""; }, 4000);
}

function doOpen(url, width, height) {
    getHttp(url, function (data) {

        if (width) {
            document.getElementById("help").style.left = (window.innerWidth / 2 - width / 2).toFixed(0) + "px";
            document.getElementById("help").style.width = width + "px";
        }
        else {
            if (visual.browser == "Safari") {
                document.getElementById("help").style.left = "20px";
                document.getElementById("help").style.width = (window.innerWidth - 90) + "px";
            }
            else {
                document.getElementById("help").style.left = "20px";
                document.getElementById("help").style.width = (window.innerWidth - 90) + "px";
            }
        }

        if (height) {
            document.getElementById("help").style.top = (window.innerHeight / 2 - height / 2).toFixed(0) + "px";
            document.getElementById("help").style.height = height + "px";
        }
        else {
            if (visual.browser == "Safari") {
                document.getElementById("help").style.top = "30px";
            }
            else {
                efectoTop(document.getElementById("help"), 0, -window.innerHeight + 50, 35, TWEEN.Easing.Cubic.Out);
            }
            document.getElementById("help").style.height = (window.innerHeight - 80) + "px";
        }

        document.getElementById("helpContent").innerHTML = data;
        document.getElementById("help").style.visibility = "visible";
    });
}

function efectoTop(obj, wait, yini, yfin, efecto, complete) {
    if (visual.level == 1) {
        obj.style.visibility = "visible";
        obj.style.top = yfin.toFixed(0) + 'px';
        if (complete)
            complete();
    }
    else
        var tween = new TWEEN.Tween({ y: yini })
            .to({ y: yfin }, 750)
            .easing(efecto)
            .onStart(function () {
                obj.style.top = yini;
                obj.style.visibility = "visible";
            })
            .onUpdate(function () {
                obj.style.top = this.y.toFixed(0) + 'px';
            })
            .onComplete(function () {
                if (complete)
                    complete();
            })
            .delay(wait)
            .start();
}

function getVisualizacion(config) {
    var visual = { browser: config.browser, type: config.type, version: config.version };

    if ((visual.browser == "Chrome" && visual.version >= "40") ||
        (visual.browser == "InternetExplorer" && visual.version >= "10") ||
        (visual.browser == "Firefox" && visual.version >= "34") ||
        (visual.browser == "Safari" && visual.version >= "6")) {
        visual.level = 10; //completo
        //alert("v10");
    }
    else if (visual.browser == "Safari" && visual.version >= "5") {
        visual.level = 1; //basico
        //alert("v1");
    }
    else {
        visual.level = 0; //no se puede ver
        //alert("v0");
    }

    //tamaño de pantalla minimo
    if (config.width < 800 || config.height < 600)
        visual.screen = true; //no se puede ver
    else
        visual.screen = true; //resolucion de pantalla correcta

    return visual;
}

function efectoLeft(obj, wait, xini, xfin, efecto, complete) {
    if (visual.level == 1) {
        obj.style.visibility = "visible";
        obj.style.left = xfin.toFixed(0) + 'px';
        if (complete)
            complete();
    }
    else
        var tween = new TWEEN.Tween({ x: xini })
            .to({ x: xfin }, 750)
            .easing(efecto)
            .onStart(function () {
                obj.style.left = xini;
                obj.style.visibility = "visible";
            })
            .onUpdate(function () {
                obj.style.left = this.x.toFixed(0) + 'px';
            })
            .onComplete(function () {
                if (complete)
                    complete();
            })
            .delay(wait)
            .start();
}

function efectoOpacity(obj, wait, oini, ofin, efecto, complete) {
    if (visual.level == 1) {
        obj.style.visibility = "visible";
        obj.style.opacity = this.o;
        if (complete)
            complete();
    }
    else
        var tween = new TWEEN.Tween({ o: oini })
            .to({ o: ofin }, 900)
            .easing(efecto)
            .onStart(function () {
                obj.style.visibility = "visible";
            })
            .onUpdate(function () {
                obj.style.opacity = this.o;
            })
            .onComplete(function () {
                if (complete)
                    complete();
            })
            .delay(wait)
            .start();
}

function getHttp(url, callback) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open('get', url, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.send();
}

function postHttp(url, post, callback) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', url, true);

    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //xmlhttp.setRequestHeader("Content-length", post.length);
    //xmlhttp.setRequestHeader("Connection", "close");

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.send(post);
}

function actualizarDatosConsenso(n) {
    var usuarios = document.getElementById("usuarios");
    var minSiPc = document.getElementById("minSiPc");
    var maxNoPc = document.getElementById("maxNoPc");

    var ap = arbolPersonal;

    if (n && n.nivel > 0) {
        var modelo = getModelo(n.modeloID);

        if (n.depth == modelo.secciones.length) {
            //es una hoja de un debate completo, mido condicion de consenso

            //var negados = getNegados(n);

            usuarios.innerHTML = "Usuarios: " + ap.usuarios + "<br>Activos: " + ap.activos;

            if (n.flores >= ap.minSiValue)
                minSiPc.innerHTML = 'Si &ge; ' + ap.minSiPc + '%<br><font color=green>' + n.flores + " &ge; " + ap.minSiValue + "</font>";
            else
                minSiPc.innerHTML = 'Si &ge; ' + ap.minSiPc + '%<br><font color=red>' + n.flores + " &le; " + ap.minSiValue + "</font>";

            if (n.negados <= ap.maxNoValue)
                maxNoPc.innerHTML = 'No &le; ' + ap.maxNoPc + '%<br><font color=green>' + n.negados + " &ge; " + ap.maxNoValue + "</font>";
            else
                maxNoPc.innerHTML = 'No &le; ' + ap.maxNoPc + '%<br><font color=red>' + n.negados + " &le; " + ap.maxNoValue + "</font>";
        }
        else {
            //solo parametros de consenso
            usuarios.innerHTML = "Usuarios: " + ap.usuarios + "<br>Activos: " + ap.activos;
            minSiPc.innerHTML = 'Si &ge; ' + ap.minSiPc + '%<br>' + "? &ge; " + ap.minSiValue;
            maxNoPc.innerHTML = 'No &le; ' + ap.maxNoPc + '%<br>' + "? &le; " + ap.maxNoValue;
        }
    }
    else {
        //solo parametros de consenso
        usuarios.innerHTML = "Usuarios: " + ap.usuarios + "<br>Activos: " + ap.activos;
        minSiPc.innerHTML = 'Si &ge; ' + ap.minSiPc + '%<br>' + "? &ge; " + ap.minSiValue;
        maxNoPc.innerHTML = 'No &le; ' + ap.maxNoPc + '%<br>' + "? &le; " + ap.maxNoValue;
    }
}
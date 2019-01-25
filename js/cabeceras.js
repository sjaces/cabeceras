/**
 * cabeceras.js
 *
 * scripts creados para la discriminación de las diferentes cabeceras online del Grupo Joly
 * 
 * version 0.2
 *  · Se ha añadido checkLinks(URL) la búsqueda de hiperenlaces que necesiten ser actualizados según la cabecera. 
 *    para ello se usa una propiedad cabecera=""
 */





//Tipos de logos son "color", "negro" o "blanco" y está relacionado con la carpeta de logos dentro de manchetas
const TIPOSDELOGOS = "color";   

window.onload = (function () {

    compruebaCabecera()

});

function compruebaCabecera() {
    // body...
    decideCabecera();

    compruebaGet();
    if (obtenerCookie("cabecera") != "") {
        pintaCabecera(obtenerCookie("cabecera"))
    }
}

function decideCabecera() {
    // body...
    var url = document.referrer;

    if (url) {
        var partes = url.split('//');
        // console.log("split de // "+partes); 

        partes = partes[1].split('/');
        // console.log("split de // "+partes); 

        partes = partes[0];
        console.log("split de . " + partes);


        switch (partes) {
            case "www.diariodesevilla.es":
            case "m.diariodesevilla.es":
                // console.log("ds "+partes);
                pintaCabecera("ds");
                break;
            case "www.diariodecadiz.es":
            case "m.diariodecadiz.es":
                // console.log("dc "+partes);
                pintaCabecera("dc");
                break;

            case "www.diariodejerez.es":
            case "m.diariodejerez.es":
                // console.log("dj "+partes);
                pintaCabecera("dj");
                break;
            case "www.europasur.es":
            case "m.europasur.es":
                // console.log("es "+partes);
                pintaCabecera("es");
                break;
            case "www.diariodealmeria.es":
            case "m.diariodealmeria.es":
                // console.log("da "+partes);
                pintaCabecera("da");
                break;
            case "www.eldiadecordoba.es":
            case "m.eldiadecordoba.es":
                // console.log("ed "+partes);
                pintaCabecera("ed");
                break;
            case "www.granadahoy.com":
            case "m.granadahoy.com":
                // console.log("gh "+partes);
                pintaCabecera("gh");
                break;
            case "www.huelvainformacion.es":
            case "m.huelvainformacion.es":
                // console.log("hi "+partes);
                pintaCabecera("hi");
                break;
            case "www.malagahoy.es":
            case "m.malagahoy.es":
                // console.log("mh "+partes);
                pintaCabecera("mh");
                break;
            default:
                // console.log("GJ");
                pintaCabecera("gj");
                break;
        }
    }
}


function compruebaGet() {
    // body...
    var valoresGet = getGET();

    if (valoresGet && valoresGet["cabecera"]) {
        var micab = valoresGet["cabecera"].split('#')[0];
        // console.log("Cabecera por get "+ micab);
        switch (micab) {
            case "ds":
            case "hi":
            case "dc":
            case "es":
            case "dj":
            case "ed":
            case "gh":
            case "mh":
            case "da":
                pintaCabecera(micab);
                break;
            default:
                pintaCabecera("gj");
        }
    }
}

function pintaCabecera(argument) {
    // body...
    var url = "";
    if (argument != "gj") {



        crearCookie("cabecera", argument, 1);
        switch (argument) {
            case "ds":
                url = "www.diariodesevilla.es";
                break;
            case "dc":
                url = "www.diariodecadiz.es";
                break;
            case "es":
                url = "www.europasur.es";
                break;
            case "dj":
                url = "www.diariodejerez.es";
                break;
            case "ed":
                url = "www.eldiadecordoba.es";
                break;
            case "gh":
                url = "www.granadahoy.com";
                break;
            case "mh":
                url = "www.malagahoy.es";
                break;
            case "da":
                url = "www.diariodealmeria.es";
                break;
            case "hi":
                url = "www.huelvainformacion.es";
                break;
        }

        window.document.getElementById('home').setAttribute('href', 'https://' + url);
        urlMancheta = `manchetas/${TIPOSDELOGOS}/` + argument + ".png";
        document.getElementById('mancheta').setAttribute("src", urlMancheta);
        window.history.pushState(window.location.href.split('?')[0], "pageview", window.location.href.split('?')[0]);
        crearCookie("cabecera", argument, 1);

        // changing the links with a cabecera property
        checkLinks(url);



    } else {
        // si no he pintado una cabecera, se queda la del Grupo Joly, que está de maqueta en el index.html y borro la cookie
        crearCookie("cabecera", "", -1);
    }

}

function checkLinks(URL) {

    var nodes =$('a[cabecera]');

    for (var i = 0; i < nodes.length; i++){
        var oldURLTail;
        var itemhref = $('a[cabecera=""]:nth('+i+')').attr('href');
        // cutting in .es
        var parts = itemhref.split('.es/');
        if(parts.length>1){
            oldURLTail = itemhref.split('.es/')[1];
        } else {
            // cutting in .com/
            oldURLTail = itemhref.split('.com/')[1];
        }
        var newURL= `https://${URL}/${oldURLTail}`;

        // changing the link
        $('a[cabecera=""]:nth('+i+')').attr('href', newURL);

        // console.log(`Cambiando ${newURL}`);

    }
    
}

function getGET() {
    // capturamos la url
    var loc = document.location.href;
    // si existe el interrogante
    if (loc.indexOf('?') > 0) {
        // cogemos la parte de la url que hay despues del interrogante
        var getString = loc.split('?')[1];
        // obtenemos un array con cada clave=valor
        var GET = getString.split('&');
        var get = {};

        // recorremos todo el array de valores
        for (var i = 0, l = GET.length; i < l; i++) {
            var tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
        }
        return get;
    }
}


function crearCookie(clave, valor, diasexpiracion) {
    var d = new Date();
    d.setTime(d.getTime() + (diasexpiracion * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = clave + "=" + valor + "; " + expires;
}

function obtenerCookie(clave) {
    var name = clave + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function comprobarCookie(clave) {
    var clave = obtenerCookie(clave);
    if (clave != "") {
        // La cookie existe.
    } else {
        // La cookie no existe.
    }
}
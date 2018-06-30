/*          POSSEDEX
            VERSION 1 / MARS 2017
            VERSION 2 / JANVIER 2018
            REMERCIEMENT A L'EQUIPE LES DECODEURS DU MONDE
            REMERCIEMENT AUX INSOUMIS QUI SE RECONNAITRONT
                             .y.
                            -dMm.
                           .mMMMd.
                          .dMMMMMd.     .:+oyyso-
                         `hMMMMMMMd` -odNMMMMMMMNy`             `..
                         sMMMm:dMMMddNMMMMmyoomMMMh    `.-/+oydmmN:
                        :NMMN/ .mMMMMMNd+-`   -NMMMyydmNNNMMMMMMMd.
                        hMMMy   -mMMMN:        sMMMMMMMMNNmhhNMMMo
                       -mMMM-    -mMMMy`       -NMMMy+/-.`` /NMMN.
                       /NMMM`     -mMMMy`      `hMMM+       sMMMh
                       -mMMMo`     :mMMMs`      sMMMd      .NMMN/
                        +NMMNy`     :NMMNs      /MMMm`     +MMMd.
                         :dMMMd:     :NMMMo`    `NMMN-    `dMMMo
                          .yMMMN+     :NMMNo     NMMN/    /NMMM.
                           `oNMMNy.    /NMMN+    dMMMo    yMMMh
                             :mMMMd-    /NMMN+   yMMMs   `NMMN/
                         `-://ohhhhy+////ymNMN/.-shhds:--+mmmd.
                       `/osoo+++++++++++oosshdsssoooooooooosss+/-`
                      `+so/:::::::::::::::/osss+:::::::::::://+os+-`
                      -ss/:----------------/ss+:--------------::+ss+-.```
                      .ss+:::::::--::::::::+sso::---------------::+osoooo-
                      `+sso+++///::::///+++oosso+//:::::::--------:::/+ss-
                     `/ss+/::::::::::::::::::+ssssoooooo+:------------/ss-
                     .os+:-------------------:oso-....os+-------------/ss-
                     `+so::----------:::::://+ss+`    +so:------------/ss-
                      .+so+////////:::::////+++os+.   -ss/------------/ss-
                       `-oso//:::::------------:os+   `/so/:----------/ss-
                        `oso:-----------------::oso    `+so/:---------/ss-
                         :ss+:::::::::::::::://+oss/.  ``/so+:--------/ss-
                          -+osoooooo++///::::::::/+so- -.`:oso/::-----/ss-
                            .-:::oso:-------------:os+` o+ `:oso+/::::/ss-
                                 /so/:------------:os+` /Ms. `-+ysssoooss-
                                 `+so+/:::::::::/+oso.  +MMd-  .hNmmh----`
                                  `:+oooossssooooo+:`   yMMMy`  -MMMN/
                                     `..:dmmm/...`      :NMMM:   sMMMm`
                                        :MMMm.           yMMMh   .dMMMs
                                        yMMMy       ``.:+yMMMN:   :NMMN:
                                       `mMMM/  ``-+shmMMMMMMNNy    sMMMm`
                                       /NMMN-:ohmMMMMNNmdyo+/--    .mMMMo
                                       sMMMMmMMMMNmyo/.`   `.:/+ossodMMMN:
                                      .mMMMMMNmy+.`    `-+ymNMMMMMMMMMMMMd`
                                      :MMMMNs:`  ``./oymNMMMMNdhyssyhmMMMMo
                                      yMMMNyoooyhdNNMMMMNMMMMo`      `dMMMd`
                                      -dNMMMMMMMMMNNNdy+:oMMMN:    `:hMMMN:
                                       `:+syyyyso/:.`     yMMMm` `/dMMMMd:
                                                          .dMMMhomMMMNh/
                                                           -NMMMMMMNy-
                                                            +NMMMms.
                                                             sMmo`
                                                             `/`

*/
var browser = browser || chrome;

(function possedexInfobulle(){
    'use strict';

    var infobulle;
    var removeTimeout;
    var removeAfter = 10000; // En milliseconde

    var heights = [213, 180, 212, 203, 213];

    // Helpers function
    function closeInfoBulle(){
        clearTimeout(removeTimeout);
        infobulle.style.opacity = 0;
        infobulle.style.transform = 'translate(0,-100%)';
        removeTimeout = setTimeout(function(){
            removeElement(infobulle);
        }, 1000);
    }

    function clearRemoveTimeout(){
        clearTimeout(removeTimeout);
    }

    function removeAterTime(){
        removeTimeout = setTimeout(closeInfoBulle, removeAfter);
    }

    function removeElement(elem){
        if(elem) elem.parentNode.removeChild(elem);
    }

    function forEach(arr, fn){
        for(var i = 0, l = arr.length; i<l; i++)
            fn.call(arr, arr[i], i, l);
    }

    function createChild(parent, tag){
        var elem = document.createElement(tag);
        parent.appendChild(elem);
        return elem;
    }

    function appendText(parent, text){
        var elem = document.createTextNode(text);
        parent.appendChild(elem);
        return parent;
    }

    function isVisible(elem){
        return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length ); // Merci jquery
    }

    function css(elem, styles, important){
        var i, l;
        var merged = {};
        styles = [].concat(styles);
        for(i = 0, l = styles.length; i<l; i++)
            for(var style in styles[i])
                merged[style] = styles[i][style] + ((important) ? ' !important' : '');

        var balise = '';
        for(var attr in merged)
            balise += attr+':'+merged[attr]+';';

        elem.setAttribute('style', balise);
        return elem;
    }


    browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        // Supprimer infobulle si existant
        clearRemoveTimeout();
        removeElement(infobulle);

        if (request.show_popup){ // debunker
            // Ajout du contenu

            forEach(document.querySelectorAll('body *'), function(elem){
                var style = window.getComputedStyle(elem);
                if(style.position != 'static' && style.zIndex == '2147483647')
                    elem.style.zIndex = '2147483646';
            });

            var body = document.querySelector('body');

            // Création de la structure du popup
            infobulle = createChild(body, 'div');
            var header = createChild(infobulle, 'header');
            var title = createChild(header, 'h1');
            //var picto = createChild(title, 'span');
            var close = createChild(header, 'div');
            var content = createChild(infobulle, 'div');
            var pic = createChild(content, 'div');

            var text = createChild(content, 'div');
            var name = createChild(text, 'p');
            var description = createChild(text, 'p');


            var more = createChild(content, 'p');

            // Ajout du style
            var forceImportant = true;
            //var currentColor = colors[insoumis_note]; // note
            var currentColor = 'rgb(255, 191, 0)'; // note
            
            
            // Ajout de la font
            var fa = document.createElement('style');
                fa.type = 'text/css';
                fa.textContent = '@font-face { font-family: "Brown";'
                + 'src: url("' + chrome.extension.getURL('fonts/lineto-brown-regular.woff') + '") format("woff"),'
                + 'url("' + chrome.extension.getURL('fonts/lineto-brown-regular.ttf') + '") format("truetype");'
                + 'font-weight:normal; }'
                
                + '@font-face { "Brown";'
                + 'src: url("' + chrome.extension.getURL('fonts/lineto-brown-bold.woff') + '") format("woff"),'
                + 'url("' + chrome.extension.getURL('fonts/lineto-brown-bold.ttf') + '") format("truetype");'
                + 'font-weight:bold; } ';
            
                document.head.appendChild(fa);
            
            
            
            var reset = {
                'display': 'block',
                'position': 'static',
                'box-sizing': 'border-box',
                'margin': '0',
                'padding': '0',
                'width': 'auto',
                'height': 'auto',
                'min-height': '0',
                'min-width': '0',
                'max-height': 'auto',
                'max-width': 'auto',
                'background': 'transparent',
                'z-index': 'auto',
                'transform': 'none',
                'top': 'auto',
                'bottom': 'auto',
                'left': 'auto',
                'right': 'auto',
                'border': 'none',
                'outline': '0',
                'float': 'none',
                'opacity': '1',
                'border-radius': '0'
            };

            var resetText = {
                'font-family': 'Brown, Arial, sans-serif',
                'color': '#2e3942',
                'font-size': '13px',
                'line-height': '1.38',
                'font-weight': 'normal',
                'font-style': 'normal',
                'font-variant': 'normal',
                'text-decoration': 'none',
                'text-align': 'left',
                'text-indent': '0',
                'text-transform': 'none',
                'letter-spacing': 'normal',
                'direction': 'ltr',
                'world-spacing': '0'
            };

            // @TODO: add option to fix on bottom, or on right
            css(infobulle, [reset, {
                'top': '60px',
                'right': '20px',
                'position': 'fixed',
                'width': '255px',
                //'width': '215px',
                'border':'2px solid rgb(255, 191, 0)',
                'border-radius': '0',
                'background-color': '#fff',
                'box-shadow': '0 0 10px 0 #d0d9dd',
                'transition': 'all .5s ease',
                'opacity': '1',
                'transform': 'translate(0,0)',
                'overflow': 'hidden',
                "z-index": "2147483647"
            }], forceImportant);

            css(header, [reset, {
                'padding': '10px 10px 5px 15px',
                'overflow': 'hidden'
            }], forceImportant);

            css(title, [reset, resetText, {
                'font-size': '12px',
                'float': 'left',
                'line-height': '20px',
                'color': currentColor
            }], forceImportant);

            /*css(picto, [reset, resetText, {
                'display': 'inline-block',
                'width': '22px',
                'height': '22px',
                'border': 'solid 2px #ffffff',
                'border-radius': '20px',
                'vertical-align': 'top',
                'text-align': 'center',
                'line-height': '18px',
                'margin': '-1px 10px -1px 0',
                'color': '#fff'
            }], forceImportant);*/

            css(close, [reset, resetText, {
                'float': 'right',
                'overflow': 'hidden',
                'width': '13px',
                'height': '13px',
                'background': 'url(data:image/svg+xml,%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2013%2013%22%3E%0A%3Cstyle%20type%3D%22text/css%22%3E%0A%09.st0%7Bfill%3A%23FFBF00%3B%7D%0A%3C/style%3E%0A%3Cpolygon%20id%3D%22_x2B_%22%20class%3D%22st0%22%20points%3D%220.7%2C1.9%205.5%2C6.6%200.7%2C11.4%201.9%2C12.5%206.6%2C7.7%2011.4%2C12.5%2012.5%2C11.4%207.7%2C6.6%2012.5%2C1.9%2011.4%2C0.7%0A%096.6%2C5.5%201.9%2C0.7%20%22/%3E%0A%3C/svg%3E) center no-repeat',
                'text-indent': '100%',
                'white-space': 'nowrap',
                'overflow': 'hidden',
                'cursor': 'pointer'
            }], forceImportant);

            css(content, [reset, {
                'margin': '5px 15px 15px 15px',
                'min-height':'90px'
            }], forceImportant);

            css(text, [reset, resetText, {
                'font-weight':'bold',
                'margin': '0 0 5px 8px',
                'float':'left',
                'width': '130px'
            }], forceImportant);
            
            css(name, [reset, resetText, {
                'font-size':'30px',
                'font-weight':'bold',
                'line-height':'30px'

            }], forceImportant);
            
            css(description, [reset, resetText, {
                'font-size':'10px',
                'font-weight':'bold',
                'line-height':'16px',
                'padding-top':'2px'

            }], forceImportant);
            
            
            css(pic, [reset, resetText, {
                'margin': '0 0 5px 0',
                'float':'left',
                'width':'80px',
                'height':'90px'
            }], forceImportant);

            css(more, [reset, resetText, {
                'font-weight': 'bold',
                'color': '#16212c'
            }], forceImportant);

            // Ajout du contenu
            appendText(title, request.bandeau_msg); // note
            // le picto= un carré avec border-radius + un caractere
            //appendText(picto, 'i');
            appendText(close, 'Fermer');
            name.innerText =  request.message; // no html
            name.innerText = request.proprietaire1; // no html
            description.innerText = request.fortune1 + " " + request.marque1;
            // Bind des event au clique


            var tete 
            = new Image();

            tete.src  = chrome.extension.getURL("img/"+request.proprietaire1+".gif");

            css(tete, [reset, {
                'vertical-align':'middle',
                'display': "inline-block",
                'max-width':'100%',
                'max-height':'100%'
            }], forceImportant);

            pic.appendChild(tete);

            // Bind des event au clique

            close.addEventListener('click', closeInfoBulle);
            if (!request.persistant) {
                // note : theses log are displayed in the classic console
                infobulle.addEventListener('mouseenter', clearRemoveTimeout);
                infobulle.addEventListener('mouseleave', removeAterTime);
                removeAterTime();
            } else {
                //console && console.log("persistant is enabled");
            }
        }
        else {
            if (request.text == 'report_back') {
               sendResponse({farewell: document.querySelector(".yt-user-info").getElementsByTagName('a')[0].href});
               //console.log("URL CHANNEL ---> " + document.querySelector(".yt-user-info"));
            }

        }
      });

    /*browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
        if (msg.text === 'report_back') {
            sendResponse({farewell: document.getElementsByClassName("yt-user-info")[0].getElementsByTagName('a')[0].href});
            //console.log("URL CHANNEL ---> " + document.getElementsByClassName("yt-user-info")[0].getElementsByTagName('a')[0].href);
        }
    });*/

})();






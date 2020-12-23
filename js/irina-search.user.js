// ==UserScript==
// @name         IrinaBot search
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://irinabot.ru/
// @grant        none
// @license MIT
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    const input = $(`<input type="text" placeholder="Find..."/>`);

    $(document).ready(() => {
        processGameList = addFilterToFunc(processGameList);
        gamelistall = addFilterToFunc(gamelistall);
        gamelistnonstarted = addFilterToFunc(gamelistnonstarted);
        gameliststarted = addFilterToFunc(gameliststarted);
        addSearchBar();
    })

    function addFilterToFunc(func) {
        return function (buf) {
            const result = func(buf);
            filter(input.val())
            return result;
        }
    }

    function addSearchBar() {
        const buttons = $("#gameslistbuttons");
        input.on("input", function () {
            filter(input.val())
        });
        const div = $(`<div class='ui form'></div>`)
        buttons.append(div)
        div.append(input)
    }

    function filter(search) {
        let list = $("#gamestat tr")
        return list.each(function () {

            let tr = $(this);
            let text = tr.children(".gamename").first().text().toLowerCase();
            if (!(text.includes(search.toLowerCase()))) {
                tr.hide();
            } else {
                tr.show();
            }
        })
    }

    //
})();
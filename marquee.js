(function() {
    var marquee_text = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "You've made it! If your computer is running this at the same speed as mine, this has been over half an hour of your life wasted reading all this stuff, so I hope the reward makes up for it to some degree. To claim your prize, simply click on the last modified date here below on this page, before this segment of the marquee ends (i.e. before this chunk disappears and the next starts - don't worry; there's nothing interesting in the next chunk that you'll be missing). Congratulations and enjoy your prize. Be proud of your achievement.\n\nNo, really. Click the last modified date already. If you wait much longer, you're going to miss it.",
        "Looks like you've missed the prize. Too bad. :( I suppose you can refresh the page and try again?"
    ];

    var marquee = document.getElementById("themarquee");
    var container = marquee.parentNode;
    var cursor = document.getElementById("cursor");
    var cur_elem = marquee;
    var cur_tn = document.createTextNode("");
    marquee.appendChild(cur_tn);
    cursor.appendChild(document.createTextNode("|"));
    var pos = 0;
    var flash = 0;
    var part = 0;

    function flash_cursor() {
        if (cursor.style.visibility == "hidden") {
            cursor.style.visibility = "visible";
            flash++;
        }
        else {
            cursor.style.visibility = "hidden";
        }
        if (flash == 3) {
            part++;
            flash = 0;
            pos = 0;
            advance_marquee();
        }
        else {
            window.setTimeout(flash_cursor, 500);
        }
    }

    function advance_marquee() {
        if (pos >= marquee_text[part].length) {
            if (part < marquee_text.length) {
                flash_cursor();
            }
            else {
                cursor.style.display = none;
            }
            return;
        }
        else if (pos == 0) {
            marquee.innerHTML = "";
            cur_elem = marquee;
            cur_tn = document.createTextNode("");
            marquee.appendChild(cur_tn);
            if (part == marquee_text.length - 2) {
                document.getElementById("formholder").innerHTML = '<form id="afep" method="post" action="/afep"><input type="hidden" name="confirm" value="passed" /></form>';
                document.getElementById("lastmodified").onclick = function() { document.forms['afep'].submit(); };
            }
            else if (part > marquee_text.length - 2) {
                document.getElementById("formholder").innerHTML = "";
                document.getElementById("lastmodified").onclick = null;
            }
        }
        var cur_cursor = cursor.firstChild.data;
        cursor.firstChild.data = ""; // Working around Chrome's weird word-wrapping bug
        var next_char = marquee_text[part].charAt(pos);
        var wait = 70;
        
        if (next_char == '\n') {
            var br = document.createElement('BR');
            cur_tn = document.createTextNode("");
            cur_elem.appendChild(br);
            cur_elem.appendChild(cur_tn);
            cursor.childNodes[0].data = cur_cursor;
            wait = 300;
        }
        else if (next_char == '<') {
            var em = document.createElement('EM');
            cur_elem.appendChild(em);
            cur_elem = em;
            cur_tn = document.createTextNode("");
            cur_elem.appendChild(cur_tn);
            cursor.childNodes[0].data = '/'
            wait = 0;
        }
        else if (next_char == '>') {
            cur_elem = cur_elem.parentNode;
            cur_tn = document.createTextNode("");
            cur_elem.appendChild(cur_tn);
            cursor.childNodes[0].data = '|'
            wait = 0;
        }
        else if (next_char == '~') {
            cursor.childNodes[0].data = cur_cursor;
            cur_tn.deleteData(cur_tn.data.length - 1, 1);
        }
        else {
            cursor.childNodes[0].data = cur_cursor;
            cur_tn.appendData(next_char);
        }
        if (next_char == ' ') {
            wait = 120;
        }
        else if (next_char == '.' || next_char == '!' || next_char == '?') {
            wait = 200;
        }
        else if (next_char == ',') {
            wait = 150;
        }
        pos++;
        container.scrollTop = container.scrollHeight;
        window.setTimeout(advance_marquee, wait);
    }

    advance_marquee();
})();

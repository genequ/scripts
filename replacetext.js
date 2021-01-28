// ==UserScript==
// @name         Replace text
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @grant        none
// ==/UserScript==

var replaceArry = [
    [/&#039;/gi, "'"],
    [/&amp;/gi, "&"],
    [/&lt;/gi, "<"],
    [/&gt;/gi, ">"],
    [/&nbsp;/gi, ""],
    [/&quot;/gi, '"'],
];
var numTerms = replaceArry.length;
var txtWalker = document.createTreeWalker (
    document.body,
    NodeFilter.SHOW_TEXT,
    {acceptNode: function (node) {
            //-- Skip whitespace-only nodes
            if(node.nodeValue.trim()){
                return NodeFilter.FILTER_ACCEPT;}

            return NodeFilter.FILTER_SKIP;
        }
    },
    false
);
var txtNode = null;

while (txtNode = txtWalker.nextNode () ) {
    var oldTxt = txtNode.nodeValue;

    for (var J = 0; J < numTerms; J++) {
        oldTxt = oldTxt.replace (replaceArry[J][0], replaceArry[J][1]);
    }
    txtNode.nodeValue = oldTxt;
}

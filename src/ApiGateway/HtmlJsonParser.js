import HtmlParser from 'html2json';

export function GetElementsJson(htmlString) {
    const descriptionHtmlAsJson = HtmlParser.html2json(htmlString);
    const descriptionElemets =  getJsonHtmlElementsRecursively(descriptionHtmlAsJson);
    return descriptionElemets;
}

function getJsonHtmlElementsRecursively(jsonHtml){
    if(!jsonHtml.child){
        return [jsonHtml];       
    }
    const elementsArrays = jsonHtml.child.map(x => getJsonHtmlElementsRecursively(x)).concat([jsonHtml]);
    return elementsArrays.reduce((reducer, element) => reducer.concat(element))
}
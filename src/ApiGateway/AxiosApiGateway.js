import axios from 'axios';
import xmlParser from 'xml-js';
import * as HtmlJsonParser from './HtmlJsonParser'
const mediumUrl = "medium.com/feed/"

export const ResponseStatuses = {
    Ok: 200,
    NotFound: 404,
    OtherError: 999
}

export async function getMediumFeedArticles(username, callback){
    try {
        const requestUrl = wrapUrlWithAllowCorsProxy(`${mediumUrl}${username}`)
        const response = await axios.get(requestUrl, {
            timeout: 30000,
            count: null,
            headers: {
                Accept: 'application/rss+xml'
            }
          });

         const articles = mapArticlesResponse(response.data);
         callback({
            status: ResponseStatuses.Ok,
            articles
        });
    }
    catch(error){
        HandleError(error, callback);
    }
}

function HandleError(error, callback){
    if(!error || !error.response || !error.response.status)
    {
        console.log("invalid unknown error", error);
        callback({ status: ResponseStatuses.OtherError, articles: [] });  
        return; 
    }

    const errorStatus = error.response.status;
    if(Object.values(ResponseStatuses).find(knownResponseStatuse => knownResponseStatuse === errorStatus)){
        callback({ status: errorStatus, articles: [] });
    }
    else {
        console.log("unknown error", error.response);
        callback({ status: ResponseStatuses.OtherError, articles: [] });
    }
}

function mapArticlesResponse(responseData){
    const jsonResponse = xmlParser.xml2js(responseData, {compact: true});
    return jsonResponse.rss.channel.item.map(article=> {
        const content = article.description? article.description._cdata: article["content:encoded"]._cdata;
        const descriptionElemets = HtmlJsonParser.GetElementsJson(content);
        const image = descriptionElemets.find(x => x.node === 'element' && x.tag === 'img')
        const text = descriptionElemets.filter(x=> x.node === 'text').map(x=> x.text);
        return {
            title: article.title._cdata,
            imageUrl: (isValidImage(image)) ? image.attr.src: undefined,
            description: text,
            creator: article['dc:creator']._cdata,
            publicationDate: article.pubDate._text,
            link: article.link._text,
        };
    });
}

function isValidImage(image)
{
    if(!image || !image.attr || !image.attr.src ) {
        return false;
    }

    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    return allowedExtensions.test(image.attr.src);
}

function wrapUrlWithAllowCorsProxy(url){
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"
    return `${proxyUrl}${url}`
}
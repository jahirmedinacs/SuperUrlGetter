var injectedCode = `
function tempAlert(msg,duration)
{
    var el = document.createElement("div");
    el.setAttribute("style","position:absolute;top:40%;left:20%;background-color:white;");
    el.innerHTML = msg;
    setTimeout(function(){
        el.parentNode.removeChild(el);
    },duration);
    document.body.appendChild(el);
}

function DownThemAll(elementId, thisSessionName)
{   
    let progressPercent = 0;

    let elementRef = document.getElementById("clickMeToDownload");
    let ogInnerText = elementRef.innerText;

    var http = new XMLHttpRequest();
    let Count_von_Count = 0;

    if(thisSessionName){
        sessionName = thisSessionName;
    }
    else{
        var sessionName = "DEBUG";
    }

    var totalIds = document.getElementsByTagName("a").length;

    for (urlsRefs of document.getElementsByTagName("a")){
            Count_von_Count ++;

            urlA = urlsRefs.href;

            baseUrlA = urlA.split('/')[2];
            fullUrl = urlA;

            date = Date.now();
            gSearchUrl = window.location.href;

                var url = 'https://gscholarurls.drsavage.me/addUrl';
                var params = \`gSearchParent=\${gSearchUrl}\`;
                params = params + \`&baseUrl=\${baseUrlA}\`;
                params = params + \`&fullUrl=\${fullUrl}\`;
                
                params = params + \`&totalIds=\${totalIds}\`;
                params = params + \`&thisId=\${Count_von_Count}\`;

                params = params + \`&sessionName=\${sessionName}\`;

                params = params + \`&date=\${date}\`;

                http.open('POST', url, false);

                //Send the proper header information along with the request
                http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                http.onreadystatechange = function() {//Call a function when the state changes.
                    if(http.readyState == 4 && http.status == 200) {
                        console.log(Count_von_Count)
                        console.log(JSON.parse(http.responseText)._id);
                        
                        progressPercent = (Count_von_Count / totalIds) * 100

                        if(Math.round(progressPercent) % 5 === 0){
                            elementRef.innerText = \`\${ogInnerText} | Progress \${Math.round(progressPercent)}\`
                        }

                    }
                }
                http.send(params);

            if (Count_von_Count === totalIds){
                elementRef.innerText = \`\${ogInnerText} | Complete \${Count_von_Count} of \${totalIds}\`
            }
    }

    console.log(Count_von_Count);

    window.scrollTo(0,document.body.scrollHeight);

    elementRef.disabled = true;
}
`;

console.log('Content script');

let topDiv = document.createElement('button');
topDiv.setAttribute('class', 'content-top-div');
topDiv.innerText = 'get All URLs';
topDiv.setAttribute('id', 'clickMeToDownload')
topDiv.setAttribute('onclick', 'DownThemAll("clickMeToDownload", "AMF")')

var script = document.createElement('script');
script.appendChild(document.createTextNode(injectedCode));
(document.body || document.head || document.documentElement).appendChild(script);


document.body.appendChild(topDiv);




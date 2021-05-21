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

var http = new XMLHttpRequest();
let Count_von_Count = 0;

var totalIds = document.getElementsByTagName("a").length;

for (urlsRefs of document.getElementsByTagName("a")){

        Count_von_Count ++;

        urlA = urlsRefs.href;

        baseUrlA = urlA.split('/')[2];
        fullUrl = urlA;

        date = Date.now();
        gSearchUrl = window.location.href;

            var url = 'http://localhost:36936/addUrl';
            var params = `gSearchParent=${gSearchUrl}&baseUrl=${baseUrlA}&fullUrl=${fullUrl}&totalIds=${totalIds}&thisId=${Count_von_Count}&date=${date}`;

            http.open('POST', url, false);

            //Send the proper header information along with the request
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            http.onreadystatechange = function() {//Call a function when the state changes.
                if(http.readyState == 4 && http.status == 200) {
                    console.log(Count_von_Count)
                    console.log(JSON.parse(http.responseText)._id);
                }
            }
            http.send(params);

        if (Count_von_Count === totalIds){
            tempAlert("Done, please proceed to the next page",1000)
        }
}

console.log(Count_von_Count);

window.scrollTo(0,document.body.scrollHeight);
// I - Old Way: API Request for Remote Data -- XMLHttpRequest
//
// var xhr = new XMLHttpRequest()
// xhr.open('GET', 'http://sepomex.icalialabs.com/api/v1/states')
// xhr.send()
//
// xhr.onreadystatechange = function(){
//   if(xhr.status === 200 && xhr.responseText.length > 0){
//     console.log('SUCCESS')
//     console.log(typeof xhr.responseText)
//
//     console.log(xhr.responseText)
//     var responseTxt = xhr.responseText
//     var responseObj = JSON.parse(responseTxt)
//     console.log(responseObj)
//   }
//
//   if(xhr.status >= 400){
//     console.log('ERROR')
//     console.log(xhr.responseText)
//   }
// }

// II - New Way: API Request for Remote Data -- Promise Library (superagent)

//  (A) import superagetn Promise Library as 'request'
var request = superagent

// (D) create promise handler that processes api response
//     Note: we access the api response in the data

function handleSepoMexRes(apiRes) {
   var tableBodyEl = document.querySelector('#mex-city-count tbody')

   // (D1) res.body contains json data
   var responseObj = apiRes.body
   console.log(responseObj)

   // (D2) iterate over states array from JSON response,
   //      put each Mx state into formatted html and append to string

   var mxStatesArray = responseObj.states
   var bigHtmlStr = ``

   mxStatesArray.forEach(function addRowHtmlToStr(stateObj){
      if(stateObj.cities_count > 100){
        bigHtmlStr += `
          <tr>
            <td>${stateObj.name}</td>
            <td>${stateObj.cities_count}</td>
          </tr>
        `
      }
   })

   // (D3) Put big HTML w/ data on DOM
   tableBodyEl.innerHTML = bigHtmlStr
   /// --- END ---
}

// (B) Fetch data w/ .get(...) method and pass URL w/ JSON data as string
//       NOTE: .get(...) returns a promise of Data
request
  .get('http://sepomex.icalialabs.com/api/v1/states')
  .then(handleSepoMexRes)
  // ^ (C) handle promise w/ .then() method
  //     and pass .then(...) a method



btn.addEventListener('click', fetchMxDataAndRender)

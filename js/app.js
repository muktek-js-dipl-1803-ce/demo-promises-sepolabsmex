// OLD WAY
// const xhr = new XMLHttpRequest();
// xhr.open('GET', 'http://sepomex.icalialabs.com/api/v1/states');
// xhr.send()
//
// xhr.onreadystatechange = function() {
//   if (xhr.status === 200 && xhr.responseText) {
//     console.log("Nice");
//     console.log(JSON.parse(xhr.responseText).states);
//   }
//
//   if (xhr.status >= 400) {
//     console.log("error");
//   }
// }


const request = superagent;
let statesTable = document.querySelector('#mex-city-count tbody')

// document.querySelector('#getData').addEventListener('click', function() {
  request
    .get('https://sepomex.icalialabs.com/api/v1/cities')
    .then(function saveStatesInAVariable(data) {
      const states = data.body.states

      console.log(states);

      return states
    })
    .then(function printInWebpage(statesList) {
      statesList.forEach(function(obj) {
        statesTable.innerHTML += `
        <tr>
          <td>${obj.name}</td>
          <td>${obj.cities_count}</td>
        </tr>`
      })
    })
    .catch(function() {
      var elem = document.createElement('p')
      elem.innerHTML = 'Error al momento de obtener los datos'

      document.querySelector('.errors').appendChild(elem)
    })
// })


    // for (var i = 0; i < states.length; i++) {
    //   var obj = states[i]
    //
    //   console.log( obj );
    // }

  // })

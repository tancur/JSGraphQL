// const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

// async function trafficLight(){
//     while (true){
//         // включаємо зелений
//         green.style.backgroundColor = 'green';
//         await delay(3000)
//         green.style.backgroundColor = '';
//         // включаємо жовтий
//         yellow.style.backgroundColor = 'yellow';
//         await delay(3000)
//         yellow.style.backgroundColor = '';
//         // включаємо червоний
//         red.style.backgroundColor = 'red';
//         await delay(3000)
//         red.style.backgroundColor = '';
//     }
// }

// trafficLight()

// ====================

// const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

// async function trafficLight(greenEl,yellowEl,redEl,greenTime,yellowTime,redTime){
//   while (true){
//       // включаємо зелений
//       greenEl.style.backgroundColor = 'green';
//       await delay(greenTime)
//       greenEl.style.backgroundColor = '';
//       // включаємо жовтий
//       yellowEl.style.backgroundColor = 'yellow';
//       await delay(yellowTime)
//       yellowEl.style.backgroundColor = '';
//       // включаємо червоний
//       redEl.style.backgroundColor = 'red';
//       await delay(redTime)
//       redEl.style.backgroundColor = '';

//   }
// }
// const green= document.getElementById('green')
// const yellow= document.getElementById('yellow')
// const red= document.getElementById('red')

// trafficLight( green,yellow,red,3000,2000,5000)
// =============================================

// const delay = (ms) => new Promise((ok) => setTimeout(() => ok(ms), ms));

// async function trafficLight(

//   redEl,
//   yellowEl,
//   greenEl,
//   redTime,
//   yellowTime,
//   greenTime,

// ) {

//   redEl.style.backgroundColor = "red";
//   await delay(redTime);
//   redEl.style.backgroundColor = "";

//   yellowEl.style.backgroundColor = "yellow";
//   await delay(yellowTime);
//   yellowEl.style.backgroundColor = "";

//   greenEl.style.backgroundColor = "green";
//   await delay(greenTime);
//   greenEl.style.backgroundColor = "";

// }

// const green = document.getElementById("green");
// const yellow = document.getElementById("yellow");
// const red = document.getElementById("red");

// const greenTime = 3000;
// const yellowTime = 2000;
// const redTime = 5000;

// async function PedestrianTrafficLight(button, timeToAwait) {
//   button.addEventListener("click", async (event) => {
//     button.style.backgroundColor = "pink";
//     button.style.color = "green";
//     button.innerText = "кнопка нажата";

//     event.preventDefault();
//     await delay(timeToAwait);

//     await trafficLight(red, yellow, green, redTime, yellowTime, greenTime);
//     button.style = "";
//     button.innerText = "Пешеход, жми сюда";
//   });
//   element.removeEventListener(click, trafficLight);
// }

// const button = document.getElementById("traffic");

// PedestrianTrafficLight(button, 3000);
// =====================

// speedtest  формулы написаны ГОЛИМО

async function speedtest(getPromise, count, parallel = 1) {
  let start = performance.now();
  let promises = [];
  for (let i = 0; i < count; i++) {
    for (let k = 0; k < parallel; k++) {
      promises.push(getPromise());
    }
    await Promise.all(promises);
  }

  let end = performance.now();
  let duration = end - start;
  let queryDuration = duration / count;
  let querySpeed = count / duration;
  let parallelDuration = duration / (count * parallel);
  let parallelSpeed = (count * parallel) / duration;

  return {
    duration,
    querySpeed, //середня швидкість одного запиту
    queryDuration, //
    parallelSpeed,
    parallelDuration,
  };
}

speedtest(() => delay(1000), 10, 10).then((result) => console.log(result));
// {duration: 10000,
// querySpeed: 0.001, //1 тисячна запита за мілісекунду
// queryDuration: 1000, //1000 мілісекунд на один реальний запит у середньому
// parallelSpeed: 0.01  // 100 запитів за 10000 мілісекунд
// parallelDuration: 100 // 100 запитів за 10000 мілісекунд
speedtest(
  () => fetch("http://swapi.dev/api/people/1").then((res) => res.json()),
  10,
  5
);

function gql(url, query, variables) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: query, variables: variables }),
  }).then((resp) => resp.json());
}

// оно же асинхронная функция

async function gql(url, query, variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: query, variables: variables }),
  });
  const data = await response.json();
  return data;
}

// Перевірте вашу функцію:
(async () => {
  const catQuery = `query cats($q: String){
                                        CategoryFind(query: $q){
                                            _id name
                                        }
                                    }`;
  const cats = await gql(
    "http://shop-roles.node.ed.asmer.org.ua/graphql",
    catQuery,
    { q: "[{}]" }
  );
  console.log(cats); //список категорій з _id name та всім таким іншим

  const loginQuery = `query login($login:String, $password:String){
                            	login(login:$login, password:$password)
                        }`;

  const token = await gql(
    "http://shop-roles.node.ed.asmer.org.ua/graphql",
    loginQuery,
    { login: "test457", password: "123123" }
  );
  console.log(token);
})();

// ==========================

function jwtDecode(token) {
  try {
    const [ ,payload,] = token.split(".");

    const secretPart = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(secretPart);
  } catch (err) {
    return undefined;
  } finally {
    console.log("ДЗ, мабуть, закінчено");
  }
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MzIyMDVhZWI3NGUxZjVmMmVjMWEzMjAiLCJsb2dpbiI6InRlc3Q0NTciLCJhY2wiOlsiNjMyMjA1YWViNzRlMWY1ZjJlYzFhMzIwIiwidXNlciJdfSwiaWF0IjoxNjY4MjcyMTYzfQ.rxV1ki9G6LjT2IPWcqkMeTi_1K9sb3Si8vLB6UDAGdw";
console.log(jwtDecode(token));

//{
//  "sub": {
//    "id": "632205aeb74e1f5f2ec1a320",
//    "login": "test457",
//    "acl": [
//      "632205aeb74e1f5f2ec1a320",
//      "user"
//    ]
//  },
//  "iat": 1668272163
//}

// то что ниже,  я не поняла=================

try {
  console.log(jwtDecode())         //undefined
  console.log(jwtDecode("дічь"))   //undefined
  console.log(jwtDecode("ey.ey.ey"))   //undefined
  
  console.log('до сюди допрацювало, а значить jwtDecode не матюкався в консоль червоним кольором')
}
finally{
  console.log('ДЗ, мабуть, закінчено')
}
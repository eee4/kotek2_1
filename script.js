(function () {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')
  const create = document.getElementById('create');
  const form = document.querySelector("#postData");

  example.addEventListener("click", function () {

    create.hidden = true;

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log(array);
        answer.innerHTML = JSON.stringify(array);
      })
  })

  // Zad. 2_1.1., 2_1.2.
  cw1.addEventListener("click", function () {

    create.hidden = true;

    const loadingText = document.createElement("div");
    loadingText.insertAdjacentHTML("beforeend", "<span style=\"color: blue;\"><b>Loading...</b></span>");
    answer.append(loadingText);

    setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(array => {
          console.log(array);
          answer.innerHTML = "";
          for (const o of array) {
            let div        = document.createElement("div");
            let postMeta   = document.createElement("p");
            let postTitle  = document.createElement("h3");
            let postBody   = document.createElement("p");

            div.classList.add("generic_post");
            div.id = `post${o.id}`;

            postMeta.append(`Post #${o.id} by user #${o.userId}`);
            postTitle.append(o.title);
            postBody.insertAdjacentHTML("beforeend", `<i>${o.body.replace("\n", "<br/>")}</i>`);
            div.append(postMeta, postTitle, postBody);
          
            answer.append(div);
          }
      })
    }, 2000);

  })

  // Zad. 2_1.3.
  cw2.addEventListener("click", function () {

    create.hidden = true;

    const loadingText = document.createElement("div");
    loadingText.insertAdjacentHTML("beforeend", "<span style=\"color: blue;\"><b>Loading...</b></span>");
    answer.append(loadingText);

    setTimeout(() => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${Math.floor(Math.random() * 100)}`)
        .then(response => response.json())
        .then(o => {
          console.log(o);
          answer.innerHTML = "";
          let div        = document.createElement("div");
          let postMeta   = document.createElement("p");
          let postTitle  = document.createElement("h3");
          let postBody   = document.createElement("p");

          div.classList.add("generic_post");
          div.id = `post${o.id}`;

          postMeta.append(`Post #${o.id} by user #${o.userId}`);
          postTitle.append(o.title);
          postBody.insertAdjacentHTML("beforeend", `<i>${o.body.replace("\n", "<br/>")}</i>`);
          div.append(postMeta, postTitle, postBody);
          
          answer.append(div);
      })
    }, 2000);
  })

  // Zad. 2_1.4.

  function sendData() {
    // Associate the FormData object with the form element
    const formData = new FormData(form);
    var formDataObject = {};
    formData.forEach(function(value, key){
      formDataObject[key] = value;
    });
    var formDataAsJson = JSON.stringify(formDataObject);

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: formDataAsJson,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);

        const resultText = document.createElement("div");
        resultText.insertAdjacentHTML("beforeend", `<br/><span style=\"color: green;\"><b>Dodano nowy post o ID = ${json.id}</b></span>`);
        answer.append(resultText);

        setTimeout(() => {
          if (!create.hidden) answer.innerHTML = "";
        }, 5000);

      });

  }

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    sendData();
  });

  cw3.addEventListener("click", function () {
    create.hidden = false;
    answer.innerHTML = "";
  })

})();

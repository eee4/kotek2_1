(function () {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')

  example.addEventListener("click", function () {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log(array);
        answer.innerHTML = JSON.stringify(array);
      })
  })

  // Zad. 2_1.1.
  cw1.addEventListener("click", function () {
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
  })

  cw2.addEventListener("click", function () {
    //TODO
  })

  cw3.addEventListener("click", function () {
    //TODO
  })

})();

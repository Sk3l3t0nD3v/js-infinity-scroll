


const list=Array.from(Array(1000).keys())


showItems(list)

function showItems(list) {

  if (window.subscribe) {
    subscribe.forEach(el => el.unobserve(document.querySelector("#load")))
  }
  document.querySelector("#list").innerHTML = "";

  (function() {
    let init = 0
    let end = 50
    let showItems = list.slice(init, end);

    renderList(showItems)

    // Observe loadBtn
    const options = {
      // Use the whole screen as scroll area
      root: null,
      // Do not grow or shrink the root area
      rootMargin: "0px",
      // Threshold of 1.0 will fire callback when 100% of element is visible
      threshold: 1.0
    };

    const observer = new IntersectionObserver((entries) => {
      
      // Callback to be fired
      entries.forEach((entry) => {
        // Only add to list if element is coming into view not leaving

        if (entry.isIntersecting) {
          init += 50
          end += 50

          renderList(list.slice(init, end))
        }
      });
    }, options);

    observer.observe(document.querySelector("#load"));
    if (window.subscribe) {
      window.subscribe.push(observer);
    } else {
      window.subscribe = [observer];

    }
  })();


}

function renderList(list) {

  
  const tbody = document.querySelector("#list");

  list.forEach((item) => {

    tbody.innerHTML += `<li>${item}</li>`;
  });
}

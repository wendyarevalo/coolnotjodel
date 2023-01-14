const button = document.getElementById("send");
button.addEventListener("click", () => {
  fetch("/api/saveNewPost/", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "uuid": document.getElementById("hidden").value,
      "content": document.getElementById("content").value,
    }),
  })
    .then(() => {
      const evtSource = new EventSource(
        "/api/sseGetPosts",
      );
      evtSource.onopen = () => {
        console.log("Conection open successfully");
      };
      evtSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const list = document.getElementById("messages");
        list.innerHTML = "";

        data.map((post) => {
          const element = document.createElement("astro-post");
          element.setAttribute("content", post.content);
          element.setAttribute("date", post.creation_date);
          element.setAttribute("votes", post.votes);
          element.setAttribute("pid", post.id);
          element.setValues();
          list.append(element);
        });

        evtSource.close();
      };
      evtSource.onerror = () => {
        console.log("Error has occured.");
      };
    });
});

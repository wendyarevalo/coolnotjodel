const button = document.getElementById("send");
button.addEventListener("click", () => {
  fetch("http://my-api-app-service:7778/api/saveReplyToPost/", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "post_id": document.getElementById("hidden").value,
      "content": document.getElementById("content").value,
    }),
  })
    .then(() => {
      const evtSource = new EventSource(
        "http://my-api-app-service:7778/api/sseGetReplies?post_id=" +
          document.getElementById("post_id").value,
      );
      evtSource.onopen = () => {
        console.log("Conection open successfully");
      };
      evtSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const list = document.getElementById("replies");
        list.innerHTML = "";

        data.map((reply) => {
          const element = document.createElement("astro-reply");
          element.setAttribute("content", reply.reply);
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

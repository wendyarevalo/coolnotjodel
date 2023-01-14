class AstroPost extends HTMLElement {
  constructor() {
    super();
    if (this.attributes.length > 0) {
      this.setValues();
    }
  }

  setValues() {
    const li = document.createElement("li");
    li.className = "link-card";

    const a = document.createElement("a");
    a.href = "/posts/" + this.attributes.pid.value;
    const p = document.createElement("p");
    p.innerText = this.attributes.content.value;
    const i = document.createElement("i");
    i.className = "small";
    i.innerText = this.attributes.date.value;
    const div = document.createElement("div");
    div.className = "votes";
    const btnUp = document.createElement("button");
    btnUp.className = "up";
    btnUp.innerText = "⬆";
    const span = document.createElement("span");
    span.innerText = this.attributes.votes.value;
    const btnDown = document.createElement("button");
    btnDown.className = "down";
    btnDown.innerText = "⬇";
    div.append(btnUp);
    div.append(span);
    div.append(btnDown);
    a.append(p);
    a.append(i);
    li.append(a);
    li.append(div);

    this.append(li);

    let count = this.attributes.votes.value;

    btnUp.addEventListener("click", () => {
      fetch("http://127.0.0.1/api/upvote", {
        method: "PATCH",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "post_id": this.attributes.pid.value,
        }),
      })
        .then(() => {
          count++;
          span.textContent = count;
        });
    });

    btnDown.addEventListener("click", () => {
      fetch("http://127.0.0.1/api/downvote", {
        method: "PATCH",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "post_id": this.attributes.pid.value,
        }),
      })
        .then(() => {
          count--;
          span.textContent = count;
        });
    });
  }
}

customElements.define("astro-post", AstroPost);

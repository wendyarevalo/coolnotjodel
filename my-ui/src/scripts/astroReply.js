class AstroReply extends HTMLElement {
  constructor() {
    super();
    if (this.attributes.length > 0) {
      this.setValues();
    }
  }

  setValues() {
    const p = document.createElement("p");
    p.className = "instructions";
    p.innerText = this.attributes.content.value;
    this.append(p);
  }
}

customElements.define("astro-reply", AstroReply);

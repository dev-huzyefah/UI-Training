class VideoSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="lean-section">
        <h2 class="text-center title-2 mb-4">Check Out The Video</h2>
        <div class="mb-5">
          <div class="container text-center mb-3">
            <img class="video-img" src="./assets/video-frame.svg" />
          </div>
          <p class="service-para text-secondary video-para">
            This video will show you a case study for one of our
            <b>Major Customers</b> and will help you understand why your startup
            needs Evolo in this highly competitive market
          </p>
        </div>
      </section>
    `;
  }
}

customElements.define("video-section-component", VideoSection);

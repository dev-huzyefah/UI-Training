class Testimonials extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section>
        <div class="Testmonial-container mb-5">
          <div class="row w-100">
            <div class="col-lg-6 text-center pt-5 ps-5 Testimonials-setting">
              <img src="./assets/testimonials-2-men-talking.svg" width="80%" />
            </div>
            <div class="col-lg-6">
              <div
                id="testonomial-carousel"
                class="carousel slide"
                data-bs-ride="carousel"
              >
                <div class="carousel-inner">
                  <div class="carousel-item text-center">
                    <h2 class="text-center title-2">Testimonials</h2>
                    <img
                      class="testmonial-img"
                      src="./assets/testimonial-1.svg"
                      alt="..."
                    />
                    <p class="text-secondary text-center">
                      Love their services and was so amazed with the support and
                      results that I purchased Evolo for two years in a row. They
                      are awesome.<br />
                    </p>
                    <h3 class="h3-custom">Roy Smith - Marketer</h3>
                  </div>
                  <div class="carousel-item text-center">
                    <h2 class="text-center title-2">Testimonials</h2>
                    <img
                      class="testmonial-img"
                      src="./assets/testimonial-2.svg"
                      alt="..."
                    />
                    <p class="text-secondary text-center">
                      Love their services and was so amazed with the support and
                      results that I purchased Evolo for two years in a row. They
                      are awesome.<br />
                    </p>
                    <h3 class="h3-custom">Roy Smith - Marketer</h3>
                  </div>
                  <div class="carousel-item text-center active">
                    <h2 class="text-center title-2">Testimonials</h2>
                    <img
                      class="testmonial-img"
                      src="./assets/testimonial-3.svg"
                      alt="..."
                    />
                    <p class="text-secondary text-center">
                      Love their services and was so amazed with the support and
                      results that I purchased Evolo for two years in a row. They
                      are awesome.<br />
                    </p>
                    <h3 class="h3-custom">Roy Smith - Marketer</h3>
                  </div>
                </div>
                <a
                  class="carousel-control-prev"
                  href="#testonomial-carousel"
                  role="button"
                  data-bs-slide="prev"
                >
                  <span class="carousel-control-prev-icon"></span>
                </a>
                <a
                  class="carousel-control-next"
                  href="#testonomial-carousel"
                  role="button"
                  data-bs-slide="next"
                >
                  <span class="carousel-control-next-icon"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("testimonials-component", Testimonials);

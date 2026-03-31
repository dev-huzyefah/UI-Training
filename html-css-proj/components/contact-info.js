class ContactInfo extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="customer-info pt-5 mb-5 lean-section">
        <div class="container mb-5">
          <div class="row">
            <div class="col-lg-12">
              <h2 class="text-center title-2">Customer Information</h2>
              <p class="text-secondary list-font text-center">
                Don't hesitate to give us a call or send us a contact form
                message<br />
                <svg
                  class="svg-inline--fa fa-location-dot small-icons2"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="location-dot"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                  ></path>
                </svg>
                <span>22 Invoative Area, San Fransico, CA 94043,</span>
                <svg
                  class="svg-inline--fa fa-phone small-icons2 pl-3"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="phone"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                  ></path>
                </svg>
                <span class="text-color">+81-720 2212</span>
                <svg
                  class="svg-inline--fa fa-envelope small-icons2 pl-3"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="envelope"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                  ></path>
                </svg>
                <span class="text-color">office@evolo.com</span>
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 text-center">
              <iframe
                class="w-100"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.1376572529452!2d74.41502517603928!3d31.492899848498038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391905fce8485861%3A0x8da1388336e3a45!2sDevsinc!5e0!3m2!1sen!2s!4v1774879872228!5m2!1sen!2s"
                width="600"
                height="450"
              ></iframe>
            </div>
            <div class="col-lg-6">
              <form>
                <div class="col-lg-12 form-group pt-2">
                  <input
                    type=""
                    class="form-control"
                    id="msg-name"
                    aria-describedby=""
                    placeholder="Name"
                  />
                </div>
                <div class="col-lg-12 form-group pt-2">
                  <input
                    type="email"
                    class="form-control"
                    id="msg-InputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <textarea
                    name="career[message]"
                    class="form-control"
                    rows="9"
                    tabindex="3"
                    placeholder="Your message"
                    required=""
                  ></textarea>
                </div>

                <div class="col-lg-12 mb-3 form-check">
                  <input type="checkbox" class="form-check-input" id="" />
                  <label
                    class="form-check-label list-font text-secondary"
                    for="exampleCheck1"
                    >I agree with Evolo's stated Privacy Policy and Terms
                    &amp; Condition</label
                  >
                </div>
                <button class="btn w-100 custom-button">Request</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("contact-info-component", ContactInfo);

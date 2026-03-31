class RequestMeetingForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="Form-Filling bg-light pt-5 lean-section" id="request">
        <div class="container mb-5">
          <div class="row">
            <div class="col-lg-6">
              <h2 class="text-left title-2">
                Fill The Following Form To Request A Meeting
              </h2>
              <div class="col-lg-12">
                <p class="text-secondary custom-p">
                  Evolo is one of the easiest and feature packed marketing
                  automation apps in the market. Discover what it can do for your
                  business organization right away.
                </p>
              </div>
              <div class="col-lg-12">
                <ul
                  class="list-unstyled text-secondary text-left list-font check-list"
                >
                  <li class="bi bi-check">
                    <b>Automate your marketing activities</b> and get results
                    today
                  </li>
                  <li class="bi bi-check">
                    <b>Interact with all your</b> targeted customers at a personal
                  </li>
                  <li class="bi bi-check">
                    <b>Convince them to buy</b> your company's awesome products
                  </li>
                  <li class="bi bi-check">
                    <b>Save precious time</b> and invest it where you need it the
                    most
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-6">
              <form>
                <div class="col-lg-12 form-group pt-2">
                  <input
                    type="text"
                    class="form-control"
                    id="fullname"
                    placeholder="Full Name"
                  />
                </div>
                <div class="col-lg-12 mb-3 pt-2">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div class="col-lg-12 mb-3 pt-2">
                  <input
                    type="tel"
                    class="form-control"
                    id="phone"
                    placeholder="Phone"
                  />
                </div>
                <div class="col-lg-12 form-group pt-2">
                  <select id="inputoptions" class="form-control">
                    <option selected="">I'm interested.</option>
                    <option>...</option>
                  </select>
                </div>
                <div class="col-lg-12 form-group form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                  />
                  <label
                    class="form-check-label list-font text-secondary"
                    for="exampleCheck1"
                    >I agree with Evolo's stated Privacy Policy and Terms &amp;
                    Condition</label
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

customElements.define("request-meeting-form-component", RequestMeetingForm);

import TreoLogo from "../brand/TreoLogo";
import BrandSeal from "./BrandSeal";
/** Migrated reference markup. Interactions are managed by useSiteExperience. */
export default function CallModal() {
  return (
    <div data-modal-cta="book-a-call" className="modal">
      <div className="modal_c">
        <div className="modal_cta theme_on-brand">
          <div className="grid">
            <div
              data-lenis-scroll=""
              data-modal-container=""
              className="modal_cta_c"
            >
              <div className="modal_cta_close">
                <div data-modal-close="" hover-btn="" className="btn-ico">
                  <a
                    aria-label="Close"
                    href="#"
                    className="btn-ico_link w-inline-block"
                  />
                  <div hover="ico" className="btn_ico">
                    <div className="ico-16">
                      <div className="ico w-embed">
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.5292 3.52827C11.7896 3.26792 12.2123 3.26792 12.4726 3.52827C12.733 3.78862 12.733 4.21128 12.4726 4.47163L8.94429 7.99995L12.4726 11.5283C12.733 11.7886 12.733 12.2113 12.4726 12.4716C12.2123 12.732 11.7896 12.732 11.5292 12.4716L8.00093 8.94331L4.47261 12.4716C4.21226 12.732 3.7896 12.732 3.52925 12.4716C3.2689 12.2113 3.2689 11.7886 3.52925 11.5283L7.05757 7.99995L3.52925 4.47163C3.2689 4.21128 3.2689 3.78862 3.52925 3.52827C3.7896 3.26792 4.21226 3.26792 4.47261 3.52827L8.00093 7.05659L11.5292 3.52827Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="btn_bg">
                    <div hover="bg" className="btn_bg_fill" />
                  </div>
                </div>
              </div>
              <div id="book-a-call" className="modal_cta_form w-form">
                <form
                  id="wf-form-Book-a-call"
                  name="wf-form-Book-a-call"
                  data-name="Start your project"
                  method="post"
                  className="form_block"
                >
                  <div className="modal_cta_l">
                    <div className="modal_cta_l_t">
                      <div className="modal_cta_a">
                        <h1 className="a2 b-desk">Let’s discuss your project</h1>
                        <div className="a1 b-mob">Let’s discuss your project</div>
                      </div>
                      <div className="u-24" />
                    </div>
                    <div className="modal_cta_l_b">
                      <div className="modal_cta_desc">
                        <div
                          data-modal-close="menu"
                          aria-label="TREO Construction"
                          className="logo_symbol ico-48 b-mob"
                        >
                          <div className="logo w-embed">
                            <TreoLogo />
                          </div>
                        </div>
                        <div className="u-32 b-mob" />
                        <p className="l1 mob_a-center">
                          Tell us about your project and a member of the TREO team will be in touch to arrange an initial consultation.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="modal_cta_c_c">
                    <div className="modal_cta_c_line">
                      <div data-scroll-reveal="line" className="line-v" />
                    </div>
                    <div className="modal_cta_c_logo">
                      <div
                        data-modal-close="menu"
                        aria-label="TREO Construction"
                        className="logo_symbol header"
                      >
                        <div className="logo w-embed">
                          <TreoLogo />
                        </div>
                      </div>
                      <div className="header-logo_bg b-mob w-embed">
                        <BrandSeal />
                      </div>
                      <div className="header-logo_bg b-desk w-embed">
                        <BrandSeal />
                      </div>
                    </div>
                    <div className="modal_cta_c_line">
                      <div data-scroll-reveal="line" className="line-v" />
                    </div>
                  </div>
                  <div className="modal_cta_r">
                    <div className="modal_cta_form_c">
                      <div className="form_block_t">
                        <div className="u-32 b-desk" />
                        <div className="u-96 b-mob" />
                      </div>
                      <div className="form_block_list">
                        <input
                          className="d-none w-input"
                          maxLength={256}
                          name="title"
                          data-name="title"
                          placeholder=""
                          type="text"
                          id="title"
                        />
                        <div className="input">
                          <div className="input_label">
                            <label htmlFor="first_name" className="l1 reg">
                              First name:
                            </label>
                          </div>
                          <input
                            className="input_field l1 w-input"
                            autoComplete="given-name"
                            maxLength={256}
                            name="first_name"
                            data-name="first_name"
                            placeholder=""
                            type="text"
                            id="first_name"
                            required
                          />
                        </div>
                        <div className="input">
                          <div className="input_label">
                            <label htmlFor="last_name" className="l1 reg">
                              Last name:
                            </label>
                          </div>
                          <input
                            className="input_field l1 w-input"
                            autoComplete="family-name"
                            maxLength={256}
                            name="last_name"
                            data-name="last_name"
                            placeholder=""
                            type="text"
                            id="last_name"
                            required
                          />
                        </div>
                        <div className="input">
                          <div className="input_label">
                            <label htmlFor="email" className="l1 reg">
                              Email:
                            </label>
                          </div>
                          <input
                            className="input_field l1 w-input"
                            autoComplete="email"
                            maxLength={256}
                            name="email"
                            data-name="email"
                            placeholder=""
                            type="email"
                            id="email"
                            required
                          />
                        </div>
                        <div className="input">
                          <div className="input_label">
                            <label htmlFor="phone" className="l1 reg">
                              Phone:
                            </label>
                          </div>
                          <input
                            className="input_field l1 w-input"
                            autoComplete="tel"
                            maxLength={256}
                            name="phone"
                            data-name="phone"
                            placeholder=""
                            type="tel"
                            id="phone"
                            required
                          />
                        </div>
                        <div className="input">
                          <div className="input_label">
                            <label htmlFor="referral" className="l1 reg">
                              Heard about us:
                            </label>
                          </div>
                          <select
                            className="input_field l1 w-input treo-select"
                            name="referral"
                            data-name="referral"
                            id="referral"
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Select
                            </option>
                            {[
                              "Search Engine (Google, Yahoo etc.)",
                              "Recommended by a Friend or Colleague",
                              "Social Media Post (Facebook, Instagram, Linkedin etc)",
                              "Online Article or Blog Post",
                              "Press or Other Article",
                              "YouTube",
                              "Advert in Magazine",
                              "Radio Advert",
                              "Conference or Tradeshow",
                              "Other",
                            ].map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="input">
                          <div className="input_label">
                            <label htmlFor="message" className="l1 reg">
                              Tell us about your project:
                            </label>
                          </div>
                          <textarea
                            id="message"
                            name="message"
                            maxLength={5000}
                            data-name="message"
                            placeholder=""
                            className="input_field area l1 w-input"
                            required
                            defaultValue={""}
                          />
                        </div>
                        <input
                          className="d-none w-input"
                          maxLength={256}
                          name="utm_source"
                          data-name="utm_source"
                          placeholder=""
                          type="text"
                          id="utm_source"
                        />
                        <input
                          className="d-none w-input"
                          maxLength={256}
                          name="utm_medium"
                          data-name="utm_medium"
                          placeholder=""
                          type="text"
                          id="utm_medium"
                        />
                        <input
                          className="d-none w-input"
                          maxLength={256}
                          name="utm_campaign"
                          data-name="utm_campaign"
                          placeholder=""
                          type="text"
                          id="utm_campaign"
                        />
                        <input
                          className="d-none w-input"
                          maxLength={256}
                          name="utm_content"
                          data-name="utm_content"
                          placeholder=""
                          type="text"
                          id="utm_content"
                        />
                        <input
                          className="d-none w-input"
                          maxLength={256}
                          name="utm_url"
                          data-name="utm_url"
                          placeholder=""
                          type="text"
                          id="utm_url"
                        />
                        <input
                          className="d-none w-input"
                          maxLength={256}
                          name="page_url"
                          data-name="page_url"
                          placeholder=""
                          type="text"
                          id="page_url"
                        />
                        <div className="u-160 b-mob" />
                      </div>
                      <div className="form_block_b">
                        <div className="form_block_legal">
                          <div className="p2 inline">
                            By submitting, you agree to our{" "}
                          </div>
                          <div
                            data-text="p"
                            className="legal-cms inline w-dyn-list"
                          >
                            <div
                              data-comma-list=""
                              role="list"
                              className="legal-cms_list inline w-dyn-items"
                            >
                              <div
                                role="listitem"
                                className="legal-cms_list_item inline w-dyn-item"
                              >
                                <a
                                  href="/privacy"
                                  target="_blank"
                                  className="text-link inline w-inline-block"
                                  rel="noopener noreferrer"
                                >
                                  <div className="p2 inline">
                                    Privacy policy
                                  </div>
                                </a>
                                <div data-comma="" className="p2 inline">
                                  ,{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <a
                          data-form-btn=""
                          hover-btn=""
                          hover-nav-item=""
                          aria-label="Submit"
                          href="#"
                          className="btn w-inline-block"
                        >
                          <div className="btn_label">
                            <div className="btn_label_text">
                              <div hover="text" className="l1">
                                Submit
                              </div>
                            </div>
                            <div className="btn_label_text is-2">
                              <div hover="text" className="l1">
                                Submit
                              </div>
                            </div>
                          </div>
                          <div className="btn_bg">
                            <div hover="bg" className="btn_bg_fill" />
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="form_success w-form-done">
                  <div className="form_success_c">
                    <div className="form_success_title">
                      <p className="l1 a-center">We’ve received your request</p>
                      <div className="u-160 b-mob" />
                    </div>
                    <div className="form_success_a">
                      <p className="a2 a-center">Thank you</p>
                    </div>
                    <div className="form_success_social">
                      <div className="u-96 b-mob" />
                      <div className="social-cms w-dyn-list">
                        <div
                          data-comma-list=""
                          role="list"
                          className="social-cms_list w-dyn-items"
                        >
                          <div
                            role="listitem"
                            className="social-cms_list_item w-dyn-item"
                          >
                            <a
                              aria-label="Linkedin"
                          hover-social=""
                          href="https://www.linkedin.com/company/treo-construction"
                              target="_blank"
                              className="social-btn w-inline-block"
                              rel="noopener noreferrer"
                            >
                              <div hover="ico" className="ico-16">
                                <div className="ico w-embed">
                                  <svg
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M6.94048 5.00091C6.94011 5.81522 6.44608 6.548 5.69134 6.85371C4.9366 7.15943 4.07187 6.97703 3.5049 6.39253C2.93793 5.80802 2.78195 4.93813 3.1105 4.19305C3.43906 3.44797 4.18654 2.97648 5.00048 3.00091C6.08155 3.03336 6.94097 3.91935 6.94048 5.00091ZM7.00048 8.48091H3.00048V21.0009H7.00048V8.48091ZM13.3205 8.48091H9.34048V21.0009H13.2805V14.4309C13.2805 10.7709 18.0505 10.4309 18.0505 14.4309V21.0009H22.0005V13.0709C22.0005 6.90091 14.9405 7.13091 13.2805 10.1609L13.3205 8.48091Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <div data-comma="" className="social-btn_line">
                                <div className="line-h" />
                              </div>
                            </a>
                          </div>
                          <div
                            role="listitem"
                            className="social-cms_list_item w-dyn-item"
                          >
                            <a
                              aria-label="Facebook"
                          hover-social=""
                          href="https://www.facebook.com/treoconstruction/"
                              target="_blank"
                              className="social-btn w-inline-block"
                              rel="noopener noreferrer"
                            >
                              <div hover="ico" className="ico-16">
                                <div className="ico w-embed">
                                  <svg
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47062 14 5.5 16 5.5H17.5V2.1401C17.1743 2.09685 15.943 2 14.6429 2C11.9284 2 10 3.65686 10 6.69971V9.5H7V13.5H10V22H14V13.5Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <div data-comma="" className="social-btn_line">
                                <div className="line-h" />
                              </div>
                            </a>
                          </div>
                          <div
                            role="listitem"
                            className="social-cms_list_item w-dyn-item"
                          >
                            <a
                              aria-label="Instagram"
                          hover-social=""
                          href="https://www.instagram.com/treoconstruction/"
                              target="_blank"
                              className="social-btn w-inline-block"
                              rel="noopener noreferrer"
                            >
                              <div hover="ico" className="ico-16">
                                <div className="ico w-embed">
                                  <svg
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M13.0281 2C14.1535 2.00186 14.7238 2.00782 15.2166 2.02249L15.4107 2.02883C15.6349 2.0368 15.8561 2.0468 16.1228 2.0593C17.1869 2.10847 17.9128 2.2768 18.5503 2.5243C19.2094 2.77847 19.7661 3.1218 20.3219 3.67764C20.8769 4.23347 21.2203 4.7918 21.4753 5.4493C21.7219 6.08597 21.8903 6.81264 21.9403 7.8768C21.9522 8.14347 21.9618 8.36467 21.9697 8.58891L21.976 8.783C21.9906 9.27574 21.9973 9.84613 21.9994 10.9716L22.0002 11.7172C22.0003 11.8083 22.0003 11.9023 22.0003 11.9993L22.0002 12.2814L21.9996 13.0271C21.9977 14.1525 21.9918 14.7229 21.9771 15.2156L21.9707 15.4097C21.9628 15.634 21.9528 15.8552 21.9403 16.1218C21.8911 17.186 21.7219 17.9118 21.4753 18.5493C21.2211 19.2085 20.8769 19.7652 20.3219 20.321C19.7661 20.876 19.2069 21.2193 18.5503 21.4743C17.9128 21.721 17.1869 21.8893 16.1228 21.9393C15.8561 21.9512 15.6349 21.9609 15.4107 21.9687L15.2166 21.975C14.7238 21.9897 14.1535 21.9963 13.0281 21.9985L12.2824 21.9993C12.1913 21.9993 12.0973 21.9993 12.0003 21.9993H11.7182L10.9725 21.9986C9.8471 21.9968 9.27672 21.9908 8.78397 21.9761L8.58989 21.9698C8.36564 21.9618 8.14444 21.9518 7.87778 21.9393C6.81361 21.8902 6.08861 21.721 5.45028 21.4743C4.79194 21.2202 4.23444 20.876 3.67861 20.321C3.12278 19.7652 2.78028 19.206 2.52528 18.5493C2.27778 17.9118 2.11028 17.186 2.06028 16.1218C2.0484 15.8552 2.03871 15.634 2.03086 15.4097L2.02457 15.2156C2.00994 14.7229 2.00327 14.1525 2.00111 13.0271L2.00098 10.9716C2.00284 9.84613 2.00879 9.27574 2.02346 8.783L2.02981 8.58891C2.03778 8.36467 2.04778 8.14347 2.06028 7.8768C2.10944 6.8118 2.27778 6.0868 2.52528 5.4493C2.77944 4.79097 3.12278 4.23347 3.67861 3.67764C4.23444 3.1218 4.79278 2.7793 5.45028 2.5243C6.08778 2.2768 6.81278 2.1093 7.87778 2.0593C8.14444 2.04743 8.36564 2.03774 8.58989 2.02989L8.78397 2.0236C9.27672 2.00896 9.8471 2.00229 10.9725 2.00013L13.0281 2ZM12.0003 6.9993C9.23738 6.9993 7.00028 9.23883 7.00028 11.9993C7.00028 14.7622 9.23981 16.9993 12.0003 16.9993C14.7632 16.9993 17.0003 14.7598 17.0003 11.9993C17.0003 9.2364 14.7607 6.9993 12.0003 6.9993ZM12.0003 8.9993C13.6572 8.9993 15.0003 10.342 15.0003 11.9993C15.0003 13.6562 13.6576 14.9993 12.0003 14.9993C10.3434 14.9993 9.00028 13.6567 9.00028 11.9993C9.00028 10.3424 10.3429 8.9993 12.0003 8.9993ZM17.2503 5.4993C16.561 5.4993 16.0003 6.05921 16.0003 6.74845C16.0003 7.4377 16.5602 7.99847 17.2503 7.99847C17.9395 7.99847 18.5003 7.43857 18.5003 6.74845C18.5003 6.05921 17.9386 5.49844 17.2503 5.4993Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <div data-comma="" className="social-btn_line">
                                <div className="line-h" />
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form_success_desc">
                      <div className="u-48 b-mob" />
                      <p className="p1 a-center">
                        Our team will review your enquiry and get back to you personally. We look forward to learning more about your project.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="form_error theme_on-dark w-form-fail">
                  <div className="l1 a-center">
                    Oops! Something went wrong while submitting the form.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-modal-close="" data-modal-over="" className="modal_over" />
    </div>
  );
}

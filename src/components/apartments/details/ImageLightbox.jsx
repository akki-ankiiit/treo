/** Migrated reference markup. Interactions are managed by useSiteExperience. */
export default function ImageLightbox() {
  return (
    <div data-lightbox-modal="" className="modal">
      <div className="modal_c">
        <div className="modal_lightbox">
          <div className="modal_close">
            <div data-slider="close" hover-btn="" className="btn-ico">
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
          <div data-lightbox-content="" className="modal_lightbox_content">
            <img
              data-lightbox-img=""
              loading="lazy"
              alt=""
              src="/assets/images/placeholder.60f9b1840c.svg"
              className="img modal_lightbox_img"
            />
          </div>
          <div className="modal_lightbox_pag">
            <div className="u-24" />
            <div className="modal_lightbox_pag_list">
              <div className="pag_counter">
                <div className="l2">
                  <span data-slider="current">0</span>
                  <span>&nbsp;/ </span>
                  <span data-slider="total">0</span>
                </div>
              </div>
              <div className="btn-list">
                <div data-slider="prev" hover-btn="" className="btn-ico">
                  <a
                    aria-label="Prev"
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
                            d="M10.4717 12.4717C10.2113 12.7321 9.78866 12.7321 9.52831 12.4717L5.52831 8.47173C5.26796 8.21138 5.26796 7.78872 5.52831 7.52837L9.52831 3.52837C9.78866 3.26802 10.2113 3.26802 10.4717 3.52837C10.732 3.78872 10.732 4.21138 10.4717 4.47173L6.94335 8.00005L10.4717 11.5284C10.732 11.7887 10.732 12.2114 10.4717 12.4717Z"
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
                <div data-slider="next" hover-btn="" className="btn-ico">
                  <a
                    aria-label="Next"
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
                            d="M5.52833 3.52827C5.78868 3.26792 6.21134 3.26792 6.47169 3.52827L10.4717 7.52827C10.732 7.78862 10.732 8.21128 10.4717 8.47163L6.47169 12.4716C6.21134 12.732 5.78868 12.732 5.52833 12.4716C5.26798 12.2113 5.26798 11.7886 5.52833 11.5283L9.05665 7.99995L5.52833 4.47163C5.26798 4.21128 5.26798 3.78862 5.52833 3.52827Z"
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
            </div>
          </div>
        </div>
      </div>
      <div data-modal-over="" className="modal_bg">
        <div className="modal_decor">
          <div className="decor">
            <div className="frame_l-tb w-embed">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="50%"
                  y1="0%"
                  x2="50%"
                  y2="100%"
                  strokeWidth={1}
                  stroke="currentColor"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div className="frame_lt w-embed">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                  strokeWidth={1}
                  stroke="currentColor"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div className="frame_t-lr w-embed">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0%"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                  strokeWidth={1}
                  stroke="currentColor"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div className="frame_rt w-embed">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                  strokeWidth={1}
                  stroke="currentColor"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div className="frame_r-tb w-embed">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="50%"
                  y1="0%"
                  x2="50%"
                  y2="100%"
                  strokeWidth={1}
                  stroke="currentColor"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div className="frame_rb w-embed">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                  strokeWidth={1}
                  stroke="currentColor"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div className="frame_b-lr w-embed">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0%"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                  strokeWidth={1}
                  stroke="currentColor"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div className="frame_lb w-embed">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                  strokeWidth={1}
                  stroke="currentColor"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

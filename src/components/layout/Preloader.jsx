import TreoLogo from "../brand/TreoLogo";
/** Migrated reference markup. Interactions are managed by useSiteExperience. */
export default function Preloader() {
  return (
    <div data-preloader="" className="preloader theme_on-dark">
      <div className="preloader_ctn">
        <div className="preloader_t">
          <div className="u-48" />
          <div className="s_logo">
            <div data-part="ctn" className="logo_symbol ico-48">
              <div className="logo w-embed">
                <TreoLogo />
              </div>
            </div>
          </div>
        </div>
        <div className="preloader_c">
          <div className="grid">
            <div className="preloader_title-l">
              <div data-part="h" className="c1 a-center">
                North Miami
              </div>
            </div>
            <div className="preloader_logo">
              <div data-part="h" className="h3 a-center">
                TREO
                <br />
                <span className="treo-long-word">Construction</span>
              </div>
              <div className="preloader_logo_a">
                <div data-part="a" className="a2 preloader_a a-center">
                  Miami
                </div>
              </div>
            </div>
            <div className="preloader_title-r">
              <div data-part="h" className="c1 a-center">
                Beach
              </div>
            </div>
          </div>
        </div>
        <div className="preloader_b">
          <div className="grid">
            <div className="s_title">
              <div data-part="line" className="preloader_progress">
                <div className="preloader_progress_fill">
                  <div className="preloader_progress_track" />
                </div>
              </div>
              <div className="u-32" />
              <p data-part="p" className="l1 a-center">
                TREO Construction
                <br />
                Dream it. Build it. Live it.
              </p>
            </div>
          </div>
          <div className="u-48" />
        </div>
      </div>
      <div className="preloader_bg_arch">
        <div className="preloader_bg_arch_is-1" />
        <div className="preloader_bg_arch_is-2" />
      </div>
      <div className="preloader_bg">
        <div className="preloader_bg_a">
          <img
            src="/assets/images/6a2311bd477167bbc41c9c03_e22485744735d6f17214f25b6157e9b5_preloader_bg.svg"
            loading="eager"
            alt=""
            className="img"
          />
        </div>
        <div className="preloader_bg_decor">
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

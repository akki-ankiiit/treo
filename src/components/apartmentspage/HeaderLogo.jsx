import TreoLogo from "../brand/TreoLogo";
import BrandSeal from "../layout/BrandSeal";
/** Migrated reference markup. Interactions are managed by useSiteExperience. */
export default function HeaderLogo() {
  return (
    <a
      aria-label="Home"
      data-theme=""
      href="/"
      className="header-logo w-inline-block"
    >
      <div
        data-modal-close="menu"
        aria-label="TREO Construction"
        className="logo_symbol header"
      >
        <div className="logo w-embed">
          <TreoLogo />
        </div>
      </div>
      <div className="header-logo_bg b-desk w-embed">
        <BrandSeal />
      </div>
      <div className="header-logo_bg b-mob w-embed">
        <BrandSeal />
      </div>
    </a>
  );
}

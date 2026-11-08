import StudioLayout from '../components/layout/StudioLayout';

export default function LegalPage({ type }) {
  const privacy = type === 'privacy';
  return <StudioLayout showCta={false} breadcrumb="TREO Construction"><section className="section studio-legal"><div className="container"><p className="l2">TREO Construction</p><h1 className="h2">{privacy ? 'Privacy' : 'Terms of use'}</h1>
    {privacy ? <><p>When you contact TREO Construction, the information you choose to share — your name, contact details and project description — is used to respond to your enquiry.</p><p>Your cookie preference is stored in your browser. This website does not add advertising or analytics trackers. Fonts are delivered by Adobe Fonts.</p><p>Online enquiries are delivered only when a contact service is configured. If it is not, the form says so and provides our phone number and email instead. You can always reach us at info@treoconstruction.com or +1 (305) 851-2130.</p><p>For the full privacy policy, please refer to the official TREO Construction website at treoconstruction.com.</p></> : <><p>Project information — addresses, locations, status, architects and interior designers — reflects the official TREO Construction portfolio at the time of publication. Project status may change as construction progresses.</p><p>Renderings may be shown for projects that are in permitting or under construction. Photography and renderings remain the property of TREO Construction and their respective owners and may not be reproduced without permission.</p><p>Scope, budgets, schedules and warranty terms are agreed separately in a written construction agreement.</p></>}
    <a className="h5" href="/contact">Contact TREO Construction ↗</a>
  </div></section></StudioLayout>;
}

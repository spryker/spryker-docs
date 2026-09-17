<div style="max-width:100%;overflow-x:auto;margin:1.5rem 0;">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 470" width="100%" style="max-width:940px;height:auto;"
     role="img" aria-labelledby="trophyTitle trophyDesc" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif">
  <title id="trophyTitle">The Spryker testing trophy</title>
  <desc id="trophyDesc">Four tiers. Static analysis forms a wide base, unit tests a narrow stem, integration tests the widest bowl, and end-to-end tests a small top. Each tier lists the Spryker test types that belong to it.</desc>

  <!-- End-to-end -->
  <rect x="165" y="24" width="150" height="80" rx="8" fill="#FCEEE9" stroke="#E8643C" stroke-width="2"/>
  <text x="240" y="58" text-anchor="middle" font-size="15" font-weight="700" fill="#2B2B28">End-to-end</text>
  <text x="240" y="78" text-anchor="middle" font-size="12.5" fill="#55554F">few, slow,</text>
  <text x="240" y="94" text-anchor="middle" font-size="12.5" fill="#55554F">whole stack</text>
  <line x1="325" y1="64" x2="455" y2="64" stroke="#E8643C" stroke-width="1.5" stroke-dasharray="3 3"/>
  <text x="468" y="54" font-size="14" font-weight="600" fill="#2B2B28">Cypress journey</text>
  <text x="468" y="72" font-size="13" fill="#55554F">— about 30 critical journeys, fully assembled system</text>
  <text x="468" y="94" font-size="14" font-weight="600" fill="#2B2B28">P&amp;S golden path</text>
  <text x="468" y="112" font-size="13" fill="#55554F">— one entity per critical domain, real queue, storage, search</text>

  <!-- Integration -->
  <rect x="40" y="116" width="400" height="104" rx="8" fill="#E9F3EE" stroke="#2E7D5B" stroke-width="2"/>
  <text x="240" y="152" text-anchor="middle" font-size="16" font-weight="700" fill="#2B2B28">Integration</text>
  <text x="240" y="174" text-anchor="middle" font-size="12.5" fill="#55554F">the bulk of the suite</text>
  <text x="240" y="192" text-anchor="middle" font-size="12.5" fill="#55554F">real code, real database,</text>
  <text x="240" y="208" text-anchor="middle" font-size="12.5" fill="#55554F">one process, no external services</text>
  <line x1="442" y1="168" x2="455" y2="168" stroke="#2E7D5B" stroke-width="1.5" stroke-dasharray="3 3"/>
  <text x="468" y="148" font-size="14" font-weight="600" fill="#2B2B28">Facade test</text>
  <text x="620" y="148" font-size="13" fill="#55554F">— business rules and derived values</text>
  <text x="468" y="170" font-size="14" font-weight="600" fill="#2B2B28">API contract test</text>
  <text x="620" y="170" font-size="13" fill="#55554F">— every route, response and rule</text>
  <text x="468" y="192" font-size="14" font-weight="600" fill="#2B2B28">P&amp;S module test</text>
  <text x="620" y="192" font-size="13" fill="#55554F">— event, table row, key and payload</text>
  <text x="468" y="214" font-size="14" font-weight="600" fill="#2B2B28">Search query test</text>
  <text x="620" y="214" font-size="13" fill="#55554F">— query built, result mapped</text>

  <!-- Unit -->
  <rect x="140" y="232" width="200" height="80" rx="8" fill="#EAEFF7" stroke="#4A6FA5" stroke-width="2"/>
  <text x="240" y="266" text-anchor="middle" font-size="15" font-weight="700" fill="#2B2B28">Unit</text>
  <text x="240" y="286" text-anchor="middle" font-size="12.5" fill="#55554F">only where a wider test</text>
  <text x="240" y="302" text-anchor="middle" font-size="12.5" fill="#55554F">cannot reach the branch</text>
  <line x1="350" y1="272" x2="455" y2="272" stroke="#4A6FA5" stroke-width="1.5" stroke-dasharray="3 3"/>
  <text x="468" y="266" font-size="14" font-weight="600" fill="#2B2B28">Class unit test</text>
  <text x="468" y="288" font-size="14" font-weight="600" fill="#2B2B28">Provider / processor test</text>
  <text x="468" y="306" font-size="13" fill="#55554F">— branches inside an API provider or processor</text>

  <!-- Static -->
  <rect x="80" y="324" width="320" height="76" rx="8" fill="#F0F0EE" stroke="#6B6B68" stroke-width="2"/>
  <text x="240" y="356" text-anchor="middle" font-size="15" font-weight="700" fill="#2B2B28">Static analysis</text>
  <text x="240" y="376" text-anchor="middle" font-size="12.5" fill="#55554F">runs on every file,</text>
  <text x="240" y="392" text-anchor="middle" font-size="12.5" fill="#55554F">costs no test to write</text>
  <line x1="410" y1="362" x2="455" y2="362" stroke="#6B6B68" stroke-width="1.5" stroke-dasharray="3 3"/>
  <text x="468" y="356" font-size="14" font-weight="600" fill="#2B2B28">PHPStan · Code Sniffer · Architecture Sniffer</text>
  <text x="468" y="376" font-size="13" fill="#55554F">— types, style and layer boundaries, so no test has to assert them</text>

  <!-- Cost axis -->
  <defs>
    <marker id="trophyArrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L8 4 L0 8 z" fill="#9A9A94"/>
    </marker>
  </defs>
  <line x1="26" y1="34" x2="26" y2="396" stroke="#9A9A94" stroke-width="1.5" marker-end="url(#trophyArrow)"/>
  <text x="17" y="215" font-size="11.5" fill="#6B6B68" text-anchor="middle" transform="rotate(-90 17 215)">faster, narrower, points straight at the defect</text>

  <text x="40" y="432" font-size="12.5" fill="#6B6B68">Bar width shows the intended share of the suite, not the number of assertions.</text>
  <text x="40" y="452" font-size="12.5" fill="#6B6B68">Put every test in the cheapest tier that can still see the defect you want it to catch.</text>
</svg>
</div>

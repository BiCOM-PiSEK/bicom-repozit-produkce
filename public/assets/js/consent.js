/*
  Bicom Písek — Cookie Consent (consent.js)
  Spravuje cookie lištu a ochranu osobních údajů v souladu s GDPR.
*/

document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");
  const declineBtn = document.getElementById("cookie-decline");
  const settingsBtn = document.getElementById("cookie-settings-btn");
  const gdprLink = document.getElementById("gdpr-link");

  /**
   * Checks current consent state and updates banner visibility.
   */
  function checkConsent() {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setTimeout(() => {
        banner.style.display = "block";
      }, 1000);
    }
  }

  // Accept all cookies
  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookie-consent", "accepted");
    banner.style.display = "none";
    initAnalytics();
  });

  // Decline non-essential cookies
  declineBtn.addEventListener("click", () => {
    localStorage.setItem("cookie-consent", "declined");
    banner.style.display = "none";
  });

  // Show settings banner again
  settingsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    banner.style.display = "block";
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  });

  // Handle GDPR link click (go to /gdpr route)
  gdprLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.history.pushState(null, "", "/gdpr");
    
    // Resolve route dynamically if router is exported
    import("./router.js").then(module => {
      module.resolveRoute();
    });
  });

  /**
   * Initializes analytics tracking if consented.
   */
  function initAnalytics() {
    const consent = localStorage.getItem("cookie-consent");
    if (consent === "accepted") {
      console.log("[analytics] Analytics tracking initialized.");
      // Insert tracking tags here if requested
    }
  }

  // Initial check
  checkConsent();
  initAnalytics();
});

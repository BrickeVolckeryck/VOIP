async function loadScript(id, path) {
  const response = await fetch(path);
  const text = await response.text();
  document.getElementById(id).textContent = text;
}

loadScript("Vagrantfile", "scripts/Vagrantfile")
loadScript("confbridge", "scripts/confbridge.conf");
loadScript("extensions", "scripts/extensions.conf");
loadScript("pjsip", "scripts/pjsip.conf");
loadScript("rtp", "scripts/rtp.conf");
loadScript("provision", "scripts/provision.sh");

// Toggle visibility
// Select all toggle buttons
const toggleButtons = document.querySelectorAll('.script-toggle');

toggleButtons.forEach((btn, index) => {
  const pre = btn.nextElementSibling;

  // Initialize
  pre.style.overflow = "hidden";
  pre.style.transition = "height 0.4s ease, padding 0.4s ease";
  pre.style.height = "0px";
  pre.style.padding = "0 15px";
  pre.style.display = "none";

  // Open the first block only after its content is loaded
  if (index === 0) {
    // Wait until the next tick to ensure content is loaded
    setTimeout(() => {
      pre.style.display = "block";
      pre.style.height = pre.scrollHeight + "px";
      pre.style.padding = "10px 15px";
    }, 50); // small delay, adjust if needed
  }

  btn.addEventListener('click', () => {
    if (pre.style.display === "none") {
      // Open
      pre.style.display = "block";
      const height = pre.scrollHeight + "px";
      setTimeout(() => {
        pre.style.height = height;
        pre.style.padding = "10px 15px";
      }, 10);
    } else {
      // Close
      pre.style.height = "0px";
      pre.style.padding = "0 15px";
      pre.addEventListener("transitionend", function handler() {
        pre.style.display = "none";
        pre.removeEventListener("transitionend", handler);
      });
    }
  });
});

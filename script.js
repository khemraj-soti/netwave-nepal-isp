(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const toast = $("#toast");
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    $$(".modal-backdrop").forEach(item => { item.hidden = true; });
    modal.hidden = false;
    document.body.classList.add("modal-open");
    const focusable = $("input:not([type=hidden]), button, textarea, select", modal);
    if (focusable) setTimeout(() => focusable.focus(), 50);
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.hidden = true;
    if (!$(".modal-backdrop:not([hidden])")) document.body.classList.remove("modal-open");
  }

  $$("[data-open]").forEach(button => button.addEventListener("click", () => {
    if (button.dataset.closeCurrent) closeModal(button.dataset.closeCurrent);
    openModal(button.dataset.open);
  }));
  $$("[data-close]").forEach(button => button.addEventListener("click", () => closeModal(button.closest(".modal-backdrop").id)));
  $$(".modal-backdrop").forEach(backdrop => backdrop.addEventListener("click", event => {
    if (event.target === backdrop) closeModal(backdrop.id);
  }));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      const opened = $(".modal-backdrop:not([hidden])");
      if (opened) closeModal(opened.id);
    }
  });

  const menuToggle = $("#menuToggle");
  const nav = $("#mainNav");
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("open", !expanded);
  });
  $$(".nav-link").forEach(link => link.addEventListener("click", () => {
    $$(".nav-link").forEach(item => item.classList.remove("active"));
    link.classList.add("active");
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));

  $$(".choose-plan").forEach(button => button.addEventListener("click", () => {
    const plan = button.dataset.plan;
    $("#selectedPlan").value = plan;
    $("#orderPlanText").textContent = `Selected plan: ${plan}. Submit a demo request to continue.`;
    $("#orderMessage").textContent = "";
    openModal("orderModal");
  }));

  $("#coverageForm").addEventListener("submit", event => {
    event.preventDefault();
    const area = $("#coverageLocation").value.trim();
    $("#coverageMessage").textContent = `Thanks! Coverage for ${area} would need to be confirmed by the NetWave team. This demo does not check a live network.`;
  });

  $("#orderForm").addEventListener("submit", event => {
    event.preventDefault();
    const plan = $("#selectedPlan").value || "your selected plan";
    $("#orderMessage").textContent = `Demo request complete for ${plan}. No information was sent or stored.`;
    showToast("Demo connection request submitted.");
    event.target.reset();
  });

  $("#loginForm").addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(event.target);
    const customerId = String(data.get("customerId")).trim();
    $("#loginMessage").textContent = "";
    $("#accountPanel").hidden = false;
    $("#accountPanel").innerHTML = `<strong>Demo account: ${escapeHtml(customerId)}</strong><br><br>Sample plan: Home Plus · 200 Mbps<br>Account status: Demo only<br><br><button class="btn btn-outline btn-full" type="button" id="closeAccount">Close demo account</button>`;
    $("#closeAccount").addEventListener("click", () => {
      $("#accountPanel").hidden = true;
      $("#loginForm").reset();
    });
    showToast("Opened a sample account dashboard.");
  });

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  $("#runSpeedTest").addEventListener("click", () => {
    const button = $("#runSpeedTest");
    const number = $("#testNumber");
    const message = $("#speedMessage");
    button.disabled = true;
    button.textContent = "Testing demo...";
    message.textContent = "Generating a sample value — not measuring your connection.";
    number.textContent = "…";
    setTimeout(() => {
      number.textContent = String([96, 124, 178, 201, 246][Math.floor(Math.random() * 5)]);
      message.textContent = "Demo complete. This number is randomly generated and is not your actual speed.";
      button.disabled = false;
      button.textContent = "Run again";
    }, 900);
  });

  $("#supportForm").addEventListener("submit", event => {
    event.preventDefault();
    $("#supportMessage").textContent = "Thanks — your demo message was validated, but it was not sent anywhere.";
    showToast("Demo message ready.");
    event.target.reset();
  });

  $$('a[href^="#"]').forEach(link => link.addEventListener("click", event => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", link.getAttribute("href"));
    }
  }));

  $("#year").textContent = new Date().getFullYear();
})();
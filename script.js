/* ===== EDIT THIS BLOCK FIRST =====
   Replace placeholders only after the owner gives permission and accurate details. */
const CONFIG = {
  brand: "Maison Eclat",
  phoneDisplay: "+91 00000 00000",
  phoneLink: "+910000000000",
  whatsapp: "910000000000",
  whatsappMessage: "Hello, I would like to order a cake",
  mapsQuery: "Your Cafe Address Here",
  minLeadDays: 5   // minimum days between today and the cake date
};

(function () {
  "use strict";

  document.querySelectorAll("[data-brand]").forEach(function (el) { el.textContent = CONFIG.brand; });
  document.querySelectorAll("[data-tel]").forEach(function (el) {
    el.href = "tel:" + CONFIG.phoneLink;
    el.textContent = "Call " + CONFIG.phoneDisplay;
  });
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    el.href = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(CONFIG.whatsappMessage);
  });
  document.querySelectorAll("[data-maps]").forEach(function (el) {
    el.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(CONFIG.mapsQuery);
  });

  /* mobile nav */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  function setNav(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  }
  toggle.addEventListener("click", function () { setNav(!nav.classList.contains("open")); });
  nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setNav(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setNav(false); });

  /* inquiry form: front-end validation only, nothing is sent anywhere */
  var form = document.getElementById("inquiry");
  var notice = document.getElementById("notice");
  var dateInput = document.getElementById("date");

  function isoDate(d) {
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }
  var min = new Date();
  min.setDate(min.getDate() + CONFIG.minLeadDays);
  dateInput.min = isoDate(min);

  function check(field) {
    var input = field.querySelector("input,select,textarea");
    var err = field.querySelector(".err");
    var v = input.value.trim();
    var msg = "";
    if (!v) msg = "Please fill this in.";
    else if (input.name === "phone" && v.replace(/\D/g, "").length < 10) msg = "Enter a phone number with at least 10 digits.";
    else if (input.name === "date" && v < dateInput.min) msg = "Please choose a date at least " + CONFIG.minLeadDays + " days from today.";
    else if (input.name === "idea" && v.length < 10) msg = "A little more detail helps us (10+ characters).";
    field.classList.toggle("bad", !!msg);
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    err.textContent = msg;
    return !msg;
  }
  var fields = form.querySelectorAll(".field");
  fields.forEach(function (f) {
    f.querySelector("input,select,textarea").addEventListener("blur", function () { check(f); });
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    fields.forEach(function (f) { if (!check(f)) ok = false; });
    notice.classList.remove("ok");
    if (!ok) {
      notice.textContent = "Please fix the highlighted fields. (Demo form: nothing is sent.)";
      var first = form.querySelector(".bad input, .bad select, .bad textarea");
      if (first) first.focus();
      return;
    }
    notice.classList.add("ok");
    notice.textContent = "Demo only: your details look valid, but this form does not send anything. A real site needs a form service or backend.";
    form.reset();
  });

  /* reveal on scroll */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.1 });
    items.forEach(function (i) { io.observe(i); });
  } else { items.forEach(function (i) { i.classList.add("in"); }); }

  /* image fallback */
  document.querySelectorAll("img").forEach(function (img) {
    img.addEventListener("error", function () { img.style.opacity = "0"; });
  });
})();

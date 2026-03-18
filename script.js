const defaults = {
  title: "Moni Extension",
  tagline: "Faster signal-to-trade across X and trading terminals",
  version: "Build Update 2.3.0",
  code: "fba798a4",
  downloadLabel: "Download Now",
  download: "https://chromewebstore.google.com/detail/moni-extension/bgooiolaoinoncegoopcmincbomphmhi",
  changelog: "https://getmoni.io/changelog",
  source: "https://github.com/Moni-Labs/Moni-Extension",
  docs: "https://deepwiki.com/Moni-Labs/Moni-Extension",
  open: false,
  features: [
    "Trade directly on X with Quick Buy from any CA you spot in posts or profiles.",
    "See social metrics on Axiom and Padre, including Moni Score and smart holder signals.",
    "Generate, share and track invite codes with a three-tier referral flow.",
    "Keep labels everywhere, including X accounts and wallet tags inside terminals.",
    "Manage presets, settings and integrations from one cleaner control surface.",
    "Ship with stability upgrades, fewer crashes and a sharper instant trade UI.",
  ],
};

const params = new URLSearchParams(window.location.search);

const config = {
  title: params.get("title") || defaults.title,
  tagline: params.get("tagline") || defaults.tagline,
  version: params.get("version") || defaults.version,
  code: params.get("code") || defaults.code,
  downloadLabel: params.get("cta") || defaults.downloadLabel,
  download: params.get("download") || defaults.download,
  changelog: params.get("changelog") || defaults.changelog,
  source: params.get("source") || defaults.source,
  docs: params.get("docs") || defaults.docs,
  open: ["1", "true", "yes"].includes((params.get("open") || "").toLowerCase()) || defaults.open,
  features: (params.get("features") || "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean),
};

const banner = document.getElementById("banner-card");
const toggle = document.getElementById("banner-toggle");
const panel = document.getElementById("expandable-panel");

document.getElementById("banner-title").textContent = config.title;
document.getElementById("banner-tagline").textContent = config.tagline;
document.getElementById("version-chip").textContent = config.version;
document.title = config.title;
document.getElementById("access-code").textContent = config.code;

const featureList = document.getElementById("feature-list");
const featureItems = config.features.length ? config.features : defaults.features;
featureList.innerHTML = "";
featureItems.forEach((feature) => {
  const li = document.createElement("li");
  li.textContent = feature;
  featureList.appendChild(li);
});

const wireLink = (id, href, label) => {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  if (!href) {
    element.setAttribute("aria-disabled", "true");
    element.removeAttribute("href");
    if (label) {
      element.textContent = label;
    }
    return;
  }

  element.href = href;
  element.removeAttribute("aria-disabled");
  if (label) {
    element.childNodes[0].textContent = `${label} `;
  }
};

const downloadLink = document.getElementById("download-link");
document.getElementById("download-label").textContent = config.downloadLabel;
if (config.download) {
  downloadLink.href = config.download;
  downloadLink.setAttribute("aria-disabled", "false");
  document.querySelectorAll("[data-download-mirror='true']").forEach((element) => {
    element.href = config.download;
  });
} else {
  downloadLink.removeAttribute("href");
}

wireLink("changelog-link", config.changelog);
wireLink("source-link", config.source);
wireLink("docs-link", config.docs);

const syncOpenState = (isOpen) => {
  banner.dataset.open = String(isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
  panel.hidden = !isOpen;
};

toggle.addEventListener("click", () => {
  const isOpen = toggle.getAttribute("aria-expanded") !== "true";
  syncOpenState(isOpen);
});

syncOpenState(config.open);

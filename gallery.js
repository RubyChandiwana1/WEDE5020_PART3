// Dynamic gallery with search, sort, and lightbox

(function () {
  const items = [
    {
      title: "Health Outreach Programs",
      description: "Bringing healthcare directly to underserved communities.",
      src: "_image/Health outreach.jpeg",
      tags: ["health", "outreach", "community"],
    },
    {
      title: "Our Volunteer Team",
      description: "Dedicated men and women making a difference on the ground.",
      src: "_image/volenteer team (2).jpeg",
      tags: ["volunteer", "team"],
    },
    {
      title: "Educational Workshops",
      description: "Empowering youth with health knowledge and life skills.",
      src: "_image/educational workshop.jpeg",
      tags: ["education", "workshop"],
    },
    {
      title: "Community Support",
      description: "Uniting communities for better health outcomes.",
      src: "_image/community events.jpeg",
      tags: ["community", "support"],
    },
    {
      title: "Fundraising Events",
      description: "Raising awareness and resources for our mission.",
      src: "_image/fundraising events.jpeg",
      tags: ["fundraising", "events"],
    },
  ];

  const state = {
    query: "",
    sort: "title-asc",
  };

  function normalize(text) {
    return text.toLowerCase();
  }

  function filterAndSort(data) {
    const q = normalize(state.query);
    const filtered = data.filter((item) => {
      if (!q) return true;
      return (
        normalize(item.title).includes(q) ||
        normalize(item.description).includes(q) ||
        item.tags.some((t) => normalize(t).includes(q))
      );
    });

    const sorted = filtered.sort((a, b) => {
      const [key, dir] = state.sort.split("-");
      const va = normalize(a[key]);
      const vb = normalize(b[key]);
      if (va < vb) return dir === "asc" ? -1 : 1;
      if (va > vb) return dir === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }

  function renderControls() {
    const controls = document.getElementById("gallery-controls");
    if (!controls) return;
    controls.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.style.maxWidth = "1100px";
    wrapper.style.margin = "0 auto 10px";
    wrapper.style.display = "grid";
    wrapper.style.gridTemplateColumns = "1fr 200px";
    wrapper.style.gap = "10px";
    if (window.revealObserve) window.revealObserve(wrapper);

    const search = document.createElement("input");
    search.type = "search";
    search.placeholder = "Search gallery (e.g. outreach, team, workshop)";
    search.ariaLabel = "Search gallery";
    search.value = state.query;
    search.oninput = (e) => {
      state.query = e.target.value || "";
      render();
    };

    const select = document.createElement("select");
    select.ariaLabel = "Sort gallery";
    select.innerHTML = `
      <option value="title-asc">Title (A–Z)</option>
      <option value="title-desc">Title (Z–A)</option>
    `;
    select.value = state.sort;
    select.onchange = (e) => {
      state.sort = e.target.value;
      render();
    };

    wrapper.appendChild(search);
    wrapper.appendChild(select);
    controls.appendChild(wrapper);
  }

  function renderGallery(data) {
    const container = document.getElementById("gallery");
    if (!container) return;
    container.innerHTML = "";

    data.forEach((item) => {
      const card = document.createElement("div");
      card.className = "gallery-item";

      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.title;
      img.loading = "lazy"; // performance
      img.className = "lightbox-trigger";
      img.addEventListener("click", () => openLightbox(item.src, item.title));

      const h3 = document.createElement("h3");
      h3.textContent = item.title;

      const p = document.createElement("p");
      p.textContent = item.description;

      card.appendChild(img);
      card.appendChild(h3);
      card.appendChild(p);
      container.appendChild(card);
      if (window.revealObserve) window.revealObserve(card);
    });
  }

  // Lightbox
  function openLightbox(src, alt) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Expanded view";
    lightbox.classList.add("open");
  }

  function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.remove("open");
    // Defer clearing src slightly to allow fade-out
    setTimeout(() => { lightboxImg.src = ""; }, 250);
  }

  function wireLightbox() {
    const closeBtn = document.getElementById("close");
    const lightbox = document.getElementById("lightbox");
    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (lightbox) lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });
  }

  function render() {
    renderControls();
    const view = filterAndSort(items);
    renderGallery(view);
  }

  document.addEventListener("DOMContentLoaded", () => {
    wireLightbox();
    render();
  });
})();



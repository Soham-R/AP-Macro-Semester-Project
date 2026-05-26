(() => {
  const navToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (
        target instanceof Node &&
        !navLinks.contains(target) &&
        !navToggle.contains(target)
      ) {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  const revealTargets = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealTargets.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("revealed"));
  }

  const timelineNodes = document.querySelectorAll(".cycle-node");
  const timelineDetailTitle = document.querySelector("#cycle-detail-title");
  const timelineDetailText = document.querySelector("#cycle-detail-text");
  if (timelineNodes.length && timelineDetailTitle && timelineDetailText) {
    const setActiveNode = (node) => {
      timelineNodes.forEach((item) => item.classList.remove("active"));
      node.classList.add("active");
      timelineDetailTitle.textContent = node.dataset.title || "";
      timelineDetailText.textContent = node.dataset.detail || "";
    };

    timelineNodes.forEach((node) => {
      node.addEventListener("mouseenter", () => setActiveNode(node));
      node.addEventListener("focus", () => setActiveNode(node));
      node.addEventListener("click", () => setActiveNode(node));
    });

    setActiveNode(timelineNodes[0]);
  }
})();

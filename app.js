(() => {
  const content = window.SHINTOQ_CONTENT;
  if (!content) {
    throw new Error("SHINTOQ_CONTENT is missing. Load content.js before app.js.");
  }

  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };

  const makeImage = (src, alt, className) => {
    if (!src) return null;
    const image = document.createElement("img");
    image.src = src;
    image.alt = alt;
    image.className = className;
    return image;
  };

  const renderPrinciples = () => {
    const container = document.getElementById("principles");
    content.principles.forEach((principle) => {
      const article = document.createElement("article");
      article.className = "principle-card";
      const category = document.createElement("p");
      category.className = "eyebrow";
      category.textContent = principle.number;
      const title = document.createElement("h3");
      title.textContent = principle.title;
      const description = document.createElement("p");
      description.textContent = principle.description;
      article.append(category, title, description);
      container.append(article);
    });
  };

  const renderActivities = () => {
    const container = document.getElementById("activity-grid");
    content.activities.items.forEach((activity) => {
      const article = document.createElement("article");
      article.className = "activity-card";
      const number = document.createElement("span");
      number.className = "activity-number";
      number.textContent = activity.number;
      const title = document.createElement("h3");
      title.textContent = activity.title;
      const description = document.createElement("p");
      description.textContent = activity.description;
      article.append(number, title, description);
      container.append(article);
    });
  };

  const renderEvents = () => {
    const container = document.getElementById("event-grid");
    content.events.items.forEach((event) => {
      const article = document.createElement("article");
      article.className = "event-card";
      const imageLink = document.createElement("a");
      imageLink.className = "event-image-link";
      imageLink.href = event.link;
      imageLink.setAttribute("aria-label", `${event.title}の詳細`);
      const image = makeImage(event.image, event.imageAlt, "event-image");
      if (image) imageLink.append(image);

      const category = document.createElement("span");
      category.className = "event-category";
      category.textContent = event.category;
      imageLink.append(category);

      const date = document.createElement("p");
      date.className = "event-date";
      date.textContent = event.date;
      const location = document.createElement("span");
      location.className = "event-location";
      location.textContent = event.location;
      date.append(document.createTextNode("　"), location);

      const title = document.createElement("h3");
      title.textContent = event.title;
      const description = document.createElement("p");
      description.className = "event-description";
      description.textContent = event.description;
      const details = document.createElement("a");
      details.className = "event-details";
      details.href = event.link;
      details.append(document.createTextNode("参加・詳細はこちら "));
      const arrow = document.createElement("span");
      arrow.textContent = "↗";
      arrow.setAttribute("aria-hidden", "true");
      details.append(arrow);

      const body = document.createElement("div");
      body.className = "event-body";
      body.append(date, title, description, details);
      article.append(imageLink, body);
      container.append(article);
    });
  };

  setText("hero-description", content.hero.description);
  const heroImage = document.getElementById("hero-image");
  heroImage.src = content.hero.image;
  heroImage.alt = content.hero.imageAlt;
  setText("about-description", content.about.description);
  const philosophyImage = document.getElementById("philosophy-image");
  philosophyImage.src = content.philosophy.image;
  philosophyImage.alt = content.philosophy.imageAlt;
  setText("philosophy-title", content.philosophy.title);
  setText("philosophy-description", content.philosophy.description);
  setText("activities-description", content.activities.description);
  setText("events-description", content.events.description);
  setText("join-title", content.join.title);
  setText("join-description", content.join.description);
  document.getElementById("contact-link").href = content.join.contactUrl;
  setText("instagram-description", content.instagram.description);
  setText("instagram-handle", content.instagram.handle);
  document.getElementById("instagram-link").href = content.instagram.url;
  setText("footer-message", content.footer);
  renderPrinciples();
  renderActivities();
  renderEvents();

  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.getElementById("site-nav");
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("is-open", !expanded);
  });
  siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    }
  });
})();

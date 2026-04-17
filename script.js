const byId = (id) => document.getElementById(id);

const setText = (id, value) => {
  const node = byId(id);
  if (node) {
    node.textContent = value;
  }
};

const createTag = (tagName, className, text) => {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text;
  }
  return element;
};

const populateHero = () => {
  document.title = `${resumeData.name} | Resume`;
  setText("heroRole", resumeData.role);
  setText("heroName", resumeData.name);
  setText("heroSummary", resumeData.summary);
  setText("availability", resumeData.availability);
  setText("location", resumeData.location);
  setText("focusArea", resumeData.focusArea);

  const resumeLink = byId("resumeLink");
  resumeLink.href = resumeData.resumeUrl || "#";
  if (!resumeData.resumeUrl || resumeData.resumeUrl === "#") {
    resumeLink.textContent = "Add Resume Link";
  }

  const highlightsList = byId("highlights");
  resumeData.highlights.forEach((item) => {
    highlightsList.appendChild(createTag("li", "", item));
  });
};

const populateAbout = () => {
  setText("aboutText", resumeData.about);
  setText("yearsExperience", resumeData.metrics.yearsExperience);
  setText("projectsCount", resumeData.metrics.projectsCount);
  setText("stackCount", resumeData.metrics.stackCount);
};

const populateExperience = () => {
  const experienceList = byId("experienceList");

  resumeData.experience.forEach((item, index) => {
    const article = createTag(
      "article",
      `timeline-item reveal ${index > 0 ? "stagger-1" : ""}`.trim()
    );

    const topLine = createTag("div", "timeline-topline");
    const titleWrap = createTag("div", "");
    const heading = createTag("h3", "", item.title);
    const company = createTag("strong", "", item.company);
    const period = createTag("span", "project-meta", item.period);
    const description = createTag("p", "", item.description);

    titleWrap.append(heading, company);
    topLine.append(titleWrap, period);
    article.append(topLine, description);
    experienceList.appendChild(article);
  });
};

const populateProjects = () => {
  const projectsList = byId("projectsList");

  resumeData.projects.forEach((project, index) => {
    const card = createTag(
      "article",
      `project-card reveal ${index > 0 ? "stagger-1" : ""}`.trim()
    );
    const top = createTag("div", "");
    const meta = createTag("p", "project-meta", project.category);
    const title = createTag("h3", "", project.title);
    const description = createTag("p", "", project.description);
    const stackList = createTag("div", "stack-list");
    const links = createTag("div", "project-links");

    project.stack.forEach((item) => {
      stackList.appendChild(createTag("span", "", item));
    });

    project.links.forEach((link) => {
      const anchor = createTag("a", "", link.label);
      anchor.href = link.url;
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
      links.appendChild(anchor);
    });

    top.append(meta, title, description);
    card.append(top, stackList, links);
    projectsList.appendChild(card);
  });
};

const populateSkills = () => {
  const skillsList = byId("skillsList");

  resumeData.skills.forEach((group) => {
    const block = createTag("div", "skills-group");
    const title = createTag("h3", "", group.category);
    const stack = createTag("div", "stack-list");

    group.items.forEach((item) => {
      stack.appendChild(createTag("span", "", item));
    });

    block.append(title, stack);
    skillsList.appendChild(block);
  });

  const valuesList = byId("valuesList");
  resumeData.values.forEach((item) => {
    valuesList.appendChild(createTag("li", "", item));
  });
};

const populateContact = () => {
  setText("contactText", resumeData.contactText);
  const contactLinks = byId("contactLinks");

  resumeData.contactLinks.forEach((item) => {
    const anchor = createTag("a", "", item.label);
    anchor.href = item.url;
    if (item.url.startsWith("http")) {
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
    }
    contactLinks.appendChild(anchor);
  });
};

const setupInteractions = () => {
  byId("printButton").addEventListener("click", () => {
    window.print();
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });
};

populateHero();
populateAbout();
populateExperience();
populateProjects();
populateSkills();
populateContact();
setupInteractions();

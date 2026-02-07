// sidebar component - generates navigation based on current page
(function () {
  let currentPage = window.location.pathname.split("/").pop() || "index.html";
  // normalize pages served without .html (Neocities may serve /music or /photos)
  if (currentPage === "") currentPage = "index.html";
  const pageKey = currentPage.endsWith('.html') ? currentPage : currentPage + '.html';

  // define page-specific configurations
  const pageConfig = {
    "index.html": {
      navItems: [
        { href: "#", id: "about-btn", label: "about" },
        { href: "#", id: "thoughts-btn", label: "thoughts" },
        { href: "photos.html", label: "photos" },
        { href: "music.html", label: "music" },
      ],
    },
    "photos.html": {
      navItems: [
        { href: "index.html", label: "home" },
        { href: "music.html", label: "music" },
      ],
    },
    "music.html": {
      navItems: [
        { href: "index.html", label: "home" },
        { href: "photos.html", label: "photos" },
      ],
    },
  };

  const banners = `
      <div class="banners-wrapper">
      <div class="banners-wrapper-title">✧ banners ✧</div>
      <div class="neocities__banners">
      <a href="https://www.sut.ru/">
        <img src="photos/bonch.png"></img>
      </a>
      <a href="https://nekohash.neocities.org/">
        <img src="photos/nekohash.png" alt="html" />
      </a>
      <a href="https://neocities.org/">
        <img src="https://sugarblush.neocities.org/images/assets/neocities-animated.gif" alt="Powered by Neocities" />
      </a>
      <a>
        <img src="https://anomalous.monster/img/buttons/computer.gif" alt="computer" />
      </a>
      <a href="https://www.youtube.com/watch?v=FtutLA63Cp8">
        <img src="https://lhfm.neocities.org/88x31/bad-apple.gif" alt="bad apple! !" />
      </a>
      <a href="https://microsoft.com">
        <img src="https://anlucas.neocities.org/ms.gif" alt="Microsoft logo" />
      </a>
      <a href="https://ru.wikipedia.org/wiki/%D0%AD%D0%BA%D1%81%D0%BF%D0%B5%D1%80%D0%B8%D0%BC%D0%B5%D0%BD%D1%82%D1%8B_%D0%9B%D1%8D%D0%B9%D0%BD">
        <img src="https://external-media.spacehey.net/media/sHU3pdPwobr-qrlkcMFZgKmjhO_mCdcSXxq4o2ghMJ7I=/https://adriansblinkiecollection.neocities.org/buttons/e21.gif" alt="let's all love lain" />
      </a>
      <a href="https://x.com/tobyfox">
        <img src="https://i.postimg.cc/fTps5Sx0/dogcar.gif" alt="tobyfox" />
      </a>
      <a>
        <img src="https://obby.dog/buttons/css.png" alt="CSS is awesome" />
      </a>
    </div>
    </div>
  `;

  // about tooltip HTML for photos page
  const aboutPhotosHTML = `
      <div class="about-banner">
      <h2>about this page</h2>
      <p>
        welcome to my photo gallery! all photos are taken by me using a
        variety of cameras. feel free to browse around and enjoy the images i
        have captured over time.
      </p>
    </div>
  `;

  const aboutMusicHTML = `
      <div class="about-banner">
      <h2>about this page</h2>
      <p>
        this is a collection of music that i like! i listen to a wide variety
        of genres, but my favorites are ambient and electronic. i
        hope you find something new to listen to here!
      </p>
    </div>
  `;

  function generateSidebar() {
    const sidebar = document.querySelector(".sidebar");
    if (!sidebar) return;

    // try to find a matching config using normalized pageKey
    const tryKeys = [currentPage, pageKey];
    let config = null;
    for (const k of tryKeys) {
      if (pageConfig[k]) {
        config = pageConfig[k];
        break;
      }
    }
    if (!config) return; // unknown page, don't modify

    const navHTML = config.navItems
      .map((item) => {
        if (item.type === "about-tooltip") {
          return `<li>${aboutPhotosHTML}</li>`;
        }
        const idAttr = item.id ? ` id="${item.id}"` : "";
        return `<li><a href="${item.href}"${idAttr}>${item.label}</a></li>`;
      })
      .join("");

    let aboutBanner = "";
    if (pageKey === "photos.html") {
      aboutBanner = aboutPhotosHTML;
    } else if (pageKey === "music.html") {
      aboutBanner = aboutMusicHTML;
    }

    sidebar.innerHTML = `
      <h1>neko's den</h1>

      <ul class="section">
        ${navHTML}

      </ul>
                    ${aboutBanner}
      ${banners}
    `;

    // dispatch event when sidebar is ready
    document.dispatchEvent(new CustomEvent("sidebarReady"));
  }

  // run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", generateSidebar);
  } else {
    generateSidebar();
  }
})();

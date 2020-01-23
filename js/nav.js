document.addEventListener("DOMContentLoaded", function() {
  // Activate sidebar nav
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();
  loadSideNav();

  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;
        // Muat daftar tautan menu
        document.querySelectorAll(".topnav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // Daftarkan event listener untuk setiap tautan menu
        document
        .querySelectorAll(".topnav a")
        .forEach(function(elm) {
          elm.addEventListener("click", function(event) {
              // Muat konten halaman yang dipanggil
              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
        });
      }
    };
    xhttp.open("GET", "./navigation/topnav.html", true);
    xhttp.send();
  }

  function loadSideNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll(".sidenav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // Daftarkan event listener untuk setiap tautan menu
        document
        .querySelectorAll(".sidenav a")
        .forEach(function(elm) {
          elm.addEventListener("click", function(event) {
              // Muat konten halaman yang dipanggil
              var sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();
              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
        });
      }
    };
    xhttp.open("GET", "./navigation/sidenav.html", true);
    xhttp.send();
  }

  // Load page content
  var page = window.location.hash.substr(1);
  if (page == "") page = "home";
  loadPage(page);

  function loadPage(page) {
    // fetch('pages/' + page + '.html')
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        var content = document.querySelector("#body-content");
        
        if (page === "home") {
          getSchedule();
        }else if (page === "champions"){
          getChampions();
        }else if ( page==="favorite"){
          getFavoriteData();
        }

        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }
});

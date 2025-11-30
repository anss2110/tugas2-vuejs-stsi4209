const CREDENTIALS = {
  email: "admin@ut.ac.id",
  password: "P@ssw0rd",
};

const COOKIE_NAME = "sitta_session";
const EXPIRY_HOURS = 3;

// 1. Fungsi Set Cookie (Expired dalam 3 Jam)
function setSessionCookie(token) {
  const d = new Date();
  d.setTime(d.getTime() + EXPIRY_HOURS * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${COOKIE_NAME}=${token};${expires};path=/`;
}

// 2. Fungsi Get Cookie
function getSessionCookie() {
  const name = COOKIE_NAME + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// 3. Fungsi Login
function doLogin(email, password) {
  if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
    // Generate simple token (dummy)
    const token = btoa(`${email}:${new Date().getTime()}`);
    setSessionCookie(token);
    return true;
  }
  return false;
}

// 4. Fungsi Logout
function doLogout() {
  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  window.location.href = "login.html";
}

// 5. AUTO CHECK (The Guard)
// Jalankan pengecekan ini setiap kali file ini dimuat
(function checkAuth() {
  const currentPage = window.location.pathname.split("/").pop();

  // Jika halaman sekarang bukan login.html
  if (currentPage !== "login.html") {
    const token = getSessionCookie();

    // Jika tidak ada token (cookie expired/kosong), auto kick ke laman login
    if (!token) {
      window.location.href = "login.html";
    }
  } else {
    // Jika halaman sekarang ADALAH login.html, tapi user sudah punya token
    // Redirect langsung ke index (biar tidak login ulang)
    const token = getSessionCookie();
    if (token) {
      window.location.href = "index.html";
    }
  }
})();

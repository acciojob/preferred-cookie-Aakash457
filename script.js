// Function to set cookie
function setCookie(name, value, days = 365) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Function to get cookie
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
}

// Apply saved preferences on page load
window.onload = function () {
  const savedFontSize = getCookie("fontsize");
  const savedFontColor = getCookie("fontcolor");

  if (savedFontSize) {
    document.documentElement.style.setProperty("--fontsize", savedFontSize);
    document.getElementById("fontsize").value = parseInt(savedFontSize);
  }

  if (savedFontColor) {
    document.documentElement.style.setProperty("--fontcolor", savedFontColor);
    document.getElementById("fontcolor").value = savedFontColor;
  }
};

// Handle form submission
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const fontSizeInput = document.getElementById("fontsize").value;
  const fontColorInput = document.getElementById("fontcolor").value;

  const fontSizeValue = fontSizeInput + "px";

  // Save cookies
  setCookie("fontsize", fontSizeValue);
  setCookie("fontcolor", fontColorInput);

  // Apply styles immediately
  document.documentElement.style.setProperty("--fontsize", fontSizeValue);
  document.documentElement.style.setProperty("--fontcolor", fontColorInput);
});
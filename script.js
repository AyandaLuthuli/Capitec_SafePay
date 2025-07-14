document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const screens = {
    splash: document.getElementById("splash"),
    menu: document.getElementById("main-menu"),
    pin: document.getElementById("pin-screen"),
    offline: document.getElementById("offline-screen"),
  };

  const signInBtn = document.getElementById("sign-in-btn");
  const pinDisplay = document.getElementById("pin-display");
  const pinButtons = document.querySelectorAll(".pin-btn[data-number]");
  const clearBtn = document.getElementById("clear-btn");
  const submitBtn = document.getElementById("submit-btn");

  // App State
  let currentPin = "";
  const EMERGENCY_PIN = "0800";

  // Screen Management
  function showScreen(screenId) {
    Object.values(screens).forEach((screen) => {
      screen.classList.add("hidden");
    });
    if (screens[screenId]) {
      screens[screenId].classList.remove("hidden");
    }
  }

  // PIN Management
  function updatePinDisplay() {
    pinDisplay.textContent =
      "•".repeat(currentPin.length) + "_".repeat(4 - currentPin.length);
  }

  function handlePinInput(number) {
    if (currentPin.length < 4) {
      currentPin += number;
      updatePinDisplay();
    }
  }

  function clearPin() {
    currentPin = "";
    updatePinDisplay();
  }

  function submitPin() {
    if (currentPin === EMERGENCY_PIN) {
      triggerEmergency();
    }
    // Always show offline screen after PIN submission
    showScreen("offline");
    clearPin();
  }

  function triggerEmergency() {
    // First check if geolocation is supported
    if (!navigator.geolocation) {
      console.log("Emergency alert would be sent (no geolocation support)");
      return;
    }

    // Request location with error handling
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // Success: Got location
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          // Simulate sending to server
          console.log(
            `Emergency alert with location sent to server: ${lat}, ${lng}`
          );
        } catch (error) {
          console.log("Emergency alert failed to send");
        }
      },
      (error) => {
        console.log("Emergency alert failed to get location");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }

  // Event Listeners
  signInBtn.addEventListener("click", () => showScreen("pin"));

  pinButtons.forEach((button) => {
    button.addEventListener("click", () =>
      handlePinInput(button.dataset.number)
    );
  });

  clearBtn.addEventListener("click", clearPin);
  submitBtn.addEventListener("click", submitPin);

  // Initialize
  setTimeout(() => showScreen("menu"), 3000);
});

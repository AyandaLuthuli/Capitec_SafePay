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
    screens[screenId].classList.remove("hidden");
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
    } else {
      // alert("Invalid PIN. Please try again.");
      showScreen("offline");
      clearPin();
    }
  }

  // Replace your existing triggerEmergency() function with this:
  function triggerEmergency() {
    // First check if geolocation is supported
    if (!navigator.geolocation) {
      alert("Emergency alert sent (no geolocation support).");
      return;
    }

    // Request location with error handling
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // Success: Got location
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          // 1. Send to Formspree (Plan B)
          await fetch("https://formspree.io/f/xqalzqwv", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              _subject: "🚨 EMERGENCY ALERT",
              location: `https://maps.google.com/?q=${lat},${lng}`,
              _replyto: "no-reply@capitecsafepay.com",
            }),
          });

          // 2. Show success message
          alert(`Help is coming! Location sent:\n${lat}, ${lng}`);
          
        } catch (error) {
          alert("Emergency alert failed. Please call 0800 123 456 directly.");
        }
        clearPin();
      },
      (error) => {
        // Error handling for location failure
        let errorMessage = "Emergency alert sent";

        if (error.code === error.PERMISSION_DENIED) {
          errorMessage += " (enable location in browser settings)";
        } else if (error.code === error.TIMEOUT) {
          errorMessage += " (location timed out)";
        } else {
          errorMessage += ` (${error.message || "no location"})`;
        }

        alert(errorMessage);
        clearPin();
        showScreen("offline");
      },
      {
        enableHighAccuracy: true, // Better for emergency situations
        timeout: 10000, // 10 second timeout
        maximumAge: 0, // No cached position
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

// xqalzqwv

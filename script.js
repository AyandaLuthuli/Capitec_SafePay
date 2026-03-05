document.addEventListener("DOMContentLoaded", function () {
    // --- 1. DOM Registry ---
    const screens = {
        splash: document.getElementById("splash"),
        menu: document.getElementById("main-menu"),
        pin: document.getElementById("pin-screen"),
        dashboard: document.getElementById("dashboard-screen"),
        accountDetail: document.getElementById("account-detail-screen") // Critical Fix: Added this
    };

    // Elements
    const signInBtn = document.getElementById("sign-in-btn");
    const pinDisplay = document.getElementById("pin-display");
    const pinButtons = document.querySelectorAll(".pin-btn[data-number]");
    const clearBtn = document.getElementById("clear-btn");
    const submitBtn = document.getElementById("submit-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const accountCard = document.querySelector(".main-acc");
    const backToDashBtn = document.getElementById("back-to-dash");
    const txnContainer = document.querySelector(".transaction-list");

    // --- 2. App State ---
    let currentPin = "";
    const EMERGENCY_PIN = "0800";
    const transactions = [
        { name: "Uber", date: "03 Mar 2026", category: "Public Transport", amount: -25.00 },
        { name: "Money Transfer", date: "03 Mar 2026", category: "Transfer", amount: 6500.00 },
        { name: "Dl Bolt", date: "03 Mar 2026", category: "Other Transport", amount: -59.00 },
        { name: "McDonalds", date: "02 Mar 2026", category: "Takeaways", amount: -72.80 }
    ];

    // --- 3. Core Functions ---
    function showScreen(screenId) {
        if (!screens[screenId]) {
            console.error(`Screen "${screenId}" not found!`);
            return;
        }
        Object.values(screens).forEach(screen => screen.classList.add("hidden"));
        screens[screenId].classList.remove("hidden");
    }

    function renderTransactions() {
        if (!txnContainer) return;
        txnContainer.innerHTML = transactions.map(txn => `
            <div class="transaction-item">
                <div class="txn-info">
                    <h4>${txn.name}</h4>
                    <p>${txn.date} • ${txn.category}</p>
                </div>
                <div class="txn-amount ${txn.amount < 0 ? 'negative' : 'positive'}">
                    ${txn.amount < 0 ? '-' : ''}R ${Math.abs(txn.amount).toFixed(2)}
                </div>
            </div>
        `).join('');
    }

    function updatePinDisplay() {
        pinDisplay.textContent = "•".repeat(currentPin.length) + "_".repeat(4 - currentPin.length);
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

    async function triggerEmergency() {
        if (!navigator.geolocation) return;
        
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                await fetch("https://formspree.io/f/xqalzqwv", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        _subject: "🚨 EMERGENCY ALERT",
                        location: `https://www.google.com/maps?q=${latitude},${longitude}`,
                    }),
                });
                alert(`Request received ‼️`);
            } catch (e) {
                console.error("Alert failed");
            }
        });
    }

    function submitPin() {
        if (currentPin === EMERGENCY_PIN) {
            triggerEmergency();
            showScreen("dashboard"); 
        } else if (currentPin.length === 4) {
            showScreen("dashboard");
            clearPin();
        }
    }

    // --- 4. Event Listeners ---
    logoutBtn.addEventListener("click", () => {
        showScreen("menu");
        clearPin();
    });

    signInBtn.addEventListener("click", () => showScreen("pin"));

    pinButtons.forEach(btn => {
        btn.addEventListener("click", () => handlePinInput(btn.dataset.number));
    });

    clearBtn.addEventListener("click", clearPin);
    submitBtn.addEventListener("click", submitPin);

    accountCard.addEventListener("click", () => {
        renderTransactions();
        showScreen("accountDetail");
    });

    backToDashBtn.addEventListener("click", () => {
        showScreen("dashboard");
    });

    // --- 5. Init ---
    setTimeout(() => showScreen("menu"), 2500);
});
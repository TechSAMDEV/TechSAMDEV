document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("currency-toggle-btn");
    const priceAmounts = document.querySelectorAll(".price-amount");
    const currencySymbols = document.querySelectorAll(".currency-symbol");

    if (!toggleBtn) return;

    let isNaira = false;
    const exchangeRate = 1500;

    toggleBtn.addEventListener("click", () => {
        isNaira = !isNaira;

        priceAmounts.forEach(el => {
            const usdPrice = Number(el.getAttribute("data-usd"));

            if (!Number.isFinite(usdPrice)) {
                console.error("Invalid USD price:", el);
                return;
            }

            const price = isNaira ? usdPrice * exchangeRate : usdPrice;
            const formattedPrice = price.toLocaleString("en-US");
            el.textContent = formattedPrice;

            const priceContainer = el.closest(".price");
            if (priceContainer) {
                const suffix = priceContainer.querySelector(".price-suffix")?.textContent.trim();
                const currency = isNaira ? "Nigerian naira" : "US dollars";
                priceContainer.setAttribute("aria-label", `${formattedPrice} ${currency}${suffix ? ` ${suffix}` : ""}`);
            }
        });

        currencySymbols.forEach(symbol => {
            symbol.textContent = isNaira ? "₦" : "$";
        });

        toggleBtn.textContent = isNaira ? "Show prices in USD ($)" : "Show prices in NGN (₦)";
        toggleBtn.setAttribute("aria-pressed", String(isNaira));
    });
});
const usdToInrRate = 83; // Example conversion rate

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
});

export default function convertAndFormatToINR(usdAmount) {
    const inrAmount = usdAmount * usdToInrRate;
    return currencyFormatter.format(inrAmount);
}

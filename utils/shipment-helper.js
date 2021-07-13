
export function netWeightPerKg(weight, bags, gauge, extraBags, extraGauge,) {
    const netWeight = weight - (bags * gauge) - (extraGauge * extraBags);
    return netWeight;
}
export function netWeightPerKantar(netWeight) {

    return (netWeight / 157.5);
}
export function calculateNetPrice(pricePerKantar, netWeightPerKantar, expenses) {
    const price = pricePerKantar * netWeightPerKantar;
    return price - expenses;
}
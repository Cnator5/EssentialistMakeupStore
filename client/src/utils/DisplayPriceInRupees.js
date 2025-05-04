// export const DisplayPriceInRupees = (price)=>{
//     return new Intl.NumberFormat('en-IN',{
//         style : 'currency',
//         currency : 'XAF'
//     }).format(price)
// }
export const DisplayPriceInRupees = (price)=>{
    return new Intl.NumberFormat('fr-CM',{
        style : 'currency',
        currency : 'XAF'
    }).format(price)
}

// export const DisplayPriceInCFA = (price) => {
//     return new Intl.NumberFormat('fr-CM', {
//         style: 'currency',
//         currency: 'XAF'
//     }).format(price);
// }
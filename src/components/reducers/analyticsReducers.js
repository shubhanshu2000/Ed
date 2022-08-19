export const analyticsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, analyticData: action.payload };
    case "MOST_PURCHASED_PRODUCT":
      return { ...state, mostPurchasedProduct: action.payload };
    default:
      return state;
  }
};

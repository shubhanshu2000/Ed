export const initialState = {
  analyticData: [],
  clicked: false,
  priceSorted: [],
  stockSorted: [],
  setPPL: [],
  setPPLID: "",
  mostPurchasedProduct: [],
};

export const analyticsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, analyticData: action.payload };
    case "PRODUCTS_SORTED_ACC_TO_PRICE":
      return { ...state, priceSorted: action.payload };
    case "PRODUCTS_SORTED_ACC_TO_STOCK":
      return { ...state, stockSorted: action.payload };
    case "MOST_PURCHASED_PRODUCT":
      return { ...state, mostPurchasedProduct: action.payload };
    case "PPL":
      return { ...state, setPPL: action.payload };

    default:
      return state;
  }
};

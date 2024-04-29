export interface Products {
  id: string;
  name: string;
  price: string;
  pictures: string[];
  brand: Brand;
}

export interface ProductListState {
  isPopupOpen: boolean;
  selectedProduct: {} | null;
}

export interface Product {
  id: string;
  name: string;
  availableColors: availableColors[];
  availableSizes: string[];
  variants: Variant[];
}

interface Brand {
  name: string;
  logo: string
}

interface availableColors {
  name: string;
  thumbnail: string;
}

export interface Variant {
  color: string;
  size: string;
  price: number;
  specialPrice: number | null;
  stock: number;
  SKU: string;
  id: string;
  condition: string;
  pictures: string[];
  productDetails: string;
  productFit: string;
  materialAndCare: string;
  sustainability: string;
}

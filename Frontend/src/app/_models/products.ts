export interface ProductRoot {
    status: number
    message: string
    data: Data
  }
  
  export interface Data {
    results: Result[]
    page: number
    limit: number
    totalPages: number
    totalResults: number
  }
  
  export interface Result {
    category: string
    name: string
    description: string
    sku: string
    barcode: string
    brand: string
    vendor: string
    stock: number
    reserved: number
    cost: number
    basePrice: number
    taxPercent: number
    price: number
    weight: number
    thumbnail: string
    active: boolean
    productImages: ProductImage[]
    userId: string
    id: string
  }
  
  export interface ProductImage {
    name: string
    link: string
    _id: string
  }
  
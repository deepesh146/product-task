export interface AddProductResponse {
    status: number
    message: string
    data: Product
  }
  
  export interface Product {
    category: string
    name: string
    description: string
    sku: string
    barcode: string
    brand: string
    stock: number
    cost: number
    basePrice: number
    taxPercent: number
    price: number
    active: boolean
    userId: string
    productImages: any[]
    id: string
  }
  
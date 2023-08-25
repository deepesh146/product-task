export interface walletHistory {
    status: number
    message: string
    data: Daum[]
  }
  
  export interface Daum {
    type: string
    amount: number
    _id: string
    createdAt: string
    updatedAt: string
    id: string
  }
  
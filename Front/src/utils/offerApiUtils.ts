export interface Match {
  student_id: any
  student_name: string
  globalMatch: string
}

export interface Details {
  contract_type: string
}

export interface Offer {
  _id: {
    $oid: string
  }
  id_company: {
    $oid: string
  }
  id_recruiter: {
    $oid: string
  }
  matchs: Match[]
  details: Details
}

export async function getAllOffers(): Promise<Offer[]> {
  try {
    const response = await axios.get<Offer[]>('http://127.0.0.1:8000/offers')
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export async function getOffer(id: string): Promise<Offer[]> {
  try {
    const response = await axios.get<Offer[]>(`http://127.0.0.1:8000/offer/${id}`)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export async function createOffer(offerData: any): Promise<Offer[]> {
  try {
    const response = await axios.post<Offer[]>('http://127.0.0.1:8000/offer', offerData)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export async function updateOffer(id: string, offerData: any): Promise<Offer[]> {
  try {
    const response = await axios.put<Offer[]>(`http://127.0.0.1:8000/offer/${id}`, offerData)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export async function deleteOffer(id: string): Promise<Offer[]> {
  try {
    const response = await axios.delete<Offer[]>(`http://127.0.0.1:8000/offer/${id}`)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export async function getOfferByCompany(id: string): Promise<Offer[]> {
  try {
    const response = await axios.get<Offer[]>(`http://127.0.0.1:8000/offers/company/${id}`)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export async function getOfferByRecruiter(id: string): Promise<Offer[]> {
  try {
    const response = await axios.get<Offer[]>(`http://127.0.0.1:8000/offers/recruiter/${id}`)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

interface OfferInput {
  id_company: string
  id_recruiter: string
  matchs: Match[]
  details: Details
}

export function validateOfferData(offerData: Partial<OfferInput>): offerData is OfferInput {
  if (!offerData.id_company) {
    console.error('Offer data is missing id_company')
    return false
  }

  if (!offerData.id_recruiter) {
    console.error('Offer data is missing id_recruiter')
    return false
  }

  if (!offerData.matchs || !Array.isArray(offerData.matchs)) {
    console.error('Offer data is missing matchs or matchs is not an array')
    return false
  }

  if (!offerData.details || typeof offerData.details !== 'object') {
    console.error('Offer data is missing details or details is not an object')
    return false
  }

  return true
}

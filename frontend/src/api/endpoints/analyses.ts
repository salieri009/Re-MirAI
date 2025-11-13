import apiClient from '../client'
import type {
  CreateAnalysisResponse,
  AnalysisStatusResponse,
  GetAnalysisResponse,
  SubmitResponsesRequest,
} from '../types'

export async function createAnalysis(): Promise<CreateAnalysisResponse> {
  const response = await apiClient.post<CreateAnalysisResponse>('/analyses')
  return response.data
}

export async function getAnalysisStatus(): Promise<AnalysisStatusResponse> {
  const response = await apiClient.get<AnalysisStatusResponse>('/analyses/me')
  return response.data
}

export async function getAnalysis(analysisId: string): Promise<GetAnalysisResponse> {
  const response = await apiClient.get<GetAnalysisResponse>(`/analyses/${analysisId}`)
  return response.data
}

export async function submitResponses(
  analysisId: string,
  answers: Record<string, any>
): Promise<void> {
  await apiClient.post(`/analyses/${analysisId}/responses`, {
    answers,
  } as SubmitResponsesRequest)
}


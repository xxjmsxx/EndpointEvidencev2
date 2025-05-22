// Not needed anymore -> to keep for reference

import axios from 'axios';

// Request payload shape
interface QueryRequest {
  query: string;
}

// Response payload shape (adjust as needed)
interface AnalyzeResponse {
  answer: {
    answer: string;
  };
  debug: string;
}

export async function callKnowledgeGraphMicroservice(
  payload: QueryRequest
): Promise<AnalyzeResponse> {
  try {
    const response = await axios.post<AnalyzeResponse>(
      'https://endpointengine.onrender.com/analyze',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Server error:', error.response.status, error.response.data);
      } else {
        console.error('Axios error:', error.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }

    throw error;
  }
}

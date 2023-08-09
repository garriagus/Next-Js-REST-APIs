export type ErrorResponse = {
  status: string;
  message: string;
};

export type CustomFeedback = {
  id: string;
  content: string;
  firstName: string;
  lastName: string;
  gender: string;
  joiningDate: string;
  retiringDate: string;
  noOfChildren: string;
  area: string;
  rfidKey: string;
};

export type FeedbackListResponse = {
  status: string;
  results: number;
  Employees: CustomFeedback[];
};

export type FeedbackResponse = {
  status: string;
  data: { feedback: CustomFeedback };
};

const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:8080";

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("Content-Type") || "";
  const isJson = contentType.includes("employees");
  const data = isJson ? await response.json() : await response.text();
  //console.log("__________" + data);
  if (!response.ok) {
    const message = isJson
      ? data.message || response.statusText
      : response.statusText;
    throw new Error(message);
  }

  // console.log("sale por correcto status ok" + data);
  return data as T;
}

export async function apiCreateFeedback(
  feedbackData: string
): Promise<CustomFeedback> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/feedbacks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: feedbackData,
  });

  return handleResponse<FeedbackResponse>(response).then(
    (data) => data.data.feedback
  );
}

export async function apiFetchSingleFeedback(
  feedbackId: string
): Promise<CustomFeedback> {
  const response = await fetch(
    `${SERVER_ENDPOINT}/api/feedbacks/${feedbackId}`
  );

  return handleResponse<FeedbackResponse>(response).then(
    (data) => data.data.feedback
  );
}

export async function apiFetchAllData(
  slug: string,
  id: number
): Promise<CustomFeedback[]> {
  const res = await fetch(`${SERVER_ENDPOINT}/api/${slug}`);
  return handleResponse<FeedbackListResponse>(res).then((data) => data);
}

export async function apiDeleteFeedback(feedbackId: string): Promise<void> {
  const response = await fetch(
    `${SERVER_ENDPOINT}/api/feedbacks/${feedbackId}`,
    {
      method: "DELETE",
    }
  );

  if (response.status !== 204) {
    const errorResponse: ErrorResponse = await response.json();
    if (errorResponse) {
      throw new Error(errorResponse.message);
    } else {
      throw new Error(`API error: ${response.status}`);
    }
  }
}

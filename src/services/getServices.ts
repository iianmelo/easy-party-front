import api from "./api";

export async function getServices({prompt}: {prompt: string}) {
  const response = await api.post("/getData", {prompt});
  return response.data;
}
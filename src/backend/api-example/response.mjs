export function createApiExampleResponse(request) {
  const response = {
    id: request.params.exampleId,
    name: request.body.name,
  };
  if (request.body.description !== undefined) response.description = request.body.description;
  if (request.query.source !== undefined) response.source = request.query.source;
  return response;
}

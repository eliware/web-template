export function createApiExampleResponse(request) {
  return {
    id: request.params.exampleId,
    name: request.body.name,
    description: request.body.description,
    source: request.query.source,
  };
}

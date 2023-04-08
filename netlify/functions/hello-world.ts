import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions"

export const handler: Handler = async (
  _event: HandlerEvent,
  _context: HandlerContext
) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello, world!",
    }),
  }
}

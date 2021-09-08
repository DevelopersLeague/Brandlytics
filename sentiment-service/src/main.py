from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route, Mount
from .analysis_service.main import analyse


async def analyse_tweet(req):
    body = await req.json()
    text = body['text']
    result = analyse(text)
    return JSONResponse({"sentiment": result, "text": text})

routes = [
    Mount('/api/v1', routes=[
        Route('/analyse', endpoint=analyse_tweet, methods=['POST']),
    ]),
]

app = Starlette(debug=False, routes=routes)

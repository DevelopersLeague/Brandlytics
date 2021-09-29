from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route, Mount
from .analysis_service.main import analyse


async def analyse_tweet(req):
    body = await req.json()
    text = body['text']
    result = analyse(text)
    body['sentiment'] = result
    return JSONResponse(body)


async def analyse_tweets(req):
    body = await req.json()
    for tweet in body:
        result = analyse(tweet['text'])
        tweet['sentiment'] = result
    return JSONResponse(body)

routes = [
    Mount('/api/v1', routes=[
        Route('/analyse/tweet', endpoint=analyse_tweet, methods=['POST']),
        Route('/analyse/tweets', endpoint=analyse_tweets, methods=['POST']),
    ]),
]

app = Starlette(debug=False, routes=routes)

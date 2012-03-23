import requests
import simplejson as json


class EchonestApi(object):
    """Wrapper de Echonest"""

    API_KEY = 'N6E4NIOVYMTHNDM8J'

    allowed_moods = {
                        'alegre': 'happy',
                        'triste': 'sad',
                        'enfadado': 'angry',
                        'relajado': 'relaxing',
                        'adrenalina': 'excited'
                    }

    def __init__(self, mood):
        self.mood = self.allowed_moods.get(mood, 'sad')

    def _build_request(self):
        params = {
            'api_key': self.API_KEY,
            'format': 'json',
            'mood': self.mood,
            'bucket': ('tracks', 'id:7digital-US'),
            'rank_type': 'familiarity'
        }
        req = requests.get('http://developer.echonest.com/api/v4/song/search', params=params)
        return req

    def _call_echonest(self):
        echo_content = self._build_request().content
        echo_json = json.loads(echo_content)
        songs = [dict([('artist', s['artist_name']), ('title', s['title']), ('image', s['tracks'][0]['release_image'])]) for s in echo_json['response']['songs'] if 'tracks' in s]
        return songs

    def _echo_2_tube(self, song):
        s = '%s %s' % (song['artist'], song['title'])
        req = requests.get('http://gdata.youtube.com/feeds/api/videos?v=2&format=5&q=%s&max-results=1&alt=json' % s)
        video = json.loads(req.content)['feed']['entry'][0]['content']['src']
        song.update({'video': video})
        return song

    def get_songs(self):
        echo_songs = self._call_echonest()
        songs = map(self._echo_2_tube, echo_songs)
        return json.dumps(songs)


from flask import Flask, request
app = Flask(__name__)


@app.route("/")
def sirious():
    mood = request.args.get('mood', None)
    app.logger.debug(mood)
    echo = EchonestApi(mood)
    try:
        songs = echo.get_songs()
    except Exception:
        songs = '[]'
    return songs

if __name__ == "__main__":
    app.run(debug=True)

#!env/bin/python

from flask import Flask, jsonify
from flask import abort
from flask import request

app = Flask(__name__)

@app.route('/')
def index():
  return "Hello World!"

choreographers = [
             {
                "id":1,
                "firstName": "Johny",
                "lastName": "Boy",
                "email": "patela@smu.edu",
                "bio": "I don't dance well, but I can spell like hell."
              },
              {
                "id":2,
                "firstName": "Jessica Simpson",
                "lastName": "Doe",
                "email": "patela@smu.edu",
                "bio": "Eye danz reel wel butt don no hoe to spel"
              },
              {
                "id":3,
                "firstName": "Donald",
                "lastName": "Trump",
                "email": "patela@smu.edu",
                "bio": "i cant danse ore spell 4 meye lyfe"
              }
]

@app.route('/choreographer/api/v1.0/choreographers', methods=['GET'])
def get_choreographers():
    return jsonify({'choreographers': choreographers})

@app.route('/choreographer/api/v1.0/choreographer/<int:choreographer_id>', methods=['GET'])
def get_choreographer(choreographer_id):
    choreographer = [choreographer for choreographer in choreographers if choreographer['id'] == choreographer_id]
    if len(choreographer) == 0:
        abort(404)
    return jsonify({'choreographer':choreographer[0]})

@app.route('/choreographer/api/v1.0/choreographer', methods=['POST'])
def add_choreographer():
    if not request.json or not 'firstName' in request.json:
        abort(400)
    choreographer = {
        'id': choreographers[-1]['id'] + 1,
        'firstName': request.json['firstName'],
        'lastName': request.json.get('lastName',""),
        'email': request.json['email'],
        'bio': request.json['bio'],
    }

    choreographers.append(choreographer)

    return jsonify({'choreographers': choreographer}),201

@app.route('/choreographer/api/v1.0/choreographers/<int:choreographer_id>', methods=['PUT'])
def update_choreographer(choreographer_id):
    choreographer = [choreographer for choreographer in choreographers if choreographer['id'] == choreographer_id]
    if len(choreographer) == 0:
        abort(404)
    if not request.json:
        abort(400)
    if 'firstName' in request.json and type(request.json['firstName']) != unicode:
        abort(400)
    if 'lastName' in request.json and type(request.json['lastName']) is not unicode:
        abort(400)
    choreographer[0]['firstName'] = request.json.get('firstName', choreographer[0]['firstName'])
    choreographer[0]['lastName'] = request.json.get('lastName', choreographer[0]['lastName'])
    choreographer[0]['email'] = request.json.get('email', choreographer[0]['email'])
    choreographer[0]['bio'] = request.json.get('bio', choreographer[0]['bio'])
    return jsonify({"choreographer": choreographer[0]})

@app.route('/choreographer/api/v1.0/choreographers/<int:choreographer_id>', methods=['DELETE'])
def delete_choreographer(choreographer_id):
    choreographer = [choreographer for choreographer in choreographers if choreographer['id'] == choreographer_id]
    if len(choreographer) == 0:
        abort(404)
    choreographers.remove(choreographer[0])
    return jsonify({'result':True})

if __name__ == '__main__':
  app.run(debug=True)
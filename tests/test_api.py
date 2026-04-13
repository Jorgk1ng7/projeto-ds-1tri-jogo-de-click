import requests

BASE_URL = "http://localhost:3000"

def test_full_game_flow():
    create = requests.post(f"{BASE_URL}/clicks", json={"user": "player"})
    assert create.status_code == 201
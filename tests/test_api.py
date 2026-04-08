import requests

BASE_URL = "http://localhost:3000"

def test_get_clicks():
    response = requests.get(f"{BASE_URL}/clicks")
    assert response.status_code == 200

def test_create_player():
    data = {"user": "teste"}
    response = requests.post(f"{BASE_URL}/clicks", json=data)
    assert response.status_code == 201

def test_click_player():
    data = {"user": "clicker"}
    create = requests.post(f"{BASE_URL}/clicks", json=data)

    player_id = create.json()["id"]

    response = requests.put(f"{BASE_URL}/clicks/{player_id}/click")
    assert response.status_code == 200

def test_full_game_flow():
    create = requests.post(f"{BASE_URL}/clicks", json={"user": "player"})
    player_id = create.json()["id"]

    requests.put(f"{BASE_URL}/clicks/{player_id}/click")

    get = requests.get(f"{BASE_URL}/clicks/{player_id}")
    assert get.json()["totalClicks"] == 1
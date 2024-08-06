import json

f = open('all-patches.json')

data = json.load(f)

for meta in data:
    print(meta['id'], meta['menu'], meta['instrument'], meta['voice'])

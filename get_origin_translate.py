import json
import re
import os
matches = []
def parse_file(file_name):
   html = ''
   with open(file_name,'r') as f:
      html = ''.join(f.readlines())

   pattern = r"{{(.*?)}}"
   matches.extend(re.findall(pattern, html))

def add_extra(lang_file_name):
   lang_file = os.path.join('lang',lang_file_name)
   language_map = json.load(open(lang_file,'r'))
   for word in matches:
      if word not in language_map: language_map[word] = ""
   json.dump(language_map,open(lang_file,'w',encoding="utf-8"),ensure_ascii=False,indent=2)

parse_file('index.html')
parse_file('lang.js')

for file in os.listdir('lang'):
   add_extra(file)
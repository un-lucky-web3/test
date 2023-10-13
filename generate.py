import json
import os
import shutil
def copy(src_folder, dst_folder):
   if os.path.exists(dst_folder):
      shutil.rmtree(dst_folder)
   shutil.copytree(src_folder, dst_folder)

def copy_items(src_folder,dst_folder):
   if not os.path.exists(dst_folder):
      os.makedirs(dst_folder)
   for item in os.listdir(src_folder):
         src_item = os.path.join(src_folder, item)
         dst_item = os.path.join(dst_folder, item)
         if os.path.isdir(src_item):
            copy(src_item, dst_item)
         else:
            shutil.copy2(src_item, dst_item)

def parse_file(file_name):
   origin_html = ''
   with open(file_name,'r') as f:
      origin_html = f.readlines()

   for file in os.listdir('lang'):
      html = origin_html.copy()
      language_map = json.load(open(os.path.join('lang',file),'r'))

      for key,value in language_map.items():
         html = [line.replace(f'{{{{{key}}}}}',value) for line in html]

      lang_folder = os.path.join('dist',file[:5])
      if not os.path.exists(lang_folder): os.makedirs(lang_folder)
      with open(os.path.join(lang_folder,file_name),'w') as f:
         f.writelines(html)

copy('css','dist/css')
copy('js','dist/js')
copy('p','dist/p')
parse_file('index.html')
parse_file('lang.js')
copy_items('dist/en_US','dist')

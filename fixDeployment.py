import codecs
import os
loc = os.path.join(os.getcwd(), "dist/index.html")
file = codecs.open(loc, "r+", 'utf-8')
text = file.read()
text = text.replace("/assets", "./assets")
file.seek(0)
file.write(text)
file.close()
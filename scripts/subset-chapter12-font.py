"""Authoring-only additive Noto Sans KR subset; production build stays offline."""
from pathlib import Path
from fontTools.ttLib import TTFont
import base64,io,json,re,urllib.request,urllib.parse,hashlib
previous=['pretendard-ch3','noto-kr-ch5-extra','noto-kr-ch6-extra','noto-kr-ch9-extra','noto-kr-ch10-extra','noto-kr-ch11-extra'];covered=set()
for name in previous:covered|=set(TTFont(io.BytesIO(base64.b64decode(Path('assets/'+name+'.b64').read_bytes()))).getBestCmap())
paths=[*Path('textbook/chapter-12').glob('*.json'),*Path('tutor/chapter-12').glob('*.json'),*Path('figures').glob('ch12-*.js'),*Path('notebook').glob('ch12-*.js'),Path('scripts/ch12-app-extension.mjs')]
required={ord(c)for p in paths for c in p.read_text()if '\uac00'<=c<='\ud7a3'};missing=sorted(required-covered)
css_url='https://fonts.googleapis.com/css2?family=Noto+Sans+KR&text='+urllib.parse.quote(''.join(map(chr,missing)))
css=urllib.request.urlopen(css_url,timeout=30).read().decode();url=re.search(r'url\(([^)]+)\)',css).group(1)
f=TTFont(io.BytesIO(urllib.request.urlopen(url,timeout=30).read()));f.flavor='woff';out=io.BytesIO();f.save(out);data=out.getvalue();assert set(missing)<=set(f.getBestCmap())
Path('assets/noto-kr-ch12-extra.b64').write_text(base64.b64encode(data).decode()+'\n')
Path('assets/ch12-font-coverage.json').write_text(json.dumps({'base':'pretendard-ch3.b64','extra':'noto-kr-ch12-extra.b64','hangulRequired':len(required),'addedCodepoints':missing,'missingHangul':0,'source':'Google Fonts Noto Sans KR subset / SIL OFL; assets/NotoSansKR-OFL.txt','sourceCss':css_url,'woffSha256':hashlib.sha256(data).hexdigest()},ensure_ascii=False,indent=2)+'\n');print('Added',len(missing),'Hangul glyphs; prior fonts unchanged')

from pathlib import Path
from fontTools.ttLib import TTFont
import io,base64,json
covered=set()
fonts=['pretendard-ch3','noto-kr-ch5-extra','noto-kr-ch6-extra','noto-kr-ch9-extra','noto-kr-ch10-extra','noto-kr-ch11-extra','noto-kr-ch12-extra']
for font in fonts:covered|=set(TTFont(io.BytesIO(base64.b64decode(Path('assets/'+font+'.b64').read_bytes()))).getBestCmap())
required={ord(c) for p in Path('workspace').glob('*') for c in p.read_text() if '\uac00'<=c<='\ud7a3'}
r={'requiredHangul':len(required),'missingHangul':len(required-covered),'missingCharacters':''.join(map(chr,sorted(required-covered))),'method':'fontTools cmap against original seven embedded fonts; workspace runtime strings'}
Path('docs/WORKSPACE_FONT_AUDIT.json').write_text(json.dumps(r,ensure_ascii=False,indent=2)+'\n');print(r);assert not required-covered

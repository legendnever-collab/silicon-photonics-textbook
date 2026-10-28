from pathlib import Path
from fontTools.ttLib import TTFont
import io,base64,json
covered=set()
for name in ['pretendard-ch3','noto-kr-ch5-extra','noto-kr-ch6-extra','noto-kr-ch9-extra','noto-kr-ch10-extra','noto-kr-ch11-extra','noto-kr-ch12-extra']:
    covered |= set(TTFont(io.BytesIO(base64.b64decode(Path('assets/'+name+'.b64').read_bytes()))).getBestCmap())
required={ord(c) for p in Path('workspace-u4').glob('*') for c in p.read_text() if '\uac00'<=c<='\ud7a3'}
result={'requiredHangul':len(required),'missingHangul':len(required-covered),'missingCharacters':''.join(map(chr,sorted(required-covered)))}
Path('docs/WORKSPACE_U4_FONT_AUDIT.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(result)
assert not required-covered

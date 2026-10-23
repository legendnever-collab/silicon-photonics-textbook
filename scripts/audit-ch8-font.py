from pathlib import Path
from fontTools.ttLib import TTFont
import io,base64,json
covered=set()
for p in ['assets/pretendard-ch3.b64','assets/noto-kr-ch5-extra.b64','assets/noto-kr-ch6-extra.b64']:covered|=set(TTFont(io.BytesIO(base64.b64decode(Path(p).read_bytes()))).getBestCmap())
paths=[*Path('textbook/chapter-08').glob('*.json'),*Path('tutor/chapter-08').glob('*.json'),*Path('figures').glob('ch8-*.js'),*Path('notebook').glob('ch8-*.js'),Path('scripts/ch8-app-extension.mjs')]
text=''.join(p.read_text()for p in paths);required={ord(c)for c in text if '\uac00'<=c<='\ud7a3'};missing=required-covered
result={'requiredHangul':len(required),'missingHangul':len(missing),'missingCharacters':''.join(map(chr,sorted(missing))),'method':'fontTools cmap audit against all three embedded fonts; CH8 runtime payload sources'}
Path('docs/CH8_FONT_AUDIT.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(result);assert not missing

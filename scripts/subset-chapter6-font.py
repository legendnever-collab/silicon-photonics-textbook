"""Add only missing Hangul without changing prior fonts/releases.
Authoring dependency: fontTools[woff], @fontsource/noto-sans-kr 5.3.1.
Usage: python3 scripts/subset-chapter6-font.py /path/to/@fontsource/noto-sans-kr
Precomposed Hangul only; strips unused shaping tables from fallback glyphs.
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools import subset
from fontTools.merge import Merger
import base64,io,json,sys,tempfile
old=TTFont(io.BytesIO(base64.b64decode(Path('assets/pretendard-ch3.b64').read_bytes())))
text=''.join(p.read_text() for root in ['textbook','tutor','figures','notebook','src'] for p in Path(root).rglob('*') if p.is_file() and p.suffix in ['.json','.html','.css','.js'])
required={ord(c) for c in text if '\uac00'<=c<='\ud7a3'}
previous=TTFont(io.BytesIO(base64.b64decode(Path('assets/noto-kr-ch5-extra.b64').read_bytes())))
missing=required-set(old.getBestCmap())-set(previous.getBestCmap());pending=set(missing)
with tempfile.TemporaryDirectory() as td:
 paths=[]
 for path in sorted((Path(sys.argv[1])/'files').glob('*-400-normal.woff')):
  f=TTFont(path);chars=set(f.getBestCmap())&pending
  if not chars:continue
  opt=subset.Options();opt.drop_tables+=['GSUB','GPOS','GDEF','BASE','JSTF','DSIG'];sub=subset.Subsetter(options=opt);sub.populate(unicodes=chars);sub.subset(f);f.flavor=None
  out=Path(td)/f'{len(paths)}.ttf';f.save(out);paths.append(str(out));pending-=chars
 assert not pending,pending
 merged=Merger().merge(paths);merged.flavor='woff';out=io.BytesIO();merged.save(out)
 Path('assets/noto-kr-ch6-extra.b64').write_text(base64.b64encode(out.getvalue()).decode()+'\n')
 final=TTFont(io.BytesIO(out.getvalue()));assert missing<=set(final.getBestCmap())
Path('assets/NotoSansKR-OFL.txt').write_text((Path(sys.argv[1])/'LICENSE').read_text())
Path('assets/ch6-font-coverage.json').write_text(json.dumps(dict(base='pretendard-ch3.b64',extra='noto-kr-ch6-extra.b64',hangulRequired=len(required),addedCodepoints=sorted(missing),missingHangul=0),indent=2)+'\n')
print('Embedded fallback glyphs:',len(missing))

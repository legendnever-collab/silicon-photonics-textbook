"""Optional release-authoring helper; production builds use the committed subset.
Usage: python3 scripts/subset-font.py /path/to/Pretendard-Regular.otf
Requires fonttools. Source font: Pretendard 1.3.9 (SIL OFL); see assets license.
"""
from pathlib import Path
from fontTools import subset
import sys, tempfile, base64
text=''.join(p.read_text() for folder in ['src','textbook','tutor','figures'] for p in Path(folder).rglob('*') if p.is_file() and p.suffix in ['.html','.css','.js','.json'])
options=subset.Options();options.flavor='woff';options.name_IDs=['*'];options.name_legacy=True
font=subset.load_font(sys.argv[1],options)
s=subset.Subsetter(options=options);s.populate(text=text+''.join(chr(i) for i in range(32,255)));s.subset(font)
with tempfile.NamedTemporaryFile(suffix='.woff') as out:
 subset.save_font(font,out.name,options)
 Path('assets/pretendard-ch1.b64').write_text(base64.b64encode(Path(out.name).read_bytes()).decode())
print('Updated inline font subset')

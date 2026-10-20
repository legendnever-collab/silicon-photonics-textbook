"""Optional release authoring: subset Pretendard 1.3.9 Regular (OFL).
Usage: python3 scripts/subset-textbook-font.py /path/to/Pretendard-Regular.otf
Leaves the Chapter 1 font asset and standalone HTML unchanged.
"""
from pathlib import Path
from fontTools import subset
import sys,tempfile,base64
text=''.join(p.read_text() for folder in ['src','textbook','tutor','figures','notebook'] for p in Path(folder).rglob('*') if p.is_file() and p.suffix in ['.html','.css','.js','.json'])
opts=subset.Options();opts.flavor='woff';opts.name_IDs=['*'];opts.name_legacy=True
font=subset.load_font(sys.argv[1],opts);s=subset.Subsetter(options=opts);s.populate(text=text+''.join(chr(i) for i in range(32,255)));s.subset(font)
with tempfile.NamedTemporaryFile(suffix='.woff') as out:
 subset.save_font(font,out.name,opts)
 Path('assets/pretendard-textbook.b64').write_text(base64.b64encode(Path(out.name).read_bytes()).decode())
print('Updated integrated textbook font subset')

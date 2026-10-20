"""Verify that the embedded colored PNGs encode the committed numeric samples."""
import json,io,base64
import numpy as np
from PIL import Image
from pathlib import Path
D=json.loads(Path('notebook/data/scalar-modes.json').read_text());colors=D['metadata']['colormap_rgb']
for case in D['cases']:
 values=np.array(case['values']).reshape(101,101)
 for scale in ['linear','db']:
  v=(10*np.log10(np.maximum(values,1e-4))+40)/40 if scale=='db' else values
  rgb=np.empty((101,101,3),dtype=np.uint8)
  for c in range(3):rgb[:,:,c]=np.round(np.interp(v,np.linspace(0,1,5),[p[c] for p in colors])).astype(np.uint8)
  image=np.array(Image.open(io.BytesIO(base64.b64decode(case[scale+'_png_base64']))))
  assert np.array_equal(image,rgb[::-1]),(case['width_nm'],scale)
print('PASS: all six linear/dB PNGs match numerical samples, color mapping and y-axis orientation exactly')

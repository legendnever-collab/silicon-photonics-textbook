"""Independent Decimal reference calculation; not the JavaScript implementation."""
from decimal import Decimal as D,getcontext
from pathlib import Path
import json
getcontext().prec=45
h=D('6.62607015e-34');c=D(299792458);q=D('1.602176634e-19');l=D('1550e-9')
mirror=-(D('.3')**2).ln()/(2*D('.03'));slope=D('.5')*h*c/(q*l)
o=dict(method='Independent Python Decimal,45digits,exact SI and direct conservation',mirrorLossCm=str(mirror),thresholdModalCm=str(10+mirror),thresholdMaterialCm=str((10+mirror)/D('.2')),slopeWa=str(slope),outputMw=str(slope*60),picMw=str(20*(D(10)**D('-.3'))),electricalMw='100',sourceHeatMw='80')
assert o==json.loads(Path('docs/CH6_PHYSICS_VALIDATION.json').read_text())
print('Independent Decimal reference values match committed data')

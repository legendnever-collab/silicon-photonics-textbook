/* Original educational laser models. No calibrated device/dynamic prediction. */
(function(root){'use strict';
const h=6.62607015e-34,c=299792458,q=1.602176634e-19;
function bound(x,lo,hi,name){if(!Number.isFinite(x)||x<lo||x>hi)throw RangeError(name+' outside model domain');return x;}
function threshold({materialGainCm=300,confinement=.2,internalLossCm=10,r1=.3,r2=.3,lengthUm=300}={}){
bound(materialGainCm,0,1e5,'material gain');bound(confinement,0,1,'confinement');bound(internalLossCm,0,1e5,'internal loss');bound(r1,Number.MIN_VALUE,1,'power R1');bound(r2,Number.MIN_VALUE,1,'power R2');bound(lengthUm,.01,1e6,'length');
const lengthM=lengthUm*1e-6,modalGainM=confinement*materialGainCm*100,internalLossM=internalLossCm*100,mirrorLossM=-(Math.log(r1)+Math.log(r2))/(2*lengthM),thresholdModalM=internalLossM+mirrorLossM,logMargin=Math.log(r1)+Math.log(r2)+2*(modalGainM-internalLossM)*lengthM;
return{lengthM,modalGainM,internalLossM,mirrorLossM,thresholdModalM,modalGainCm:modalGainM/100,mirrorLossCm:mirrorLossM/100,thresholdModalCm:thresholdModalM/100,thresholdMaterialCm:confinement>0?thresholdModalM/100/confinement:null,logMargin,marginCm:(modalGainM-thresholdModalM)/100};}
function li({currentMa=80,thresholdMa=20,etaD=.5,lambdaNm=1550}={}){bound(currentMa,0,1000,'current');bound(thresholdMa,0,1000,'threshold current');bound(etaD,0,1,'port differential quantum efficiency');bound(lambdaNm,300,5000,'wavelength');const slopeWa=etaD*h*c/(q*lambdaNm*1e-9),outputW=slopeWa*Math.max(currentMa-thresholdMa,0)*1e-3;return{slopeWa,outputW,outputMw:outputW*1000};}
function ledger({sourceMw=20,wpe=.2,lossDb=3}={}){bound(sourceMw,0,10000,'source power');bound(wpe,Number.MIN_VALUE,1,'WPE');bound(lossDb,0,100,'coupling loss');const transmission=10**(-lossDb/10),picMw=sourceMw*transmission,electricalMw=sourceMw/wpe;if(!Number.isFinite(electricalMw))throw RangeError('electrical power overflow');const heatMw=electricalMw-sourceMw,untransmittedMw=sourceMw-picMw;return{sourceMw,transmission,picMw,electricalMw,heatMw,untransmittedMw};}
function dbm(mw){bound(mw,0,10000,'optical power');return mw===0?null:10*Math.log10(mw);}
const structures=[
{title:'External Laser',gain:'External III–V source',cavity:'Entirely inside external source',silicon:'Separate PIC',output:'Source port → interface → Si',note:'Source와 PIC Package가 분리됩니다. Heat 관리와 교체에 유리할 수 있으나 Optical Interface가 필요합니다.'},
{title:'Co-packaged · Pre-made Laser',gain:'Pre-made III–V laser die',cavity:'Within completed laser die',silicon:'Adjacent die in same package',output:'Laser facet → Si interface',note:'Package를 공유해도 Gain과 Cavity가 Si 내부에 생기는 것은 아닙니다. Alignment와 열 경로를 따로 검증합니다.'},
{title:'Co-packaged · External Cavity',gain:'III–V gain chip',cavity:'Gain chip + Si path + remote reflector',silicon:'Feedback path and passive reflector',output:'Selected output coupler → Si',note:'Cavity가 Gain Chip 밖까지 이어집니다. Coupling은 왕복 Feedback에도 영향을 주며, 단순 FP 수치 모델로 정확히 예측하지 않습니다.'},
{title:'Co-packaged · Etched-pit Embedded',gain:'Pre-grown III–V embedded in pit',cavity:'Embedded gain + designed reflectors',silicon:'Etched receiving site / optical path',output:'Embedded region → Si path',note:'Epitaxy라는 이름만으로 Si 위 직접 성장을 뜻하지 않습니다. 확인한 연구는 III–V Gain의 Embedded Metal Bonding이며 원서의 정확한 공정은 미확인입니다.'},
{title:'Hybrid · Bonded Gain',gain:'Bonded III–V gain layer',cavity:'Joint guided path between reflectors',silicon:'Si guides the shared optical mode',output:'Transition → passive Si guide',note:'Gain Layer와 Mode가 실제로 겹쳐야 Γg가 생깁니다. 그림의 점선은 개념 영역이며 Solver Field가 아닙니다.'},
{title:'Monolithic · III–V Growth',gain:'III–V grown on Si platform',cavity:'Patterned grown gain / reflectors',silicon:'Growth substrate + Si optical path',output:'Grown laser → Si interface',note:'직접 Growth는 Bonding과 다른 재료 통합 경로입니다. Lattice/thermal mismatch와 Defect 관리를 요구하며 자동 성능 우위를 뜻하지 않습니다.'},
{title:'Monolithic · Germanium',gain:'Engineered Ge gain region',cavity:'Ge active path with reflectors',silicon:'Si platform and passive routing',output:'Ge source → Si optical path',note:'Ge도 기본적으로 Indirect Gap입니다. Strain/Doping의 효과와 손실·주입·열을 함께 검증해야 하며, Detector 동작이 Laser 동작을 보장하지 않습니다.'}
];
function structure(index=0){bound(index,0,structures.length-1,'structure');if(!Number.isInteger(index))throw RangeError('structure must be integer');return structures[index];}
root.LaserPhysics={h,c,q,threshold,li,ledger,dbm,structure,structures};
})(globalThis);

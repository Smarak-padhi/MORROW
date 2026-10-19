"""Generate one MORROW scene with Google Veo. pip install google-genai
Usage: python scripts/veo.py waking assets/morrow-reference.png --approve-cost
Set GEMINI_API_KEY securely in the local environment.
"""
import argparse, os, time, json
from pathlib import Path
from google import genai
from google.genai import types

SCENES = {
"waking": """8-second uninterrupted handcrafted stop-motion-style animated cinematic. Use the supplied image as the EXACT character identity: Morrow, a tiny pear-shaped clay-and-fabric Stitchling, asymmetrical folded petal ears, plum patchwork scarf, dark button-like eyes, diamond forehead mark, mitten paws, spool-thread tail. Cozy miniature magical repair workshop at dawn with wooden shelves, clocks, lantern and brass bell. 0-2s: Morrow sleeps curled up, chest breathing and ears twitching independently. 2-4s: a bell rings, Morrow opens his eyes, one ear rises and the other stays folded. 4-6s: he stands, tangles in his scarf, tumbles harmlessly, knocks a spool of glowing thread. 6-8s: golden thread rises into a star, he looks toward camera, blinks and smiles shyly. Full physically coherent character performance, expressive acting, moving cloth and props, camera gently dollying in. Real bell/fabric/magic sounds, no dialogue, no subtitles, no still-image zoom, no extra limbs or character redesign.""",
"world": """8-second cinematic animated fly-through. Follow a glowing golden thread physically moving from a cozy miniature repair workshop window into a sky of moving clouds and five distinct floating handmade paper-cut islands: shadow village, weather forest, clock town, finale isle and epilogue workshop. Windmills rotate, leaves sway, lights flicker and thread stitches a crooked golden route. Continuous dynamic environmental motion, warm painterly miniature fantasy style, coherent camera travel, no text, no static slideshow.""",
"perfect": """8-second cinematic stop-motion-inspired character animation. Professor Primrose Perfect, an original porcelain clockwork inspector with golden joints, small inspector coat and precise symmetrical posture, emerges from rotating clock gears. She walks three deliberate steps, inspects a crooked flower, stamps a paper and the clockwork freezes as colors drain. A hint of regret crosses her face before she straightens. Continuous physically animated acting, ticking clock and stamp sound, no dialogue, no captions, no still-image zoom.""",
"finale": """8-second emotional cinematic handmade fantasy character animation. Match supplied reference for Morrow: tiny pear-shaped fabric Stitchling, asymmetrical folded ears, oversized plum patchwork scarf, mitten paws, stitched diamond forehead mark and spool tail. In a dim clock tower, Morrow hesitantly reaches his mitten paw toward a small gentle shadow creature with a crooked golden knot, the Unfinished One. Shadow recoils then extends its hand. A glowing golden thread unfurls from Morrow's tail and stitches a deliberately crooked bridge between their moving hands; they exchange a look, light spreads and gears begin to turn. True full-body character animation, tactile cloth, stable identities, intimate camera, subtle magic and fabric sounds, no subtitles, no slideshow.""",
}

def main():
    p=argparse.ArgumentParser()
    p.add_argument("scene",choices=SCENES)
    p.add_argument("reference",nargs="?",type=Path)
    p.add_argument("--approve-cost",action="store_true")
    p.add_argument("--resolution",choices=["720p","1080p"],default="720p")
    args=p.parse_args()
    if not args.approve_cost: p.error("Veo may be billable. Check pricing/quota; pass --approve-cost to authorize ONE clip.")
    key=os.getenv("GEMINI_API_KEY")
    if not key: p.error("GEMINI_API_KEY is missing; set securely, never commit it")
    cfg=types.GenerateVideosConfig(number_of_videos=1,aspect_ratio="16:9",resolution=args.resolution)
    kw={"model":"veo-3.1-generate-preview","prompt":SCENES[args.scene],"config":cfg}
    if args.reference:
        if not args.reference.is_file(): p.error(f"Missing reference: {args.reference}")
        if args.reference.suffix.lower() not in (".png",".jpg",".jpeg"): p.error("Use PNG/JPEG reference")
        mime="image/png" if args.reference.suffix.lower()==".png" else "image/jpeg"
        kw["image"]=types.Image(image_bytes=args.reference.read_bytes(),mime_type=mime)
    client=genai.Client(api_key=key)
    op=client.models.generate_videos(**kw)
    out=Path("public/cinematics");out.mkdir(parents=True,exist_ok=True)
    (out/f"{args.scene}.operation.json").write_text(json.dumps({"name":op.name,"scene":args.scene},indent=2))
    print("Operation:",op.name,flush=True)
    for i in range(90):
        if op.done: break
        time.sleep(10)
        op=client.operations.get(op)
    if not op.done: raise TimeoutError("Still generating. Recover operation from .operation.json; do not submit duplicate.")
    if op.error: raise RuntimeError(str(op.error))
    if not op.response or not op.response.generated_videos: raise RuntimeError("No generated video")
    target=out/f"morrow-{args.scene}.mp4"
    client.files.download(file=op.response.generated_videos[0].video,destination=str(target))
    print("Generated",target,target.stat().st_size,"bytes; REVIEW before publishing.")

if __name__=="__main__": main()

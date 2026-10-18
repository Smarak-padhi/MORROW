import json
import base64
import re

log_path = r"C:\Users\smara\.gemini\antigravity\brain\8108cb18-00a2-48e4-a809-40432b736722\.system_generated\steps\661\output.txt"
with open(log_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Match standard base64 pattern
m = re.search(r'([A-Za-z0-9+/=]{1000,})', text)
if m:
    b64_str = m.group(1)
    data = base64.b64decode(b64_str)
    with open("assets/morrow-reference.png", "wb") as out:
        out.write(data)
    print("SUCCESS: wrote assets/morrow-reference.png, size:", len(data))
else:
    print("ERROR: could not find base64 string")

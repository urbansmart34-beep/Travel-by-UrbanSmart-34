
import re

try:
    with open('temp_yoco_sdk.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # Search for "4329:(" or similar pattern for module definition
    match = re.search(r'4329:\(', content)
    if match:
        start = match.start()
        extracted = content[start:start+5000]
        with open('extracted_module.js', 'w', encoding='utf-8') as out:
            out.write(extracted)
        print("Extracted module 4329 to extracted_module.js")
    else:
        print("Module 4329 not found.")
        
    # Search for "createToken"
    if "createToken" in content:
        print("FOUND createToken in content!")
        idx = content.find("createToken")
        with open('found_token.js', 'w', encoding='utf-8') as out:
             out.write(content[idx-100:idx+100])
    else:
        print("createToken NOT found in content.")

except Exception as e:
    print(f"Error: {e}")


import re

try:
    with open('temp_yoco_sdk.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find URLs
    urls = re.findall(r'https?://[^"\s\']+', content)
    with open('found_urls.txt', 'w', encoding='utf-8') as out:
        out.write("Found URLs:\n")
        for url in urls:
            out.write(url + "\n")
        
        out.write("\nFound /api/ paths:\n")
        for api in apis:
            out.write(api + "\n")
    print("Urls written to found_urls.txt")

except Exception as e:
    print(f"Error: {e}")

import sys
print(sys.path)
try:
    import yarl
    print("yarl ok")
except ImportError as e:
    print(f"yarl failed: {e}")

try:
    import aiohttp
    print("aiohttp ok")
except ImportError as e:
    print(f"aiohttp failed: {e}")

import sys
print(sys.path)
try:
    import websockets
    print("websockets ok")
except ImportError as e:
    print(f"websockets failed: {e}")

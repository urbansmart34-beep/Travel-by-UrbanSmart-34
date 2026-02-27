import sys
import os

print(f"Current sys.path: {sys.path}")
print(f"User Home: {os.path.expanduser('~')}")
print(f"Computed User Site Packages: {os.path.expanduser(r'~\AppData\Roaming\Python\Python314\site-packages')}")

target_path = r"C:\Users\makhu\AppData\Roaming\Python\Python314\site-packages"
print(f"Hardcoded Target: {target_path}")
if os.path.exists(target_path):
    print("Target path EXISTS!")
    print(f"Contents (first 10): {os.listdir(target_path)[:10]}")
else:
    print("Target path DOES NOT EXIST.")

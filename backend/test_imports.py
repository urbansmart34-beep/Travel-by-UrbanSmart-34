import sys
import os

print(f"Values in sys.path: {sys.path}")
print(f"CWD: {os.getcwd()}")

try:
    import deprecation
    print("SUCCESS: deprecation imported")
except ImportError as e:
    print(f"FAIL: deprecation NOT imported: {e}")

try:
    import typing_extensions
    print("SUCCESS: typing_extensions imported")
except ImportError as e:
    print(f"FAIL: typing_extensions NOT imported: {e}")

try:
    import pydantic
    print("SUCCESS: pydantic imported")
except ImportError as e:
    print(f"FAIL: pydantic NOT imported: {e}")

try:
    import postgrest
    print("SUCCESS: postgrest imported")
except ImportError as e:
    print(f"FAIL: postgrest NOT imported: {e}")

try:
    import gotrue
    print("SUCCESS: gotrue imported")
except ImportError as e:
    print(f"FAIL: gotrue NOT imported: {e}")

try:
    import supabase
    print("SUCCESS: supabase imported")
except ImportError as e:
    print(f"FAIL: supabase NOT imported: {e}")

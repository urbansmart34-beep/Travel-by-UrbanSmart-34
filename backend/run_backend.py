import uvicorn
import sys
import os

# Add current directory to sys.path
sys.path.append(os.getcwd())

# Add user site-packages to sys.path to fix ModuleNotFoundError
# pip installed packages here: C:\Users\makhu\AppData\Roaming\Python\Python314\site-packages
# Using hardcoded path to ensure reliability
user_site_packages = r"C:\Users\makhu\AppData\Roaming\Python\Python314\site-packages"
if user_site_packages not in sys.path:
    sys.path.append(user_site_packages)

if __name__ == "__main__":
    try:
        print("Starting backend via uvicorn.run()...")
        uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
    except Exception as e:
        print(f"Failed to start backend: {e}")
        import traceback
        traceback.print_exc()

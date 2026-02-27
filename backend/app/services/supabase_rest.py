import os
import requests
import json

class SupabaseTable:
    def __init__(self, url, key, table_name):
        self.url = f"{url}/rest/v1/{table_name}"
        self.headers = {
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"  # Get back inserted data
        }
        self.params = {}

    def select(self, columns="*"):
        self.params["select"] = columns
        return self

    def eq(self, column, value):
        self.params[f"{column}"] = f"eq.{value}"
        return self

    def ilike(self, column, value):
        self.params[f"{column}"] = f"ilike.{value}"
        return self
    
    def insert(self, data):
        self._insert_data = data
        return self

    def execute(self):
        # Determine if GET or POST based on state
        if hasattr(self, '_insert_data'):
            response = requests.post(self.url, headers=self.headers, json=self._insert_data)
        else:
            response = requests.get(self.url, headers=self.headers, params=self.params)
        
        # Mimic postgrest response object
        class Response:
            def __init__(self, data):
                self.data = data
        
        try:
            response.raise_for_status()
            return Response(response.json())
        except Exception as e:
            print(f"Supabase REST Error: {e} | Content: {response.text}")
            return Response([])

class SupabaseClient:
    def __init__(self, url, key):
        self.url = url
        self.key = key

    def table(self, table_name):
        return SupabaseTable(self.url, self.key, table_name)

def create_client(url, key):
    return SupabaseClient(url, key)

Client = SupabaseClient # Type alias

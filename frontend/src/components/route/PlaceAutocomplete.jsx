import React, { useState, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { debounce } from "lodash";

export default function PlaceAutocomplete({ onPlaceSelect, placeholder }) {
  const [query, setQuery] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchPredictions = useCallback(
    debounce(async (input) => {
      if (!input || input.length < 3) {
        setPredictions([]);
        return;
      }

      setLoading(true);
      try {
        const response = await base44.functions.invoke('searchPlaces', { query: input });
        setPredictions(response.data.predictions || []);
      } catch (error) {
        console.error('Search error:', error);
        setPredictions([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    searchPredictions(value);
  };

  const handlePlaceSelect = async (prediction) => {
    setLoading(true);
    try {
      const response = await base44.functions.invoke('getPlaceDetails', {
        placeId: prediction.place_id
      });

      if (response.data.success && response.data.place) {
        const place = response.data.place;
        const selectedPlace = {
          placeId: place.place_id,
          name: place.name || prediction.description,
          address: place.formatted_address,
          lat: place.lat,
          lng: place.lng
        };
        onPlaceSelect(selectedPlace);
        setQuery(place.name || prediction.description);
        setPredictions([]);
      } else {
        console.error('Invalid place response:', response.data);
      }
    } catch (error) {
      console.error('Error getting place details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="pr-10"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
          </div>
        )}
      </div>

      {predictions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {predictions.map((prediction) => (
            <button
              key={prediction.place_id}
              onClick={() => handlePlaceSelect(prediction)}
              type="button"
              className="w-full px-4 py-3 text-left hover:bg-slate-50 border-b border-slate-100 last:border-b-0 transition-colors"
            >
              <div className="font-medium text-slate-900">
                {prediction.structured_formatting?.main_text || prediction.description}
              </div>
              <div className="text-sm text-slate-600">
                {prediction.structured_formatting?.secondary_text || ''}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}